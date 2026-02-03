'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  HeartIcon, 
  UserGroupIcon, 
  PhoneIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

// Facebook Icon Component
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function CallToAction() {
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden py-20 mb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 mt-12">
          {locale === 'bn' 
            ? 'ইসলামের পথে যাত্রা শুরু করুন আজই' 
            : 'Begin Your Journey to Islam Today'
          }
        </h2>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {locale === 'bn'
            ? 'আপনি যেখানেই থাকুন না কেন, আমরা আপনার পাশে আছি। আপনার ইসলামিক যাত্রায় আমাদের সাথে যুক্ত হোন।'
            : 'Wherever you are, we are here for you. Join us in your Islamic journey.'
          }
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* New to Islam */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-islamic-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="w-8 h-8 text-islamic-dark" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'ইসলামে নতুন?' : 'New to Islam?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'ইসলাম গ্রহণের সম্পূর্ণ গাইড এবং প্রয়োজনীয় সহায়তা পান।'
                : 'Get complete guidance and necessary support for embracing Islam.'
              }
            </p>
            
            <Link
              href={`/${locale}/under-development`}
              className="inline-flex items-center bg-islamic-accent hover:bg-yellow-500 text-islamic-dark font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'শুরু করুন' : 'Get Started'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Want to Help */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="w-8 h-8 text-islamic-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'সাহায্য করতে চান?' : 'Want to Help?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'দ্বায়ী হয়ে অন্যদের ইসলামিক যাত্রায় সহায়তা করুন।'
                : 'Become a volunteer and help others in their Islamic journey.'
              }
            </p>
            
            <a
              href="https://docs.google.com/forms/u/0/d/1SuoAiAINk5s2KauBBPRRyye7sezcKmxh3Jm14ahiDjA/edit?fromCopy=true&ct=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-islamic-primary font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'যোগ দিন' : 'Join Us'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Need Help */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {locale === 'bn' ? 'সাহায্য প্রয়োজন?' : 'Need Help?'}
            </h3>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              {locale === 'bn'
                ? 'যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন। আমরা আছি।'
                : 'Contact us for any problem. We are here for you.'
              }
            </p>
            
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 group-hover:translate-y-1"
            >
              <span className="mr-2">
                {locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Enhanced Bottom Message */}
        <div className="relative rounded-3xl p-12 border border-emerald-100 shadow-md overflow-hidden mx-4 md:mx-8 lg:mx-12 xl:mx-16"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 60%, #d1fae5 100%)'
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32" style={{background: 'rgba(16,185,129,0.08)', borderRadius: '9999px', transform: 'translate(4rem, -4rem)'}}></div>
          <div className="absolute bottom-0 left-0 w-24 h-24" style={{background: 'rgba(52,211,153,0.08)', borderRadius: '9999px', transform: 'translate(-3rem, 3rem)'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40" style={{background: 'rgba(16,185,129,0.06)', borderRadius: '9999px', filter: 'blur(8px)'}}></div>
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Enhanced Header */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-200/60 to-yellow-100/60 rounded-full px-6 py-3 mb-6 border border-emerald-300/50">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-300 to-yellow-200 rounded-full flex items-center justify-center mr-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-green-900 uppercase tracking-wider">
                  {locale === 'bn' ? 'বিশ্বস্ত এবং নির্ভরযোগ্য' : 'Trusted & Reliable'}
                </span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-green-900 via-emerald-700 to-green-900 bg-clip-text text-transparent">
                {locale === 'bn' 
                  ? 'আমরা আপনার পাশে আছি' 
                  : 'We Are Here For You'
                }
              </h3>
            </div>
            <p className="text-xl lg:text-2xl text-green-800 max-w-5xl mx-auto leading-relaxed mb-12 font-light">
              {locale === 'bn'
                ? 'আমরা প্রতিশ্রুতি দিচ্ছি যে আপনার ইসলামিক যাত্রার প্রতিটি পদক্ষেপে আমরা আপনার পাশে থাকব। আপনার গোপনীয়তা রক্ষা করব এবং সর্বোচ্চ সম্মানের সাথে আপনাকে সেবা প্রদান করব।'
                : 'We promise to be with you at every step of your Islamic journey. We will protect your privacy and serve you with the utmost respect.'
              }
            </p>
            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="group bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full"></div>
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-2">
                  {locale === 'bn' ? '১০০% বিনামূল্যে' : '100% Free'}
                </h4>
                <p className="text-green-700 text-sm">
                  {locale === 'bn' ? 'কোনো খরচ নেই' : 'No hidden costs'}
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full"></div>
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-2">
                  {locale === 'bn' ? 'সম্পূর্ণ গোপনীয়' : 'Completely Confidential'}
                </h4>
                <p className="text-green-700 text-sm">
                  {locale === 'bn' ? 'আপনার তথ্য নিরাপদ' : 'Your data is secure'}
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full"></div>
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-2">
                  {locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Available'}
                </h4>
                <p className="text-green-700 text-sm">
                  {locale === 'bn' ? 'সার্বক্ষণিক সহায়তা' : 'Round-the-clock support'}
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full"></div>
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-2">
                  {locale === 'bn' ? 'বিশেষজ্ঞ গাইডেন্স' : 'Expert Guidance'}
                </h4>
                <p className="text-green-700 text-sm">
                  {locale === 'bn' ? 'অভিজ্ঞ আলেমদের সহায়তা' : 'Experienced scholars'}
                </p>
              </div>
            </div>
            {/* Facebook Link */}
            <div className="mt-8 flex justify-center">
              <a
                href="https://fb.com/newmuslimaid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-colors duration-200"
              >
                <FacebookIcon className="w-6 h-6 mr-2" />
                {locale === 'bn' ? 'ফেসবুকে আমাদের অনুসরণ করুন' : 'Follow us on Facebook'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 