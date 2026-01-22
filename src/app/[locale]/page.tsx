import Hero from '@/components/home/Hero';
import NavigationCards from '@/components/home/NavigationCards';
import StatsSection from '@/components/home/StatsSection';
import LatestUpdates from '@/components/home/LatestUpdates';
// import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import BankDetails from '@/components/home/BankDetails';

// Facebook Icon Component
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Facebook Button */}
      <div className="flex justify-center my-8">
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
      {/* Navigation Cards */}
      <NavigationCards />
      {/* Bank Details */}
      <BankDetails />

      {/* Statistics Section */}
      <StatsSection />
      {/* Latest Updates */}
      <LatestUpdates />
      {/* Testimonials */}
      {/* <Testimonials /> */}
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
} 