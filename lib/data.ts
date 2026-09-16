export const rooms = [
  {
    slug: 'double-room',
    name: 'Double Room',
    image: 'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 180,
    beds: '2 Double Bed',
    guests: 8,
    size: '55 m²',
    description:
      'Spacious double room with two comfortable double beds, perfect for families or groups. Features a modern en-suite bathroom, flat-screen TV, and a scenic view of the surrounding gardens.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Room Service', 'Safe Box'],
  },
  {
    slug: 'family-room',
    name: 'Family Room',
    image: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 240,
    beds: '3 Double Bed',
    guests: 10,
    size: '75 m²',
    description:
      'Our family room offers ample space for everyone with three double beds, a separate seating area, and a private balcony overlooking the pool. Ideal for large families seeking comfort.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Balcony', 'Safe Box'],
  },
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    image: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 320,
    beds: '1 Double Bed',
    guests: 3,
    size: '45 m²',
    description:
      'The deluxe room combines elegance and comfort with a king-size bed, premium linens, and a luxurious marble bathroom. Enjoy panoramic city views from your private terrace.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Terrace', 'Coffee Machine'],
  },
  {
    slug: 'superior-room',
    name: 'Superior Room',
    image: 'https://images.pexels.com/photos/8134775/pexels-photo-8134775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 260,
    beds: '2 Single Bed',
    guests: 4,
    size: '40 m²',
    description:
      'A refined superior room with two single beds, designed with contemporary decor and warm lighting. Includes a work desk and a cozy reading nook by the window.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Work Desk', 'Mini Bar', 'Safe Box'],
  },
  {
    slug: 'luxury-room',
    name: 'Luxury Room',
    image: 'https://images.pexels.com/photos/6394550/pexels-photo-6394550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 450,
    beds: '2 Double Bed',
    guests: 6,
    size: '85 m²',
    description:
      'Our luxury room defines opulence with a spacious living area, two double beds, a soaking tub, and exclusive access to the executive lounge. The epitome of refined hospitality.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Soaking Tub', 'Lounge Access'],
  },
  {
    slug: 'standard-room',
    name: 'Standard Room',
    image: 'https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    price: 120,
    beds: '1 Single Bed',
    guests: 2,
    size: '28 m²',
    description:
      'A cozy standard room with a comfortable single bed, perfect for solo travelers. Includes all essential amenities for a restful and productive stay.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Work Desk', 'Safe Box'],
  },
];

