"use client";

import { useLocale } from "next-intl";
import { BanknotesIcon, HeartIcon, HandRaisedIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BankDetails() {
    const locale = useLocale();

    return (
        <div className="container-custom py-12">
            {/* Why Donate Section */}
            <div className="mb-20">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                    {locale === "bn" ? "কেন দান করবেন?" : "Why Donate?"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <HeartIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {locale === "bn" ? "নও মুসলিমদের সাহায্য" : "Support New Muslims"}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {locale === "bn"
                                ? "নও মুসলিমদের ইসলামিক শিক্ষা এবং জীবন গঠনে সাহায্য করুন।"
                                : "Help new Muslims in their Islamic education and life building."}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <HandRaisedIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {locale === "bn" ? "সাদাকায়ে জারিয়াহ" : "Sadaqah Jariyah"}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {locale === "bn"
                                ? "আপনার দান একটি চলমান সাওয়াব যা সারা জীবন অব্যাহত থাকবে।"
                                : "Your donation is an ongoing reward that continues throughout life."}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <BanknotesIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {locale === "bn" ? "স্বচ্ছতা ও জবাবদিহিতা" : "Transparency & Accountability"}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {locale === "bn"
                                ? "আপনার প্রতিটি টাকা সঠিক জায়গায় ব্যবহার করা হয় এবং রিপোর্ট প্রদান করা হয়।"
                                : "Every penny is used properly and reports are provided."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bank Details Section */}
            <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                    {locale === "bn" ? "ব্যাংক বিবরণ" : "Bank Details"}
                </h2>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-10 shadow-2xl border-2 border-green-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Account Name */}
                            <div className="bg-white rounded-xl px-6 py-3">
                                <div className="text-sm font-semibold text-green-600 mb-2">
                                    {locale === "bn" ? "অ্যাকাউন্ট নাম:" : "A/C Name:"}
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    NEWMUSLIM AID FOUNDATION
                                </div>
                            </div>

                            {/* Account Number */}
                            <div className="bg-white rounded-xl px-6 py-3">
                                <div className="text-sm font-semibold text-green-600 mb-2">
                                    {locale === "bn" ? "অ্যাকাউন্ট নম্বর:" : "A/C No:"}
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    0200025170018
                                </div>
                            </div>

                            {/* Bank Name */}
                            <div className="bg-white rounded-xl px-6 py-3">
                                <div className="text-sm font-semibold text-green-600 mb-2">
                                    {locale === "bn" ? "ব্যাংকের নাম:" : "Bank:"}
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    AGRANI BANK
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="bg-white rounded-xl px-6 py-3">
                                <div className="text-sm font-semibold text-green-600 mb-2">
                                    {locale === "bn" ? "শাখা:" : "Branch:"}
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    SENPARA BRANCH, DHAKA
                                </div>
                            </div>

                            {/* Routing Number */}
                            <div className="bg-white rounded-xl px-6 py-3 md:col-span-2">
                                <div className="text-sm font-semibold text-green-600 mb-2">
                                    {locale === "bn" ? "রাউটিং নম্বর:" : "Routing No:"}
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    010264210
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* দাতা সদস্য হোন - Donation CTA */}
            <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 translate-x-20"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl lg:text-4xl font-black text-white mb-6">
                            {locale === 'bn' ? 'দাতা সদস্য হোন' : 'Become a Donor Member'}
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90 font-medium mb-6 leading-relaxed max-w-2xl mx-auto">
                            {locale === 'bn'
                                ? 'মাসিক, এককালীন বা বাৎসরিক মেয়াদে আমাদের আর্থিক সাহায্য করুন। আপনার দানে পরিবর্তন আনুন নওমুসলিমদের জীবনে।'
                                : 'Support us financially through monthly, one-time, or yearly contributions. Your donation makes a difference in the lives of new Muslims.'}
                        </p>
                        <Link
                            href={`https://tiny.cc/daan`}
                            target="_blank"
                            className="inline-flex items-center bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <span>{locale === 'bn' ? 'এখনই দান করুন' : 'Donate Now'}</span>
                            <ArrowRightIcon className="w-7 h-7 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
