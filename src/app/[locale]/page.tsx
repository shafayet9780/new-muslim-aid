import Hero from '@/components/home/Hero';
import NavigationCards from '@/components/home/NavigationCards';
import StatsSection from '@/components/home/StatsSection';
import LatestUpdates from '@/components/home/LatestUpdates';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import { getHomePageData } from '@/lib/sanity';
import { HomePageData } from '@/lib/sanity/types';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Fetch data from Sanity CMS
  let homeData: HomePageData | null = null;
  
  try {
    homeData = await getHomePageData();
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Fallback to static data if CMS is not available
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero data={homeData?.hero} />
      
      {/* Navigation Cards */}
      <NavigationCards />
      
      {/* Statistics Section */}
      <StatsSection data={homeData?.stats} />
      
      {/* Latest Updates */}
      <LatestUpdates posts={homeData?.latestPosts} />
      
      {/* Testimonials */}
      <Testimonials testimonials={homeData?.testimonials} />
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
} 