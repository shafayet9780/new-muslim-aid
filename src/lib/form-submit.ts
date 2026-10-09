import { FormConfig, FieldConfig } from './form-configs';

export interface ValidationResult {
  ok: boolean;
  error?: string;
  answers: Record<string, unknown>;
}

/**
 * Server-side validation — config অনুযায়ী required check ও sanitize।
 * client কী পাঠাচ্ছে তার উপর নির্ভর না করে এখানেই সব যাচাই হয়।
 */
export function validateSubmission(
  config: FormConfig,
  raw: Record<string, unknown>
): ValidationResult {
  const answers: Record<string, unknown> = {};

  for (const field of config.fields) {
    if (field.type === 'section' || field.type === 'file') continue;

    const value = raw[field.name];

    if (field.type === 'checkbox') {
      const arr = Array.isArray(value)
        ? value.filter((v) => typeof v === 'string' && v.trim() !== '')
        : [];
      if (field.required && arr.length === 0) {
        return { ok: false, error: `"${field.label}" পূরণ করুন`, answers: {} };
      }
      // শুধু বৈধ option গুলোই রাখি
      answers[field.name] = field.options
        ? arr.filter((v) => field.options!.includes(v as string))
        : arr;
      continue;
    }

    // scalar values
    const str = value == null ? '' : String(value).trim();

    if (field.required && str === '') {
      return { ok: false, error: `"${field.label}" পূরণ করুন`, answers: {} };
    }

    // radio/select — বৈধ option কিনা যাচাই
    if ((field.type === 'radio' || field.type === 'select') && str !== '') {
      if (field.options && !field.options.includes(str)) {
        return { ok: false, error: `"${field.label}" এর মান সঠিক নয়`, answers: {} };
      }
    }

    if (field.type === 'email' && str !== '') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
        return { ok: false, error: 'সঠিক ইমেইল ঠিকানা দিন', answers: {} };
      }
    }

    // length guard — abuse ঠেকাতে
    const max = field.type === 'textarea' ? 5000 : 1000;
    if (str.length > max) {
      return { ok: false, error: `"${field.label}" খুব বড় হয়ে গেছে`, answers: {} };
    }

    answers[field.name] = str;
  }

  return { ok: true, answers };
}

/** field-config থেকে একটি field খুঁজে বের করা */
export function findField(
  config: FormConfig,
  name: string
): FieldConfig | undefined {
  return config.fields.find((f) => f.name === name);
}
