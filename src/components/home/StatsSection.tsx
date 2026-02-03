'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { 
  UsersIcon, 
  HeartIcon, 
  FolderOpenIcon, 
  MapPinIcon,
  TrophyIcon,
  ClockIcon,
  ShieldCheckIcon,
  // SparklesIcon
} from '@heroicons/react/24/outline';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  isVisible?: boolean;
}

function Counter({ end, duration = 2000, suffix = '', isVisible = false }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const t = useTranslations('home.stats');
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: UsersIcon,
      value: 100,
      label: t('peopleHelped'),
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      description: locale === 'bn' ? 'নও মুসলিম ভাই-বোন' : 'New Muslim Brothers & Sisters'
    },
    {
      icon: HeartIcon,
      value: 25,
      label: t('volunteers'),
      suffix: '+',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      description: locale === 'bn' ? 'দক্ষ স্বেচ্ছাসেবক' : 'Skilled Volunteers'
    },
    {
      icon: FolderOpenIcon,
      value: 4,
      label: t('projects'),
      suffix: '',
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50',
      description: locale === 'bn' ? 'সক্রিয় প্রকল্প' : 'Active Projects'
    },
    {
      icon: MapPinIcon,
      value: 64,
      label: t('locations'),
      suffix: '',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      description: locale === 'bn' ? 'সেবা এলাকা' : 'Service Areas'
    }
  ];

  const achievements = [
    {
      icon: TrophyIcon,
      title: locale === 'bn' ? 'স্বীকৃতি' : 'Recognition',
      description: locale === 'bn' ? 'দেশবরেণ্য ব্যক্তিবর্গ ও আলেমগণের দোয়া' : 'Blessings of the Renowned Person and Alim Community',
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: ClockIcon,
      title: locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Service',
      description: locale === 'bn' ? 'সার্বক্ষণিক জরুরি সহায়তা' : 'Round-the-clock Emergency Support',
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: ShieldCheckIcon,
      title: locale === 'bn' ? '১০০% নিরাপত্তা' : '100% Security',
      description: locale === 'bn' ? 'সম্পূর্ণ গোপনীয়তা নিশ্চিত' : 'Complete Privacy Guaranteed',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-islamic-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-islamic-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-islamic-secondary/5 rounded-full blur-xl"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center bg-green-50 rounded-full px-6 py-3 mb-8">
            <SparklesIcon className="w-5 h-5 text-green-700 mr-2" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">
              {locale === 'bn' ? 'আমাদের অর্জন' : 'Our Achievements'}
            </span>
          </div> */}
          
          {/* <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {locale === 'bn' ? 'আমাদের প্রভাব' : 'Our Impact'}
          </h2> */}

<h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {locale === 'bn' ? 'ফিতনার জমানায় আমাদের করণীয়' : 'What to do in times of fitna'}
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {locale === 'bn'
              ? '“তোমাদের মধ্যে একটি দল থাকা উচিত যারা কল্যাণের দিকে আহ্বান করবে, সৎ কাজের নির্দেশ দেবে এবং অসৎ কাজ থেকে বিরত রাখবে। তারাই সফলকাম।” — [সূরা আলে ইমরান, ৩:১০৪]'
              : 'We are proud to have made a positive impact in many people\'s lives. Every day, we create new success stories that inspire and transform communities.'
            }
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={stat.label}
                className={`group relative bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${stat.gradient} rounded-full transform translate-x-12 -translate-y-12`}></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className="text-center mb-4">
                    <div className="text-5xl font-black text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                      <Counter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                    </div>
                    <div className="text-lg font-bold text-gray-700 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.description}
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </div>
            );
          })}
        </div>

        {/* Achievements Section - Fixed Colors */}
        <div className="bg-green-50 rounded-3xl p-12 border border-green-200 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'bn' ? 'আমাদের বিশেষত্ব' : 'What Makes Us Special'}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'bn'
                ? 'আমাদের প্রতিটি সেবা আন্তরিকতা, পেশাদারিত্ব এবং ইসলামিক মূল্যবোধের ভিত্তিতে প্রদান করা হয়'
                : 'Every service we provide is delivered with sincerity, professionalism, and Islamic values at its core'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  className={`text-center group p-6 rounded-2xl ${achievement.bgColor} border border-white/50 hover:shadow-lg transition-all duration-300`}
                  style={{ animationDelay: `${(index + 4) * 200}ms` }}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`} style={{ background: `linear-gradient(135deg, ${achievement.gradient === 'from-yellow-500 to-orange-500' ? '#eab308, #f97316' : achievement.gradient === 'from-blue-500 to-indigo-500' ? '#3b82f6, #6366f1' : '#10b981, #059669'})` }}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Commitment Section */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100">
            <h3 className="text-4xl font-bold text-green-700 mb-6">
              {locale === 'bn' ? 'আমাদের অঙ্গীকার' : 'Our Commitment'}
            </h3>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
              {locale === 'bn'
                ? 'আমরা প্রতিটি নও মুসলিমকে তাদের নতুন যাত্রায় সহায়তা করার জন্য প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো প্রত্যেক নও মুসলিম এর ধর্মীয় অধিকার, নাগরিক অধিকার এবং ধর্মীয় শিক্ষা অর্জনে সর্বোচ্চ সহযোগিতা করা।'
                : 'We are committed to supporting every new Muslim in their Islamic journey. Our goal is to create a supportive and welcoming community where everyone feels safe, supported, and spiritually fulfilled.'
              }
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-green-50">
                <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}></div>
                <span className="font-bold text-gray-800 text-center">
                  {locale === 'bn' ? 'বিনামূল্যে সেবা' : 'Free Service'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-green-50">
                <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}></div>
                <span className="font-bold text-gray-800 text-center">
                  {locale === 'bn' ? '২৪/৭ সহায়তা' : '24/7 Support'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-green-50">
                <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}></div>
                <span className="font-bold text-gray-800 text-center">
                  {locale === 'bn' ? 'গোপনীয়তা সুরক্ষিত' : 'Privacy Protected'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-green-50">
                <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}></div>
                <span className="font-bold text-gray-800 text-center">
                  {locale === 'bn' ? 'বিশেষজ্ঞ গাইডেন্স' : 'Expert Guidance'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 