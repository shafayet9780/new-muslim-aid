'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import type { FieldConfig } from '@/lib/form-configs';

interface Props {
  form: string;
  id: string;
  onClose: () => void;
  onStatusChange: () => void;
}

interface DocData {
  _id: string;
  status: string;
  createdAt: string;
  answers: Record<string, unknown>;
  [key: string]: unknown;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'নতুন' },
  { value: 'reviewed', label: 'দেখা হয়েছে' },
  { value: 'contacted', label: 'যোগাযোগ হয়েছে' },
  { value: 'archived', label: 'সংরক্ষিত' },
];

export default function AdminDetailModal({ form, id, onClose, onStatusChange }: Props) {
  const [doc, setDoc] = useState<DocData | null>(null);
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/${form}/${id}`);
        const data = await res.json();
        if (!active) return;
        setDoc(data.doc);
        setFields(data.fields || []);
        setStatus(data.doc?.status || 'new');
      } catch {
        /* empty */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [form, id]);

  // Esc দিয়ে বন্ধ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus);
    setSavingStatus(true);
    try {
      await fetch(`/api/admin/${form}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      onStatusChange();
    } catch {
      /* empty */
    } finally {
      setSavingStatus(false);
    }
  };

  const isUrl = (v: unknown) => typeof v === 'string' && /^https?:\/\//.test(v);

  const renderValue = (field: FieldConfig, value: unknown) => {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return <span className="text-gray-300">—</span>;
    }
    if (field.type === 'file' && isUrl(value)) {
      return (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 font-medium"
        >
          ফাইল দেখুন <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span key={i} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-lg">
              {String(v)}
            </span>
          ))}
        </div>
      );
    }
    return <span className="whitespace-pre-wrap">{String(value)}</span>;
  };

  const dataFields = fields.filter((f) => f.type !== 'section');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">বিস্তারিত তথ্য</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full" />
          </div>
        ) : !doc ? (
          <div className="py-20 text-center text-gray-500">তথ্য পাওয়া যায়নি</div>
        ) : (
          <>
            {/* Status control */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">অবস্থা:</span>
              <select
                value={status}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={savingStatus}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:border-green-500 outline-none"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {savingStatus && <span className="text-xs text-gray-400">সংরক্ষণ হচ্ছে...</span>}
              {typeof doc.emailSent === 'boolean' && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    doc.emailSent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {doc.emailSent ? 'মেইল পাঠানো হয়েছে' : 'মেইল যায়নি'}
                </span>
              )}
              <a
                href={`/api/admin/${encodeURIComponent(form)}/${encodeURIComponent(id)}/docx`}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Word ডাউনলোড
              </a>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-4">
              {dataFields.map((field) => (
                <div key={field.name} className="border-b border-gray-50 pb-3 last:border-0">
                  <p className="text-xs font-semibold text-gray-400 mb-1">{field.label}</p>
                  <div className="text-sm text-gray-800">
                    {renderValue(field, doc.answers?.[field.name])}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
