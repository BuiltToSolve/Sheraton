import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { CTA } from '@/components/sections/cta';
import { facilities } from '@/lib/data';
import { FacilitiesGrid } from '@/components/facilities-grid';

export const metadata = {
  title: 'Facilities - Hotel Samrat Sheraton',
  description: 'Explore the world-class facilities and amenities at Samrat Sheraton.',
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Hotel Facilities"
        breadcrumb="Facilities"
        image="images/IMG_5283.jpg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Amenities"
            title="World-Class Facilities"
            subtitle="Discover the extensive range of facilities designed to make your stay at Samrat Sheraton truly exceptional."
          />

          <FacilitiesGrid facilities={facilities} />
        </div>
      </section>

      <hr className="h-2 w-full bg-gold" />
      <CTA />
    </>
  );
}
