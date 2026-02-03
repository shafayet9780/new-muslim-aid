'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { Testimonial as TestimonialType } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

interface TestimonialsProps {
  testimonials?: TestimonialType[];
}

export default function Testimonials({ testimonials: propTestimonials }: TestimonialsProps) {
  const t = useTranslations('home');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use dynamic testimonials from CMS or fallback to mock data
  const testimonials = propTestimonials || [
    {
      _id: '1',
      name: locale === 'bn' ? 'আহমেদ রহমান' : 'Ahmed Rahman',
      nameBn: 'আহমেদ রহমান',
      location: locale === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh',
      locationBn: 'ঢাকা, বাংলাদেশ',
      content: locale === 'bn'
        ? 'এই সংস্থার সাহায্যে আমি ইসলাম সম্পর্কে সঠিক জ্ঞান অর্জন করতে পেরেছি। তাদের গাইডেন্স এবং সহায়তা আমার জীবনে অসাধারণ পরিবর্তন এনেছে।'
        : 'With the help of this organization, I was able to gain proper knowledge about Islam. Their guidance and support brought extraordinary changes to my life.',
      contentBn: 'এই সংস্থার সাহায্যে আমি ইসলাম সম্পর্কে সঠিক জ্ঞান অর্জন করতে পেরেছি। তাদের গাইডেন্স এবং সহায়তা আমার জীবনে অসাধারণ পরিবর্তন এনেছে।',
      rating: 5,
      isAnonymous: false,
      conversionDate: '2023-08-15',
      image: null,
      featured: false,
      status: 'published'
    },
    {
      _id: '2',
      name: locale === 'bn' ? 'ফাতিমা খাতুন' : 'Fatima Khatun',
      nameBn: 'ফাতিমা খাতুন',
      location: locale === 'bn' ? 'চট্টগ্রাম, বাংলাদেশ' : 'Chittagong, Bangladesh',
      locationBn: 'চট্টগ্রাম, বাংলাদেশ',
      content: locale === 'bn'
        ? 'আমি যখন ইসলাম গ্রহণ করি, তখন অনেক চ্যালেঞ্জের সম্মুখীন হয়েছিলাম। কিন্তু এই সংস্থার স্বেচ্ছাসেবকরা আমাকে প্রতিটি পদক্ষেপে সাহায্য করেছেন।'
        : 'When I embraced Islam, I faced many challenges. But the volunteers of this organization helped me at every step.',
      contentBn: 'আমি যখন ইসলাম গ্রহণ করি, তখন অনেক চ্যালেঞ্জের সম্মুখীন হয়েছিলাম। কিন্তু এই সংস্থার স্বেচ্ছাসেবকরা আমাকে প্রতিটি পদক্ষেপে সাহায্য করেছেন।',
      rating: 5,
      isAnonymous: false,
      conversionDate: '2023-11-20',
      image: null,
      featured: false,
      status: 'published'
    },
    {
      _id: '3',
      name: locale === 'bn' ? 'নাম গোপন' : 'Anonymous',
      nameBn: 'নাম গোপন',
      location: locale === 'bn' ? 'সিলেট, বাংলাদেশ' : 'Sylhet, Bangladesh',
      locationBn: 'সিলেট, বাংলাদেশ',
      content: locale === 'bn'
        ? 'পারিবারিক চাপের কারণে আমি অনেক কষ্টে ছিলাম। কিন্তু এখানকার কাউন্সেলিং সেবা আমাকে মানসিকভাবে শক্তিশালী করেছে।'
        : 'I was in great distress due to family pressure. But the counseling service here made me mentally stronger.',
      contentBn: 'পারিবারিক চাপের কারণে আমি অনেক কষ্টে ছিলাম। কিন্তু এখানকার কাউন্সেলিং সেবা আমাকে মানসিকভাবে শক্তিশালী করেছে।',
      rating: 5,
      isAnonymous: true,
      conversionDate: '2024-01-10',
      image: null,
      featured: false,
      status: 'published'
    },
    {
      _id: '4',
      name: locale === 'bn' ? 'মোহাম্মদ হাসান' : 'Mohammad Hasan',
      nameBn: 'মোহাম্মদ হাসান',
      location: locale === 'bn' ? 'রাজশাহী, বাংলাদেশ' : 'Rajshahi, Bangladesh',
      locationBn: 'রাজশাহী, বাংলাদেশ',
      content: locale === 'bn'
        ? 'এই সংস্থার মাধ্যমে আমি শুধু ইসলাম সম্পর্কে জানিনি, বরং একটি নতুন পরিবার পেয়েছি। সবাই এত ভালোবাসা দিয়েছে।'
        : 'Through this organization, I not only learned about Islam but also found a new family. Everyone gave so much love.',
      contentBn: 'এই সংস্থার মাধ্যমে আমি শুধু ইসলাম সম্পর্কে জানিনি, বরং একটি নতুন পরিবার পেয়েছি। সবাই এত ভালোবাসা দিয়েছে।',
      rating: 5,
      isAnonymous: false,
      conversionDate: '2023-12-05',
      image: null,
      featured: false,
      status: 'published'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (locale === 'bn') {
      return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-islamic-primary mb-4">
          {t('testimonials')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {locale === 'bn'
            ? 'যারা আমাদের সাহায্যে তাদের ইসলামিক যাত্রা শুরু করেছেন, তাদের অভিজ্ঞতা শুনুন'
            : 'Hear from those who started their Islamic journey with our help'
          }
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Testimonial Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-islamic-accent/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Quote Icon */}
          <div className="text-6xl text-islamic-primary/20 mb-6">&ldquo;</div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Rating */}
            <div className="flex items-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-islamic-accent" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
              {locale === 'bn' ? currentTestimonial.contentBn : currentTestimonial.content}
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-islamic-primary mb-1">
                  {locale === 'bn' ? currentTestimonial.nameBn : currentTestimonial.name}
                </h4>
                <p className="text-gray-600 mb-2">
                  {locale === 'bn' ? currentTestimonial.locationBn : currentTestimonial.location}
                </p>
                <p className="text-sm text-gray-500">
                  {locale === 'bn' ? 'ইসলাম গ্রহণ: ' : 'Embraced Islam: '}
                  {formatDate(currentTestimonial.conversionDate)}
                </p>
              </div>

              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-islamic-primary to-islamic-secondary rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                {currentTestimonial.image ? (
                  <Image
                    src={urlFor(currentTestimonial.image).width(64).height(64).url()}
                    alt={locale === 'bn' ? currentTestimonial.nameBn : currentTestimonial.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {currentTestimonial.isAnonymous ? '?' : (locale === 'bn' ? currentTestimonial.nameBn : currentTestimonial.name).charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevTestimonial}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-islamic-primary hover:bg-islamic-primary hover:text-white"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-islamic-primary' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-islamic-primary hover:bg-islamic-primary hover:text-white"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-islamic-primary mb-2">98%</div>
            <div className="text-gray-600">
              {locale === 'bn' ? 'সন্তুষ্ট ব্যবহারকারী' : 'Satisfied Users'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-islamic-primary mb-2">24/7</div>
            <div className="text-gray-600">
              {locale === 'bn' ? 'সহায়তা সেবা' : 'Support Service'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-islamic-primary mb-2">100%</div>
            <div className="text-gray-600">
              {locale === 'bn' ? 'বিনামূল্যে সেবা' : 'Free Service'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 