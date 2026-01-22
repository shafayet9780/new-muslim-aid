import { useLocale } from "next-intl";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  // ChatBubbleLeftRightIcon,
  // UserIcon,
  // HeartIcon,
} from "@heroicons/react/24/outline";

// Facebook Icon Component
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function ContactPage() {
  const locale = useLocale();

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: locale === "bn" ? "ফোন" : "Phone",
      value: "01861886162",
      description:
        locale === "bn" ? "২৪/৭ জরুরি সহায়তা" : "24/7 Emergency Support",
    },
    {
      icon: EnvelopeIcon,
      title: locale === "bn" ? "ইমেইল" : "Email",
      value: "aidnewmuslim@gmail.com",
      description:
        locale === "bn" ? "সাধারণ প্রশ্নের জন্য" : "For General Inquiries",
      link: "mailto:aidnewmuslim@gmail.com",
    },
    {
      icon: MapPinIcon,
      title: locale === "bn" ? "অফিস" : "Office",
      value:
        locale === "bn"
          ? "হোল্ডিং নং-০৩, ফকিরবাড়ি মার্কেট, ব্লক-বি, মিরপুর-১০"
          : "Holding No-03, Fakir Bari Market, Block-B, Mirpur-10",
      description: locale === "bn" ? "মূল কার্যালয়" : "Main Office",
      link: "https://tiny.cc/dawah",
      showMapLink: true,
    },
    {
      icon: ClockIcon,
      title: locale === "bn" ? "সময়সূচি" : "Hours",
      value: locale === "bn" ? "২৪/৭ সেবা" : "24/7 Service",
      description: locale === "bn" ? "সপ্তাহের সব দিন" : "All Days of the Week",
    },
    {
      icon: FacebookIcon,
      title: locale === "bn" ? "ফেসবুক" : "Facebook",
      value: "fb.com/newmuslimaid",
      description:
        locale === "bn" ? "আমাদের সাথে যুক্ত থাকুন" : "Stay Connected With Us",
      link: "https://fb.com/newmuslimaid",
    },
  ];

  // const services = [
  //   {
  //     icon: HeartIcon,
  //     title: locale === "bn" ? "ধর্মান্তর সহায়তা" : "Conversion Support",
  //     description:
  //       locale === "bn"
  //         ? "ইসলাম গ্রহণে সহায়তা এবং গাইডলাইন"
  //         : "Support and guidance for converting to Islam",
  //   },
  //   {
  //     icon: UserIcon,
  //     title:
  //       locale === "bn" ? "নও মুসলিম কাউন্সেলিং" : "New Muslim Counseling",
  //     description:
  //       locale === "bn"
  //         ? "ব্যক্তিগত এবং পারিবারিক সমস্যা সমাধান"
  //         : "Personal and family issue resolution",
  //   },
  //   {
  //     icon: ChatBubbleLeftRightIcon,
  //     title: locale === "bn" ? "শিক্ষামূলক সেশন" : "Educational Sessions",
  //     description:
  //       locale === "bn"
  //         ? "ইসলামিক শিক্ষা এবং প্রশিক্ষণ"
  //         : "Islamic education and training",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              {locale === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
            </h1>
            <p className="text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              {locale === "bn"
                ? "আপনার প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনার পাশে আছি।"
                : "Get in touch with us for any questions or support. We are here for you."}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-20">
        {/* Contact Information */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactInfo.slice(0, 3).map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-green-600 mb-2 hover:text-green-700 transition-colors break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-2xl font-bold text-green-600 mb-2 break-all">
                      {info.value}
                    </p>
                  )}
                  <p className="text-gray-600">{info.description}</p>
                  {info.showMapLink && (
                    <div className="mt-4">
                      <a
                        href="https://tiny.cc/dawah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        {locale === "bn"
                          ? "অফিসের অবস্থান দেখুন"
                          : "See Office Location in Google Maps"}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
            {contactInfo.slice(3).map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-green-600 mb-2 hover:text-green-700 transition-colors break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-2xl font-bold text-green-600 mb-2 break-all">
                      {info.value}
                    </p>
                  )}
                  <p className="text-gray-600">{info.description}</p>
                  {info.showMapLink && (
                    <div className="mt-4">
                      <a
                        href="https://tiny.cc/dawah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        {locale === "bn"
                          ? "অফিসের অবস্থান দেখুন"
                          : "See Office Location in Google Maps"}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        {/* <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {locale === "bn" ? "আমাদের সেবাসমূহ" : "Our Services"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Contact Form - Temporarily Commented Out */}
        {/*
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">
                {locale === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch'}
              </h2>
              <p className="text-xl opacity-90">
                {locale === 'bn' 
                  ? 'আপনার প্রশ্ন বা সহায়তার জন্য ফর্মটি পূরণ করুন' 
                  : 'Fill out the form below for any questions or support'
                }
              </p>
            </div>
            
            <div className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {locale === 'bn' ? 'নাম' : 'Name'}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={locale === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {locale === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={locale === 'bn' ? 'আপনার ফোন নম্বর' : 'Your phone number'}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {locale === 'bn' ? 'ইমেইল' : 'Email'}
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder={locale === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Your email address'}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {locale === 'bn' ? 'বিষয়' : 'Subject'}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200">
                    <option value="">
                      {locale === 'bn' ? 'একটি বিষয় নির্বাচন করুন' : 'Select a subject'}
                    </option>
                    <option value="conversion">
                      {locale === 'bn' ? 'ইসলাম গ্রহণ সম্পর্কে' : 'About Converting to Islam'}
                    </option>
                    <option value="support">
                      {locale === 'bn' ? 'সহায়তা প্রয়োজন' : 'Need Support'}
                    </option>
                    <option value="education">
                      {locale === 'bn' ? 'শিক্ষামূলক প্রশ্ন' : 'Educational Questions'}
                    </option>
                    <option value="volunteer">
                      {locale === 'bn' ? 'দ্বায়ী হতে চান' : 'Want to Volunteer'}
                    </option>
                    <option value="other">
                      {locale === 'bn' ? 'অন্যান্য' : 'Other'}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {locale === 'bn' ? 'বার্তা' : 'Message'}
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder={locale === 'bn' ? 'আপনার বার্তা লিখুন...' : 'Write your message...'}
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    {locale === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        */}

        {/* Emergency Contact */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              {locale === "bn"
                ? "জরুরি সহায়তা প্রয়োজন?"
                : "Need Emergency Support?"}
            </h3>
            <p className="text-xl mb-6 opacity-90">
              {locale === "bn"
                ? "আমাদের জরুরি হটলাইনে কল করুন। আমরা ২৪/৭ আপনার পাশে আছি।"
                : "Call our emergency hotline. We are available 24/7."}
            </p>
            <div className="text-4xl font-bold">01861886162</div>
          </div>
        </div>
      </div>
    </div>
  );
}
