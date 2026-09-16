import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Rooms } from '@/components/sections/rooms';
import { Facilities } from '@/components/sections/facilities';
import { Banquet } from '@/components/sections/banquet';
import { Testimonials } from '@/components/sections/testimonials';
import { Stats } from '@/components/sections/stats';
import { Gallery } from '@/components/sections/gallery';
import { Blog } from '@/components/sections/blog';
import { CTA } from '@/components/sections/cta';
import { SingleHero } from '@/components/sections/single-hero';

export default function Home() {
  return (
    <>

      <SingleHero />
      <About />
      <Rooms />
      <Facilities />
      <Banquet />
      {/* <Stats />
      <Testimonials /> */}
      <Gallery />
      <hr className="h-2 w-full bg-gold" />
      {/* <Blog /> */}
      <CTA />
    </>
  );
}
