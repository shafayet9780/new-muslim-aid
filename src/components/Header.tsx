'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  UserPlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

import Image from 'next/image';

import logo from '../../public/logo.png';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations('navigation');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainNavigation = [
    { name: t('howToConvert'), href: `/${locale}/under-development` },
    { name: t('bibaho'), href: `/${locale}/under-development` },
    { name: t('shelter'), href: `/${locale}/under-development` },
    { name: t('deenShikkha'), href: `/${locale}/under-development` },
    { name: t('donation'), href: `/${locale}/donation` },
  ];

  const resourcesNavigation = [
    { name: t('entrepreneurs'), href: `/${locale}/under-development` },
    { name: t('newMuslimGuide'), href: `/${locale}/under-development` },
    { name: t('volunteer'), href: `/${locale}/under-development` },
    { name: t('projects'), href: `/${locale}/under-development` },
    { name: t('events'), href: `/${locale}/under-development` },
  ];

  const aboutNavigation = [
    { name: t('about'), href: `/${locale}/under-development` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const allNavigation = [
    ...mainNavigation,
    ...resourcesNavigation,
    ...aboutNavigation
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* Top Emergency Bar - Fixed */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2.5">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">
                    {locale === 'bn' ? 'হটলাইন:' : 'Hot Line:'}
                  </span>
                  <span className="ml-2 font-bold text-white">01861886162</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white">
                    {locale === 'bn' ? '২৪/৭ সেবা' : '24/7 Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Improved */}
      <div className="bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Fixed Colors */}
            <Link href={`/${locale}`} className="flex items-center space-x-3 group">
              <div className="relative">
                <Image src={logo} alt="new muslim aid logo" width={60} height={60} className='rounded-xl' loading="lazy" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                  {locale === 'bn' ? 'নিউমুসলিম এইড ফাউন্ডেশন' : 'New Muslim Aid Foundation'}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  <span className="ml-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-islamic-primary)' }}></span>
                  <span className="text-xs">{locale === 'bn' ? 'সত্যের পথে সহযোগী হই, জান্নাতের পথে এগিয়ে যাই' : 'Let us unite on the path of truth and move forward towards Jannah'}</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Improved */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Main Links */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-[6px] py-2 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 rounded-lg hover:bg-green-50"
                >
                  {item.name}
                </Link>
              ))}

              {/* About Links */}
              {aboutNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 rounded-lg hover:bg-green-50"
                >
                  {item.name}
                </Link>
              ))}

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-green-700 font-medium transition-all duration-200 rounded-lg hover:bg-green-50"
                >
                  <span>{locale === 'bn' ? 'আরও দেখুন' : 'More'}</span>
                  <ChevronDownIcon className={`w-4 h-4 ml-1 text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {resourcesNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Button & Mobile Menu - Fixed Colors */}
            <div className="flex items-center space-x-3">
              <a
                href="https://docs.google.com/forms/u/0/d/1SuoAiAINk5s2KauBBPRRyye7sezcKmxh3Jm14ahiDjA/edit?fromCopy=true&ct=2"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}
              >
                <UserPlusIcon className="w-4 h-4 mr-2 text-white" />
                <span className="text-white">{locale === 'bn' ? 'ইসলাম গ্রহণ কেন জরুরি?' : 'Why accepting Islam is essential?'}</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Improved */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container-custom py-4">
            <nav className="space-y-1">
              {allNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100">
                <a
                  href="https://docs.google.com/forms/u/0/d/1SuoAiAINk5s2KauBBPRRyye7sezcKmxh3Jm14ahiDjA/edit?fromCopy=true&ct=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white px-3 py-2 rounded-lg font-semibold w-full justify-center"
                  style={{ background: `linear-gradient(135deg, var(--color-islamic-primary), var(--color-islamic-secondary))` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">{locale === 'bn' ? 'ইসলাম গ্রহণ কেন জরুরি?' : 'Why accepting Islam is essential?'}</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 