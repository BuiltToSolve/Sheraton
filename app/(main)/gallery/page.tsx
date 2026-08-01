import { PageHero } from '@/components/page-hero';
import { GalleryGrid } from '@/components/sections/gallery-grid';

export const metadata = {
  title: 'Gallery - Samrat Sheraton',
  description: 'View our gallery of stunning hotel facilities, rooms, and amenities. Click any image to zoom in.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Hotel Gallery"
        breadcrumb="Gallery"
        image="https://images.pexels.com/photos/3011575/pexels-photo-3011575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-cream section-pattern">
        <div className="container mx-auto px-4">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
