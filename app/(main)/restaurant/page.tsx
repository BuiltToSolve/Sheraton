import { PageHero } from '@/components/page-hero';
import { UtensilsCrossed, Clock, Phone } from 'lucide-react';
import { db } from '@/lib/db';
import { RestaurantClient } from './restaurant-client';

export const metadata = {
  title: 'Restaurant & Menu - Samrat Sheraton',
  description: 'Browse our delicious menu and place an order.',
};

export default async function RestaurantPage() {
  const menuItems = await db.menuItem.findMany({
    orderBy: { category: 'asc' }
  });

  return (
    <>
      <PageHero
        title="Restaurant & Menu"
        breadcrumb="Restaurant"
        image="images/restaurant1.jpeg"
      />

      <section className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Clock, title: 'Open Daily', value: '7:00 AM - 11:00 PM' },
              { icon: Phone, title: 'Reservations', value: '+91 91518 43352' },
              { icon: UtensilsCrossed, title: 'Cuisine', value: 'Indian · Chinese · Continental' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <p className="text-xs text-white/50 uppercase tracking-wider">{item.title}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RestaurantClient menuItems={menuItems} />
    </>
  );
}
