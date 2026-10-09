'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { HeartIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function AdminHomePage() {
  const locale = useLocale();

  const cards = [
    {
      slug: 'nikah-aid',
      title: 'Nikah Aid',
      subtitle: 'পাত্র/পাত্রীর তথ্য',
      icon: HeartIcon,
      gradient: 'from-rose-500 to-pink-500',
      bg: 'from-rose-50 to-pink-50',
    },
    {
      slug: 'birth-CertificateReform',
      title: 'Birth Certificate Reform',
      subtitle: 'জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা',
      icon: DocumentTextIcon,
      gradient: 'from-green-500 to-emerald-500',
      bg: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-gray-500">যে ফর্মের আবেদন দেখতে চান সেটিতে ক্লিক করুন</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                href={`/${locale}/dashboard/admin/${c.slug}`}
                className={`group bg-linear-to-br ${c.bg} rounded-3xl p-8 border-2 border-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${c.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">{c.title}</h2>
                <p className="text-gray-600 text-sm">{c.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
