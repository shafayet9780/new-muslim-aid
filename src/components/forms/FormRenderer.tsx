'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircleIcon, HomeIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/outline';
import { upload } from '@vercel/blob/client';
import type { FormConfig, FieldConfig } from '@/lib/form-configs';

interface Props {
  config: FormConfig;
  /** file field আছে কি না — থাকলে multipart, নাহলে JSON পাঠাবে */
  hasFiles: boolean;
}

type Values = Record<string, string | string[]>;

interface Step {
  title: string;
  fields: FieldConfig[];
}

const toBengaliNumber = (num: number) => {
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => digits[Number(d)]);
};

export default function FormRenderer({ config, hasFiles }: Props) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'bn';
  const homeHref = `/${locale}`;

  const [values, setValues] = useState<Values>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'uploading' | 'saving' | 'done' | ''>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(0);
  const [timeLeftMs, setTimeLeftMs] = useState(8000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // config এর section field দিয়ে step-এ ভাগ করি
  const steps = useMemo<Step[]>(() => {
    const result: Step[] = [];
    let current: Step | null = null;
    for (const field of config.fields) {
      if (field.type === 'section') {
        current = { title: field.label, fields: [] };
        result.push(current);
      } else {
        if (!current) {
          current = { title: config.title, fields: [] };
          result.push(current);
        }
        current.fields.push(field);
      }
    }
    return result;
  }, [config]);

  const totalSteps = steps.length;
  const isLast = step === totalSteps - 1;

  const setValue = (name: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCheckbox = (name: string, option: string) => {
    setValues((prev) => {
      const current = Array.isArray(prev[name]) ? (prev[name] as string[]) : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [name]: next };
    });
  };

  // শুধু নির্দিষ্ট step এর required field যাচাই
  const validateStep = (stepIndex: number): string | null => {
    for (const f of steps[stepIndex].fields) {
      if (!f.required) continue;
      if (f.type === 'file') {
        if (!files[f.name]) return `"${f.label}" আপলোড করুন`;
      } else if (f.type === 'checkbox') {
        const v = values[f.name];
        if (!Array.isArray(v) || v.length === 0) return `"${f.label}" পূরণ করুন`;
      } else {
        const v = values[f.name];
        if (!v || (typeof v === 'string' && v.trim() === '')) return `"${f.label}" পূরণ করুন`;
      }
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');
    setStep((s) => Math.min(totalSteps - 1, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setError('');
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // চূড়ান্ত জমার আগে সব step যাচাই
    for (let i = 0; i < totalSteps; i++) {
      const err = validateStep(i);
      if (err) {
        setStep(i);
        setError(err);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setSubmitting(true);
    const submitUrl = config.submitPath || `/api/form/${config.slug}`;
    try {
      let res: Response;
      if (hasFiles) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(values)) {
          if (Array.isArray(v)) v.forEach((item) => fd.append(k, item));
          else fd.append(k, v);
        }
        setSubmitPhase('uploading');
        for (const [k, file] of Object.entries(files)) {
          if (!file) continue;
          const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60) || 'file';
          const blob = await upload(`forms/${config.slug}/${k}-${safe}`, file, {
            access: 'public',
            handleUploadUrl: submitUrl + '/upload',
            multipart: file.size > 5 * 1024 * 1024,
          });
          fd.append(k, blob.url);
        }
        setSubmitPhase('saving');
        res = await fetch(submitUrl, { method: 'POST', body: fd });
      } else {
        setSubmitPhase('saving');
        res = await fetch(submitUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'কিছু একটা ভুল হয়েছে');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitPhase('done');
        setSuccess(data.message || 'সফলভাবে জমা হয়েছে');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      setError('আপলোড বা নেটওয়ার্কে সমস্যা হয়েছে। ফাইল (JPG/PNG/PDF, ১০ MB এর কম) যাচাই করে আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  // ৮ সেকেন্ডের কাউন্টডাউন ও স্বয়ংক্রিয় হোম রিডাইরেক্ট
  useEffect(() => {
    if (!success) return;
    const totalMs = 8000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, totalMs - elapsed);
      setTimeLeftMs(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        router.push(homeHref);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [success, router, homeHref]);

  // confetti — success হলে canvas এ রঙিন কাগজের টুকরো উড়বে (বেলুন ফাটানোর মতো রঙিন উৎসব)
  useEffect(() => {
    if (!success || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const COLORS = [
      '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
      '#FF922B', '#CC5DE8', '#20C997', '#F06595',
      '#00C9A7', '#845EC2', '#FFC75F', '#FF9671',
    ];
    const pieces = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: 8 + Math.random() * 12,
      h: 4 + Math.random() * 6,
    }));
    let raf: number;
    let alive = true;
    function draw() {
      if (!alive) return;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      let any = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.angle += p.spin;
        if (p.y < canvas.height + 40) any = true;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.angle);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      }
      if (any) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [success]);

  const secondsLeft = Math.max(1, Math.ceil(timeLeftMs / 1000));
  const progressPct = Math.max(0, Math.min(100, (timeLeftMs / 8000) * 100));

  if (submitting) {
    const phaseLabel =
      submitPhase === 'uploading' ? 'ফাইল আপলোড হচ্ছে...' :
      submitPhase === 'saving'    ? 'আবেদন সংরক্ষণ করা হচ্ছে...' :
                                    'প্রক্রিয়া চলছে...';
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <div className="relative w-28 h-28">
            <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
              <circle cx="50" cy="50" r="44" fill="none" stroke="#16a34a" strokeWidth="8"
                strokeDasharray="60 220" strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🌱</div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-gray-800">{phaseLabel}</p>
            <p className="text-sm text-gray-400">অনুগ্রহ করে পেজ বন্ধ করবেন না</p>
          </div>
          <div className="flex gap-3 items-center">
            {(['uploading','saving','done'] as const).map((ph) => (
              <div key={ph} className={`w-3 h-3 rounded-full transition-all duration-500 ${
                submitPhase === ph ? 'bg-green-600 scale-125' :
                (submitPhase === 'saving' && ph === 'uploading') || submitPhase === 'done'
                  ? 'bg-green-400' : 'bg-gray-200'
              }`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md overflow-hidden animate-in fade-in duration-300">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" />
        <div
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-8 text-center flex flex-col items-center gap-5"
        >
          {/* Celebratory Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce shadow-inner">
              <CheckCircleIcon className="w-12 h-12 text-emerald-600" />
            </div>
            <span className="absolute -top-1 -right-2 text-2xl select-none">🎉</span>
          </div>

          {/* Heading and user requested text */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              আলহামদুলিল্লাহ! 🎉
            </h2>
            <p className="text-base sm:text-lg font-bold text-emerald-800 leading-snug">
              আপনার আবেদন সফলভাবে জমা হয়েছে। জাযাকাল্লাহু খাইরান।
            </p>
          </div>

          {/* Review reassurance */}
          <p className="text-xs sm:text-sm text-gray-600 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-3.5 leading-relaxed">
            আমাদের টিম আপনার আবেদনটি গুরুত্বের সাথে পর্যালোচনা করবে এবং শীঘ্রই যোগাযোগ করবে ইনশাআল্লাহ।
          </p>

          {/* 8-second progress bar & countdown */}
          <div className="w-full space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                স্বয়ংক্রিয় রিডাইরেক্ট হচ্ছে
              </span>
              <span className="text-emerald-700 font-bold tabular-nums">
                {toBengaliNumber(secondsLeft)} সেকেন্ড বাকি
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/70">
              <div
                className="h-full bg-linear-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-75 ease-linear shadow-xs"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Return Home Button */}
          <button
            type="button"
            onClick={() => router.push(homeHref)}
            className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HomeIcon className="w-5 h-5" />
            <span>হোমে ফিরুন</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">{config.title}</h1>
        {config.description && (
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {config.description}
          </p>
        )}
      </div>

      {/* Progress / step bar */}
      <StepBar steps={steps} current={step} />

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* বর্তমান step এর title */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            ধাপ {step + 1} / {totalSteps}
          </p>
          <h2 className="text-lg font-bold text-gray-900">{steps[step].title}</h2>
        </div>

        {/* বর্তমান step এর field গুলো */}
        <div className="space-y-4">
          {steps[step].fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              values={values}
              files={files}
              setValue={setValue}
              toggleCheckbox={toggleCheckbox}
              setFile={(name, file) => setFiles((p) => ({ ...p, [name]: file }))}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="px-6 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
            >
              পূর্ববর্তী
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={goNext}
              className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              পরবর্তী
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'জমা হচ্ছে...' : 'জমা দিন'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ---------- Step / progress bar ---------- */
function StepBar({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                    done
                      ? 'bg-green-600 text-white'
                      : active
                        ? 'bg-green-600 text-white ring-4 ring-green-100'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {done ? <CheckIcon className="w-5 h-5" /> : i + 1}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    i < current ? 'bg-green-600' : 'bg-gray-100'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- একক field render ---------- */
function Field({
  field,
  values,
  files,
  setValue,
  toggleCheckbox,
  setFile,
}: {
  field: FieldConfig;
  values: Values;
  files: Record<string, File | null>;
  setValue: (name: string, value: string | string[]) => void;
  toggleCheckbox: (name: string, option: string) => void;
  setFile: (name: string, file: File | null) => void;
}) {
  const labelEl = (
    <label className="block mb-2">
      <span className="text-sm font-semibold text-gray-800">
        {field.label}
        {field.required && <span className="text-red-500 mr-1"> *</span>}
      </span>
      {field.help && <span className="block text-xs text-gray-400 mt-0.5">{field.help}</span>}
    </label>
  );

  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all';

  const strVal = typeof values[field.name] === 'string' ? (values[field.name] as string) : '';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      {labelEl}

      {(field.type === 'text' ||
        field.type === 'email' ||
        field.type === 'tel' ||
        field.type === 'number') && (
        <input
          type={field.type}
          value={strVal}
          placeholder={field.placeholder}
          onChange={(e) => setValue(field.name, e.target.value)}
          className={inputBase}
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          rows={3}
          value={strVal}
          placeholder={field.placeholder}
          onChange={(e) => setValue(field.name, e.target.value)}
          className={`${inputBase} resize-y`}
        />
      )}

      {field.type === 'date' && (
        <input
          type="date"
          value={strVal}
          onChange={(e) => setValue(field.name, e.target.value)}
          className={`${inputBase} appearance-none [color-scheme:light]`}
        />
      )}

      {field.type === 'select' && (
        <select
          value={strVal}
          onChange={(e) => setValue(field.name, e.target.value)}
          className={inputBase}
        >
          <option value="">— নির্বাচন করুন —</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === 'radio' && (
        <div className="space-y-2 mt-1">
          {field.options?.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                strVal === opt
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={opt}
                checked={strVal === opt}
                onChange={() => setValue(field.name, opt)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      )}

      {field.type === 'checkbox' && (
        <div className="space-y-2 mt-1">
          {field.options?.map((opt) => {
            const arr = Array.isArray(values[field.name]) ? (values[field.name] as string[]) : [];
            const checked = arr.includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                  checked ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCheckbox(field.name, opt)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {field.type === 'file' && (
        <div>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(field.name, e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-green-100 file:text-green-700 file:font-semibold hover:file:bg-green-200 cursor-pointer"
          />
          {files[field.name] && (
            <p className="text-xs text-green-600 mt-2">✓ {files[field.name]!.name}</p>
          )}
        </div>
      )}
    </div>
  );
}
