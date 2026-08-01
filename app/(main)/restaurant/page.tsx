'use client';

import { useState, useMemo } from 'react';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { menuItems, menuCategories, type MenuItem } from '@/lib/data';
import { useCart, type CartItem } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import {
  Plus, Minus, ShoppingCart, X, Trash2, ArrowRight,
  CheckCircle2, Leaf, UtensilsCrossed, Clock, Phone,
} from 'lucide-react';

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const cart = useCart();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleAdd = (item: MenuItem) => {
    cart.addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutOpen(false);
    setOrderPlaced(true);
    cart.clearCart();
  };

  return (
    <>
      <PageHero
        title="Restaurant & Menu"
        breadcrumb="Restaurant"
        image="https://images.pexels.com/photos/26729406/pexels-photo-26729406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Clock, title: 'Open Daily', value: '7:00 AM - 11:00 PM' },
              { icon: Phone, title: 'Reservations', value: '+880 170 1111 000' },
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

      <section className="py-20 lg:py-28 bg-cream section-pattern">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Menu"
            title="Delicious Selection"
            subtitle="Browse our curated menu featuring a variety of cuisines. Add items to your cart and check out with ease."
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category
                    ? 'bg-gold text-white shadow-lg'
                    : 'bg-white text-navy hover:bg-gold/20 border border-border'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-navy-dark/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                    {item.veg && (
                      <span className="bg-green-600/80 text-white w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm" title="Vegetarian">
                        <Leaf className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-gold text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleAdd(item)}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-medium text-sm transition-all',
                      addedId === item.id
                        ? 'bg-green-600 text-white'
                        : 'bg-navy hover:bg-gold text-white'
                    )}
                  >
                    {addedId === item.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cart.totalItems > 0 && !cartOpen && !checkoutOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gold hover:bg-gold-dark text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium text-sm">View Cart</span>
          <span className="bg-white text-gold-dark w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
            {cart.totalItems}
          </span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-navy-dark/50 animate-fade-in" />
          <div
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gold" />
                Your Cart ({cart.totalItems})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                cart.items.map((item) => (
                  <CartLine
                    key={item.id}
                    item={item}
                    onIncrease={() => cart.updateQuantity(item.id, 1)}
                    onDecrease={() => cart.updateQuantity(item.id, -1)}
                    onRemove={() => cart.removeFromCart(item.id)}
                  />
                ))
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-heading text-lg font-bold text-navy">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Service Charge (10%)</span>
                  <span className="text-sm font-medium text-navy">
                    ${(cart.totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-heading text-lg font-bold text-navy">Total</span>
                  <span className="font-heading text-2xl font-bold text-gold-dark">
                    ${(cart.totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-dark/60 animate-fade-in" onClick={() => setCheckoutOpen(false)}>
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8 animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-bold text-navy">Checkout</h3>
              <button onClick={() => setCheckoutOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6 bg-cream rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Order Total</span>
                <span className="font-heading text-xl font-bold text-gold-dark">
                  ${(cart.totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{cart.totalItems} item(s)</span>
                <span>Includes 10% service charge</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Room Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  placeholder="e.g. 305"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  placeholder="+880 170 0000 000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Special Instructions</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                  placeholder="Any allergies or preferences..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input type="radio" name="payment" defaultChecked className="accent-gold" />
                    <span className="text-sm text-navy">Room Charge</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input type="radio" name="payment" className="accent-gold" />
                    <span className="text-sm text-navy">Card on Delivery</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-dark/60 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-10 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-navy mb-3">Order Placed Successfully!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. Our kitchen will begin preparing your meal right away. You will receive a confirmation shortly.
            </p>
            <button
              onClick={() => setOrderPlaced(false)}
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CartLine({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-4 bg-cream rounded-xl p-3">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-heading text-sm font-bold text-navy truncate">{item.name}</h4>
          <button onClick={onRemove} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-2">${item.price.toFixed(2)} each</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-full border border-border">
            <button
              onClick={onDecrease}
              className="w-7 h-7 flex items-center justify-center text-navy hover:text-gold-dark transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-navy w-5 text-center">{item.quantity}</span>
            <button
              onClick={onIncrease}
              className="w-7 h-7 flex items-center justify-center text-navy hover:text-gold-dark transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="font-heading text-sm font-bold text-gold-dark">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
