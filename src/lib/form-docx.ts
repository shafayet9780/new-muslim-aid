import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { FormConfig } from './form-configs';

/**
 * Form submission → Word (.docx) ফাইল।
 * Noto Sans Bengali font embed করা থাকে, তাই ইমেইলে পাঠালেও
 * বাংলা ঠিকমতো দেখায় — কোনো font ইনস্টল না থাকলেও।
 */

const FONT_NAME = 'Noto Sans Bengali';

// সার্ভারে font আছে কি না দেখি — না থাকলেও graceful fallback
const FONT_PATHS = [
  join(process.cwd(), 'public', 'fonts', 'NotoSansBengali-Regular.ttf'),
  '/usr/share/fonts/truetype/noto/NotoSansBengali-Regular.ttf',
  '/usr/share/fonts/noto/NotoSansBengali-Regular.ttf',
];

function findFont(paths: string[]): Buffer | undefined {
  for (const p of paths) {
    if (existsSync(p)) {
      try { return readFileSync(p); } catch { /* skip */ }
    }
  }
  return undefined;
}

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' };
const borders = {
  top: cellBorder,
  bottom: cellBorder,
  left: cellBorder,
  right: cellBorder,
};

const isSafeUrl = (v: unknown): v is string =>
  typeof v === 'string' && /^https:\/\//.test(v);

function text(value: string, opts: { bold?: boolean; size?: number; color?: string } = {}) {
  return new TextRun({ text: value, font: FONT_NAME, size: opts.size ?? 22, bold: opts.bold, color: opts.color });
}

function multiline(value: string) {
  return value.split(/\r?\n/).map(
    (line, i) => new TextRun({ text: line, font: FONT_NAME, size: 22, break: i > 0 ? 1 : undefined })
  );
}

function valueParagraphs(type: string, value: unknown): Paragraph[] {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return [new Paragraph({ children: [text('—', { color: '9CA3AF' })] })];
  }
  if (type === 'file' && isSafeUrl(value)) {
    return [
      new Paragraph({
        children: [
          new ExternalHyperlink({
            link: value,
            children: [new TextRun({ text: 'ফাইল দেখুন (লিংক)', font: FONT_NAME, size: 22, style: 'Hyperlink' })],
          }),
        ],
      }),
    ];
  }
  if (Array.isArray(value)) {
    return value.map((v) => new Paragraph({ children: [text(`• ${String(v)}`)] }));
  }
  return [new Paragraph({ children: multiline(String(value)) })];
}

export interface DocxSource {
  answers: Record<string, unknown>;
  createdAt?: Date | string;
  _id?: unknown;
}

export async function buildSubmissionDocx(config: FormConfig, src: DocxSource): Promise<Buffer> {
  const rows: TableRow[] = [];

  for (const field of config.fields) {
    if (field.type === 'section') {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              borders,
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: '1B4332' },
              children: [new Paragraph({ children: [text(field.label, { bold: true, color: 'FFFFFF', size: 24 })] })],
            }),
          ],
        })
      );
      continue;
    }

    rows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            borders,
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F3F4F6' },
            children: [new Paragraph({ children: [text(field.label, { bold: true })] })],
          }),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            borders,
            children: valueParagraphs(field.type, src.answers?.[field.name]),
          }),
        ],
      })
    );
  }

  const submitted = src.createdAt ? new Date(src.createdAt) : new Date();
  const submittedStr = submitted.toLocaleString('bn-BD', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  // Font embed — server এ font ফাইল থাকলে embed করি
  const fontBuf = findFont(FONT_PATHS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fonts: any[] = [];
  if (fontBuf) {
    fonts.push({ name: FONT_NAME, data: fontBuf });
  }

  const makeDoc = (withFonts: boolean) =>
    new Document({
      creator: 'NewMuslim Aid Foundation',
      title: config.title,
      ...(withFonts && fonts.length > 0 ? { fonts } : {}),
      styles: { default: { document: { run: { font: FONT_NAME } } } },
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [text('NewMuslim Aid Foundation', { bold: true, size: 32, color: '1B4332' })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 120 },
              children: [text(config.title, { bold: true, size: 28 })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
              children: [
                text(`জমার তারিখ: ${submittedStr}`, { size: 20, color: '6B7280' }),
                ...(src._id ? [text(`   |   রেফারেন্স: ${String(src._id)}`, { size: 20, color: '6B7280' })] : []),
              ],
            }),
            new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }),
          ],
        },
      ],
    });

  if (fonts.length > 0) {
    try {
      return await Packer.toBuffer(makeDoc(true));
    } catch (err) {
      console.warn('Docx embedded font pack failed, retrying without embedded font:', err);
    }
  }

  return Packer.toBuffer(makeDoc(false));
}

/** Content-Disposition এর জন্য নিরাপদ ASCII ফাইলনেম (+ UTF-8 encoded version) */
export function docxFilename(base: string, id: string) {
  const ascii = `${base}-${id}`.replace(/[^a-zA-Z0-9._-]/g, '_') + '.docx';
  return {
    ascii,
    header: `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(ascii)}`,
  };
}