export const facilities = [
  {
    name: 'Restaurant',
    icon: 'UtensilsCrossed',
    images: [
      'images/restaurant1.jpeg', 
      'images/IMG_5396.jpg',
      'images/IMG_5403.jpg'
    ],
    description:
      'Experience world-class dining at our signature restaurant, serving gourmet cuisine prepared by award-winning chefs using the finest local ingredients.',
  },
  {
    name: 'Banquet Hall',
    icon: 'Hotel',
    images: [
      'images/IMG_5283.jpg',
      'images/IMG_5266.jpg',
      'images/IMG_5267.jpg'
    ],
    description:
      'Spacious banquet hall perfect for weddings, conferences, and other events. Equipped with modern amenities and professional service.',
  },
  {
    name: 'Car Parking',
    icon: 'Car',
    images: [
      'images/carparking.jpeg'
    ],
    description:
      'Secure, complimentary underground parking for all hotel guests with 24/7 surveillance and valet service available upon request.',
  },
  {
    name: 'Waiting Lounge',
    icon: 'Sofa',
    images: [
      'images/IMG_5392.jpg',
      'images/IMG_5385.jpg'
    ],
    description:
      'Waiting lounge with comfy seats for guests waiting for check-in, check-out or other services.',
  },
  // {
  //   name: 'Gym & Fitness',
  //   icon: 'Dumbbell',
  //   image: 'https://images.pexels.com/photos/4716814/pexels-photo-4716814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  //   description:
  //     'Stay active in our state-of-the-art fitness center, fully equipped with modern cardio machines, free weights, and personal training sessions.',
  // },
  // {
  //   name: 'Spa & Wellness',
  //   icon: 'Flower2',
  //   image: 'https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  //   description:
  //     'Unwind and rejuvenate at our luxury spa offering a range of treatments, massages, and therapies designed to restore body and mind.',
  // },
  // {
  //   name: 'Gaming Zone',
  //   icon: 'Gamepad2',
  //   image: 'https://images.pexels.com/photos/31512997/pexels-photo-31512997.png?auto=compress&cs=tinysrgb&h=650&w=940',
  //   description:
  //     'Enjoy our entertainment zone featuring billiards, arcade games, and interactive experiences for guests of all ages to enjoy.',
  // },
  {
    name: 'Transport',
    icon: 'Plane',
    images: [
      'images/transport.jpeg',
    ],
    description:
      'Complimentary airport shuttle and luxury transport services to ensure you arrive in style and comfort wherever you need to go.',
  },
  // {
  //   name: 'Swimming Pool',
  //   icon: 'Waves',
  //   image: 'https://images.pexels.com/photos/38127493/pexels-photo-38127493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  //   description:
  //     'Dive into our stunning infinity pool surrounded by lush tropical gardens, with poolside service and comfortable loungers available daily.',
  // },
  // {
  //   name: 'Locker Room',
  //   icon: 'KeyRound',
  //   image: 'https://images.pexels.com/photos/8007583/pexels-photo-8007583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  //   description:
  //     'Secure locker facilities with changing rooms and showers for gym, pool, and spa guests, complete with fresh towels and amenities.',
  // },
];

export const offers = [
  {
    title: 'Double Room',
    discount: 50,
    image: 'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Enjoy a half-price stay in our spacious double room this summer season.',
  },
  {
    title: 'Family Room',
    discount: 30,
    image: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Save 30% on family suites — perfect for your summer getaway with the whole family.',
  },
  {
    title: 'Deluxe Room',
    discount: 20,
    image: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Limited-time 20% discount on our premium deluxe rooms with terrace views.',
  },
];

export const testimonials = [
  {
    name: 'Sebastian Ethan',
    role: 'Guest',
    image: 'https://images.pexels.com/photos/33605541/pexels-photo-33605541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 5,
    text: 'An absolutely incredible stay at Samrat. The staff went above and beyond to make our anniversary special. The room was immaculate and the views were breathtaking. We will definitely be returning!',
  },
  {
    name: 'Jordan Benom',
    role: 'Guest',
    image: 'https://images.pexels.com/photos/9301461/pexels-photo-9301461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 5,
    text: 'From the moment we arrived, the service was impeccable. The spa treatments were heavenly and the restaurant served some of the best food I have had in years. Five stars in every sense of the word.',
  },
  {
    name: 'Sophia Martinez',
    role: 'Guest',
    image: 'https://images.pexels.com/photos/8171192/pexels-photo-8171192.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 5,
    text: 'Samrat exceeded all our expectations. The pool area is stunning, the rooms are luxurious, and the attention to detail is remarkable. The best hotel experience we have ever had as a family.',
  },
];

export const stats = [
  { value: 1986, suffix: '', label: 'Booking of Month' },
  { value: 2547, suffix: '', label: 'Visitors Visit Daily' },
  { value: 100, suffix: '%', label: 'Satisfied Guest' },
];

export const galleryImages = [
  { src: 'images/banner1.png', alt: 'Hotel', span: 'row-span-2' },
  { src: 'images/restaurant1.jpeg', alt: 'Restaurant interior', span: '' },
  { src: 'images/reception.jpeg', alt: 'Hotel reception', span: 'col-span-2' },
  { src: 'images/IMG_5267.jpg', alt: 'Banquet lobby', span: 'col-span-2' },
  { src: 'images/IMG_5283.jpg', alt: 'Banquet', span: '' },
  { src: 'images/IMG_5385.jpg', alt: 'Hotel lobby', span: '' },
  { src: 'images/transport.jpeg', alt: 'Transport', span: '' },
  { src: 'images/IMG_5396.jpg', alt: 'Fine dining', span: 'col-span-2' },
  { src: 'images/IMG_5337.jpg', alt: 'Luxury room', span: '' },
];

