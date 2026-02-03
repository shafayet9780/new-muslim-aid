import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const locales = ['bn'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLocale = locales.includes(locale);
  
  if (!isValidLocale) {
    notFound();
  }

  return {
    title: locale === 'bn' 
      ? 'বাংলাদেশে নওমুসলিমদের সহায়তা' 
      : 'New Muslim Support - Bangladesh',
    description: locale === 'bn'
      ? 'ইসলামে নতুন আগতদের জন্য সম্পূর্ণ গাইড এবং সহায়তা'
      : 'Complete guide and support for new Muslims in Bangladesh',
    keywords: locale === 'bn'
      ? 'ইসলাম, মুসলিম, ধর্মান্তর, বাংলাদেশ, সহায়তা, গাইড'
      : 'Islam, Muslim, conversion, Bangladesh, support, guide',
    openGraph: {
      title: locale === 'bn' 
        ? 'বাংলাদেশে নওমুসলিমদের সহায়তা' 
        : 'New Muslim Support - Bangladesh',
      description: locale === 'bn'
        ? 'ইসলামে নতুন আগতদের জন্য সম্পূর্ণ গাইড এবং সহায়তা'
        : 'Complete guide and support for new Muslims in Bangladesh',
      type: 'website',
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" className={locale === 'bn' ? 'font-bengali' : 'font-english'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B4332" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            {/* Main Header */}
            <Header />
            
            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 