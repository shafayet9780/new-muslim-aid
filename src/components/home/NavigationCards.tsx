'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  HeartIcon,
  BookOpenIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  PhoneIcon,
  HandRaisedIcon,
  ArrowRightIcon,
  SparklesIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

import {HomeModernIcon} from '@heroicons/react/24/solid'

export default function NavigationCards() {
  const locale = useLocale();
  const t = useTranslations('home');
  

  const cards = [
    {
      id: 'why-islam',
      title: t('cards.whyIslam.title'),
      description: t('cards.whyIslam.description'),
      href: `/${locale}/under-development`,
      icon: HeartIcon,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200/50',
      hoverShadow: 'hover:shadow-red-500/25',
      featured: true
    },
    {
      id: 'how-to-convert',
      title: t('cards.howToConvert.title'),
      description: t('cards.howToConvert.description'),
      href: `/${locale}/under-development`,
      icon: BookOpenIcon,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200/50',
      hoverShadow: 'hover:shadow-blue-500/25',
      featured: true
    },
    {
      id: 'new-muslim-guide',
      title: t('cards.newMuslimGuide.title'),
      description: t('cards.newMuslimGuide.description'),
      href: `/${locale}/under-development`,
      icon: UserGroupIcon,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200/50',
      hoverShadow: 'hover:shadow-emerald-500/25',
      featured: true
    },
    {
      id: 'challenges',
      title: t('cards.challenges.title'),
      description: t('cards.challenges.description'),
      href: `/${locale}/under-development`,
      icon: ShieldCheckIcon,
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200/50',
      hoverShadow: 'hover:shadow-purple-500/25'
    },
    {
      id: 'projects',
      title: t('cards.projects.title'),
      description: t('cards.projects.description'),
      href: `/${locale}/under-development`,
      icon: BriefcaseIcon,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200/50',
      hoverShadow: 'hover:shadow-orange-500/25'
    },
    {
      id: 'about',
      title: t('cards.about.title'),
      description: t('cards.about.description'),
      href: `/${locale}/under-development`,
      icon: InformationCircleIcon,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200/50',
      hoverShadow: 'hover:shadow-cyan-500/25'
    },
    {
      id: 'contact',
      title: t('cards.contact.title'),
      description: t('cards.contact.description'),
      href: `/${locale}/contact`,
      icon: PhoneIcon,
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200/50',
      hoverShadow: 'hover:shadow-rose-500/25'
    },
    {
      id: 'volunteer',
      title: t('cards.volunteer.title'),
      description: t('cards.volunteer.description'),
      href: `/${locale}/under-development`,
      icon: HandRaisedIcon,
      gradient: 'from-green-500 to-pink-500',
      bgGradient: 'from-green-50 to-pink-50',
      borderColor: 'border-green-500/20',
      hoverShadow: 'hover:shadow-green-500/25',
      featured: true
    },
   { 
    id:'legalAssist',
    title: t('cards.legalAssist.title'),
    description: t('cards.legalAssist.description'),
    href: `/${locale}/under-development`,
    icon: ShieldCheckIcon,
    gradient: 'from-yellow-500 to-amber-500',
    bgGradient: 'from-yellow-50 to-amber-50', 
    borderColor: 'border-green-500/20',
    hoverShadow: 'hover:shadow-yellow-500/25',
  },
  {
    id:'affidavit',
    title: t('cards.affidavit.title'),
    description: t('cards.affidavit.description'),
    href: `/${locale}/under-development`,
    icon: BookOpenIcon,
    gradient: 'from-pink-500 to-purple-500',
    bgGradient: 'from-pink-50 to-purple-50',
    borderColor: 'border-pink-500/20',
    hoverShadow: 'hover:shadow-pink-500/25',
  },
  {
    id:'renameCertificate',
    title: t('cards.renameCertificate.title'),
    description: t('cards.renameCertificate.description'),
    href: `/${locale}/under-development`,
    icon: PencilSquareIcon,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-500/20',
    hoverShadow: 'hover:shadow-green-500/25',
  },
  {
    id:'shelter',
    title: t('cards.shelter.title'),
    description: t('cards.shelter.description'),
    href: `/${locale}/under-development`,
    icon: HomeModernIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-500/20',
    hoverShadow: 'hover:shadow-blue-500/25',
  },
  {
    id:'securityEnsure',
    title: t('cards.securityEnsure.title'),
    description: t('cards.securityEnsure.description'),
    href: `/${locale}/under-development`,
    icon: ShieldCheckIcon,
    gradient: 'from-red-500 to-yellow-500',
    bgGradient: 'from-red-50 to-yellow-50',
    borderColor: 'border-red-500/20',
    hoverShadow: 'hover:shadow-red-500/25',
  },
  {
    id:'gurdian',
    title: t('cards.gurdian.title'),
    description: t('cards.gurdian.description'),
    href: `/${locale}/under-development`,
    icon: UserGroupIcon,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-500/20',
    hoverShadow: 'hover:shadow-purple-500/25',
  },
  {
    id:'bibaho',
    title: t('cards.bibaho.title'),
    description: t('cards.bibaho.description'),
    href: `/${locale}/under-development`,
    icon: HeartIcon,
    gradient: 'from-emerald-500 to-green-500',
    bgGradient: 'from-emerald-50 to-green-50',
    borderColor: 'border-emerald-500/20',
  },
  {
    id:'deenShikkha',
    title: t('cards.deenShikkha.title'),
    description: t('cards.deenShikkha.description'),
    href: `/${locale}/under-development`,
    icon: BookOpenIcon,
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-500/20',
  }


  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-islamic-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-islamic-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-green-50 rounded-full px-6 py-3 mb-8">
            <SparklesIcon className="w-5 h-5 text-green-700 mr-2" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">
              {locale === 'bn' ? 'আমাদের সেবাসমূহ' : 'Our Services'}
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {t('navigationTitle')}
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {t('navigationSubtitle')}
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className={`group relative bg-gradient-to-br ${card.bgGradient} rounded-3xl p-8 border-2 ${card.borderColor} ${card.hoverShadow} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                  card.featured ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="w-full h-full bg-current rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>

                {/* Featured badge */}
                {card.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-islamic-accent to-yellow-400 text-islamic-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {locale === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon - Fixed Colors */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                      {card.description}
                    </p>
                  </div>

                  {/* Action indicator - Fixed Colors */}
                  <div className="flex items-center text-green-700 font-bold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2 text-green-700">
                      {locale === 'bn' ? 'আরও জানুন' : 'Learn More'}
                    </span>
                    <ArrowRightIcon className="w-5 h-5 text-green-700 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action - Fixed Colors */}
        <div className="text-center mt-20">
          <div className="bg-green-50 rounded-3xl p-12 border border-green-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'bn' ? 'আরও কোনো প্রশ্ন আছে?' : 'Have More Questions?'}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {locale === 'bn' 
                ? 'আমাদের বিশেষজ্ঞ দল আপনার সব প্রশ্নের উত্তর দিতে প্রস্তুত। যেকোনো সময় যোগাযোগ করুন।'
                : 'Our expert team is ready to answer all your questions. Contact us anytime for personalized guidance.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}
              >
                <span className="text-white">{locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}</span>
              </Link>
              <Link
                href={`/${locale}/under-development`}
                className="bg-white/90 backdrop-blur-sm border-2 border-green-300 hover:border-green-500 text-green-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-green-700">{locale === 'bn' ? 'ইসলাম গ্রহণ কেন জরুরি?' : 'Why accepting Islam is essential?'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 