export const blogPosts = [
  {
    slug: 'luxury-hotel-experience',
    title: 'The Ultimate Luxury Hotel Experience: What to Expect',
    image: 'https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt:
      'Discover what makes a truly luxurious hotel stay unforgettable, from personalized service to exquisite amenities and breathtaking design.',
    date: 'Aug 01, 2026',
    author: 'Admin',
    category: 'Hotel Guide',
  },
  {
    slug: 'fine-dining-at-samrat',
    title: 'Fine Dining at Samrat: A Culinary Journey Like No Other',
    image: 'https://images.pexels.com/photos/37686900/pexels-photo-37686900.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt:
      'Explore the gastronomic delights prepared by our award-winning chefs, where every dish tells a story of passion and craftsmanship.',
    date: 'Jul 28, 2026',
    author: 'Admin',
    category: 'Restaurant',
  },
  {
    slug: 'wellness-and-spa-retreat',
    title: 'Wellness and Spa: Rejuvenate Your Body and Mind',
    image: 'https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt:
      'Learn about our signature spa treatments and wellness programs designed to help you disconnect, recharge, and find inner balance.',
    date: 'Jul 20, 2026',
    author: 'Admin',
    category: 'Wellness',
  },
];

export const roomGalleryCategories = ['All', 'Washroom', 'Balcony', 'Bed', 'Hall', 'Reception'] as const;

export const roomGalleryImages = [
  { src: 'https://images.pexels.com/photos/8082195/pexels-photo-8082195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Marble washroom with modern fixtures', category: 'Washroom' },
  { src: 'https://images.pexels.com/photos/7166637/pexels-photo-7166637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Elegant marble bathroom', category: 'Washroom' },
  { src: 'https://images.pexels.com/photos/6636254/pexels-photo-6636254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Modern bathroom with green plant', category: 'Washroom' },
  { src: 'https://images.pexels.com/photos/6585742/pexels-photo-6585742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Bathroom with bidet and sink', category: 'Washroom' },
  { src: 'https://images.pexels.com/photos/10611843/pexels-photo-10611843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Luxurious terrace with ocean view', category: 'Balcony' },
  { src: 'https://images.pexels.com/photos/2854553/pexels-photo-2854553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Resort patio with pool and sunset', category: 'Balcony' },
  { src: 'https://images.pexels.com/photos/34811443/pexels-photo-34811443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Stylish resort terrace in Bali', category: 'Balcony' },
  { src: 'https://images.pexels.com/photos/31665649/pexels-photo-31665649.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Hotel terrace with mountain views', category: 'Balcony' },
  { src: 'https://images.pexels.com/photos/3755585/pexels-photo-3755585.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Cozy white pillows and bedding', category: 'Bed' },
  { src: 'https://images.pexels.com/photos/2736384/pexels-photo-2736384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Comfortable bedroom with white linens', category: 'Bed' },
  { src: 'https://images.pexels.com/photos/3940733/pexels-photo-3940733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Relaxing hotel room bed', category: 'Bed' },
  { src: 'https://images.pexels.com/photos/3755590/pexels-photo-3755590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Elegant white bed linen with pillows', category: 'Bed' },
  { src: 'https://images.pexels.com/photos/5379181/pexels-photo-5379181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Luxurious hotel lounge area', category: 'Hall' },
  { src: 'https://images.pexels.com/photos/14012687/pexels-photo-14012687.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Chic interior with armchairs and ocean view', category: 'Hall' },
  { src: 'https://images.pexels.com/photos/6467627/pexels-photo-6467627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Luxurious lounge with plush sofa', category: 'Hall' },
  { src: 'https://images.pexels.com/photos/6957097/pexels-photo-6957097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Contemporary living area with leather sofas', category: 'Hall' },
  { src: 'https://images.pexels.com/photos/14036251/pexels-photo-14036251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Luxurious hotel reception area', category: 'Reception' },
  { src: 'https://images.pexels.com/photos/7820689/pexels-photo-7820689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Hotel reception bell', category: 'Reception' },
  { src: 'https://images.pexels.com/photos/7820325/pexels-photo-7820325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Hotel check-in reception desk', category: 'Reception' },
  { src: 'https://images.pexels.com/photos/7820358/pexels-photo-7820358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Reception desk interaction', category: 'Reception' },
];

