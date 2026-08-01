import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Rooms } from '@/components/sections/rooms';
import { Facilities } from '@/components/sections/facilities';
import { Offers } from '@/components/sections/offers';
import { Testimonials } from '@/components/sections/testimonials';
import { Stats } from '@/components/sections/stats';
import { Gallery } from '@/components/sections/gallery';
import { Blog } from '@/components/sections/blog';
import { CTA } from '@/components/sections/cta';
import { Preloader } from '@/components/preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <About />
      <Rooms />
      <Facilities />
      <Offers />
      <Stats />
      <Testimonials />
      <Gallery />
      <Blog />
      <CTA />
    </>
  );
}
