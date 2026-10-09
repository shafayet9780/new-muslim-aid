'use client';

import { useEffect, useState, useCallback, use } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import AdminDetailModal from '@/components/forms/AdminDetailModal';

interface Column {
  key: string;
  label: string;
}
interface Row {
  _id: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}

const STATUS_LABELS: Record<string, string> = {
  new: 'নতুন',
  reviewed: 'দেখা হয়েছে',
  contacted: 'যোগাযোগ হয়েছে',
  archived: 'সংরক্ষিত',
};
const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewed: 'bg-amber-100 text-amber-700',
  contacted: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-600',
};

export default function AdminFormListPage({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = use(params);
  const locale = useLocale();

  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/${form}?sort=${sort}&order=${order}&page=${page}`
      );
      if (res.status === 403) {
        setForbidden(true);
        return;
      }
      const data = await res.json();
      setRows(data.rows || []);
      setColumns(data.columns || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  }, [form, sort, order, page]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const toggleSort = (key: string) => {
    if (sort === key) {
      setOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSort(key);
      setOrder('asc');
    }
    setPage(1);
  };

  const sortIcon = (key: string) => {
    if (sort !== key) return <ChevronUpDownIcon className="w-4 h-4 text-gray-300 inline" />;
    return order === 'asc' ? (
      <ArrowUpIcon className="w-3.5 h-3.5 text-green-600 inline" />
    ) : (
      <ArrowDownIcon className="w-3.5 h-3.5 text-green-600 inline" />
    );
  };

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' });

  const title =
    form === 'nikah-aid'
      ? 'Nikah Aid — পাত্র/পাত্রীর তথ্য'
      : 'নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা';

  if (forbidden) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md">
          <p className="text-lg font-bold text-gray-800 mb-2">অনুমতি নেই</p>
          <p className="text-gray-500 text-sm">এই পেজটি শুধুমাত্র অ্যাডমিনদের জন্য।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/${locale}/dashboard/admin`}
            className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">মোট {total} টি আবেদন</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full" />
            </div>
          ) : rows.length === 0 ? (
            <div className="text-center py-20 text-gray-500">কোনো আবেদন পাওয়া যায়নি</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-3">#</th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        onClick={() => toggleSort(col.key)}
                        className="text-left text-xs font-semibold text-gray-500 px-6 py-3 cursor-pointer hover:text-green-700 select-none whitespace-nowrap"
                      >
                        {col.label} {sortIcon(col.key)}
                      </th>
                    ))}
                    <th
                      onClick={() => toggleSort('status')}
                      className="text-left text-xs font-semibold text-gray-500 px-6 py-3 cursor-pointer hover:text-green-700 select-none"
                    >
                      অবস্থা {sortIcon('status')}
                    </th>
                    <th
                      onClick={() => toggleSort('createdAt')}
                      className="text-left text-xs font-semibold text-gray-500 px-6 py-3 cursor-pointer hover:text-green-700 select-none whitespace-nowrap"
                    >
                      তারিখ {sortIcon('createdAt')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row, idx) => (
                    <tr key={row._id} className="hover:bg-green-50/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {(page - 1) * 20 + idx + 1}
                      </td>
                      {columns.map((col, ci) => (
                        <td key={col.key} className="px-6 py-4">
                          {ci === 0 ? (
                            <button
                              onClick={() => setSelectedId(row._id)}
                              className="font-semibold text-green-700 hover:text-green-800 hover:underline text-left"
                            >
                              {String(row[col.key] ?? '—')}
                            </button>
                          ) : (
                            <span className="text-sm text-gray-600">
                              {String(row[col.key] ?? '—')}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            STATUS_STYLES[row.status] || 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {STATUS_LABELS[row.status] || row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                পেজ {page} / {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-green-50 disabled:opacity-40 transition-all"
                >
                  <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-green-50 disabled:opacity-40 transition-all"
                >
                  <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedId && (
        <AdminDetailModal
          form={form}
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onStatusChange={fetchRows}
        />
      )}
    </div>
  );
}