export const menuCategories = ['All', 'Beverages', 'Indian', 'Chinese', 'Breakfast', 'Snacks', 'Dessert'] as const;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  veg: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 'bev-1',
    name: 'Fresh Green Smoothie',
    description: 'Refreshing blend of spinach, apple, and mint.',
    price: 6.5,
    image: 'https://images.pexels.com/photos/17612826/pexels-photo-17612826.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Beverages',
    veg: true,
  },
  {
    id: 'bev-2',
    name: 'Signature Cocktail',
    description: 'House-special cocktail with berries and ice.',
    price: 12.0,
    image: 'https://images.pexels.com/photos/36630828/pexels-photo-36630828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Beverages',
    veg: true,
  },
  {
    id: 'bev-3',
    name: 'Fresh Fruit Juices',
    description: 'Assorted seasonal fruit juices.',
    price: 7.5,
    image: 'https://images.pexels.com/photos/8215113/pexels-photo-8215113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Beverages',
    veg: true,
  },
  {
    id: 'bev-4',
    name: 'Iced Juice Trio',
    description: 'Three chilled juices with fresh straws.',
    price: 8.0,
    image: 'https://images.pexels.com/photos/5836845/pexels-photo-5836845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Beverages',
    veg: true,
  },
  {
    id: 'ind-1',
    name: 'Classic Indian Thali',
    description: 'Naan, paneer curry, and aromatic rice on a wooden platter.',
    price: 18.0,
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Indian',
    veg: true,
  },
  {
    id: 'ind-2',
    name: 'Royal Indian Platter',
    description: 'An overhead spread of curries, naan, and sides.',
    price: 22.0,
    image: 'https://images.pexels.com/photos/17050759/pexels-photo-17050759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Indian',
    veg: false,
  },
  {
    id: 'ind-3',
    name: 'Traditional Thali',
    description: 'Dal, butter chicken, naan, and aromatic rice.',
    price: 16.5,
    image: 'https://images.pexels.com/photos/33430559/pexels-photo-33430559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Indian',
    veg: false,
  },
  {
    id: 'ind-4',
    name: 'Biryani Feast',
    description: 'Traditional biryani with curry and side dishes.',
    price: 19.0,
    image: 'https://images.pexels.com/photos/35267280/pexels-photo-35267280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Indian',
    veg: false,
  },
  {
    id: 'chn-1',
    name: 'Asian Noodles & Rice',
    description: 'Spicy noodles, fried rice, and stir-fried chicken.',
    price: 14.0,
    image: 'https://images.pexels.com/photos/36388450/pexels-photo-36388450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Chinese',
    veg: false,
  },
  {
    id: 'chn-2',
    name: 'Dumpling Soup',
    description: 'Flavorful dumpling soup, freshly prepared.',
    price: 11.5,
    image: 'https://images.pexels.com/photos/35157092/pexels-photo-35157092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Chinese',
    veg: false,
  },
  {
    id: 'chn-3',
    name: 'Asian Fusion Platter',
    description: 'A variety of Asian dishes beautifully arranged.',
    price: 20.0,
    image: 'https://images.pexels.com/photos/18133951/pexels-photo-18133951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Chinese',
    veg: false,
  },
  {
    id: 'chn-4',
    name: 'Steamed Dumplings',
    description: 'Asian dumplings shared with chopsticks.',
    price: 13.0,
    image: 'https://images.pexels.com/photos/6646233/pexels-photo-6646233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Chinese',
    veg: true,
  },
  {
    id: 'brk-1',
    name: 'Classic Breakfast Plate',
    description: 'Pancakes, bacon, toast, and syrup.',
    price: 12.0,
    image: 'https://images.pexels.com/photos/22873812/pexels-photo-22873812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Breakfast',
    veg: false,
  },
  {
    id: 'brk-2',
    name: 'Hearty Breakfast Platter',
    description: 'Eggs, pancakes, sausages, and fresh fruit.',
    price: 14.5,
    image: 'https://images.pexels.com/photos/15043914/pexels-photo-15043914.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Breakfast',
    veg: false,
  },
  {
    id: 'brk-3',
    name: 'Pancake Stack',
    description: 'Pancakes with poached egg, bacon, and butter.',
    price: 10.0,
    image: 'https://images.pexels.com/photos/7144969/pexels-photo-7144969.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Breakfast',
    veg: false,
  },
  {
    id: 'brk-4',
    name: 'Croissant & Bacon',
    description: 'A delectable breakfast with croissant and hearty bacon.',
    price: 9.5,
    image: 'https://images.pexels.com/photos/22882258/pexels-photo-22882258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Breakfast',
    veg: false,
  },
  {
    id: 'snk-1',
    name: 'Crispy Samosa',
    description: 'Golden fried samosas with spiced filling.',
    price: 5.0,
    image: 'https://images.pexels.com/photos/29037272/pexels-photo-29037272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Snacks',
    veg: true,
  },
  {
    id: 'snk-2',
    name: 'Cheese Sticks',
    description: 'Crispy cheese sticks with spicy dipping sauce.',
    price: 6.5,
    image: 'https://images.pexels.com/photos/12758949/pexels-photo-12758949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Snacks',
    veg: true,
  },
  {
    id: 'snk-3',
    name: 'Spring Rolls',
    description: 'Golden crispy spring rolls, ready to serve.',
    price: 7.0,
    image: 'https://images.pexels.com/photos/35407775/pexels-photo-35407775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Snacks',
    veg: true,
  },
  {
    id: 'snk-4',
    name: 'Samosa Platter',
    description: 'Four samosas with onion rings and green chili.',
    price: 8.0,
    image: 'https://images.pexels.com/photos/36170557/pexels-photo-36170557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Snacks',
    veg: true,
  },
  {
    id: 'des-1',
    name: 'Chocolate Lava Cake',
    description: 'Rich chocolate lava cake with smooth ice cream and cherries.',
    price: 9.0,
    image: 'https://images.pexels.com/photos/33674415/pexels-photo-33674415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Dessert',
    veg: true,
  },
  {
    id: 'des-2',
    name: 'Brownie & Ice Cream',
    description: 'Rich brownie served with scoops of creamy vanilla ice cream.',
    price: 8.5,
    image: 'https://images.pexels.com/photos/4662035/pexels-photo-4662035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Dessert',
    veg: true,
  },
  {
    id: 'des-3',
    name: 'Sprinkle Sundae',
    description: 'Ice cream with sprinkles, chocolate, cherry, and mint.',
    price: 7.5,
    image: 'https://images.pexels.com/photos/4869435/pexels-photo-4869435.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Dessert',
    veg: true,
  },
  {
    id: 'des-4',
    name: 'Lemon Mousse',
    description: 'Lemon mousse with fresh raspberries, mint, and chocolate curls.',
    price: 8.0,
    image: 'https://images.pexels.com/photos/1893566/pexels-photo-1893566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Dessert',
    veg: true,
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Facilities', href: '/facilities' },
  //{ label: 'Gallery', href: '/gallery' },
  // { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
