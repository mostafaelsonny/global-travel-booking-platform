import { db } from '../core/firebase/config'; // تأكد إن المسار لملف الـ config صح
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const toursData = [
  {
    id: 't1', title: 'Enchanted Paris Romance', location: 'Paris, France', country: 'France', city: 'Paris', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1499856871958-5b9627545d1a`,
    gallery: [
      `https://images.unsplash.com/photo-1502602898657-3e91760cbb34`,
      `https://images.unsplash.com/photo-1431274172761-fca41d930114`,
      `https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94`,
    ],
    description: 'Discover the magic of Paris with private guided tours of the Eiffel Tower, Louvre Museum, and charming Montmartre streets. Indulge in authentic French cuisine and wine tastings.',
    price: 2499, afterDiscount: 1899, category: 'Cultural', duration: '7 Days / 6 Nights',
    rating: 4.9, reviews: 342, seatsLeft: 12, totalSeats: 30, featured: true,
    includes: ['5-star Hotel', 'Private Guide', 'Airport Transfer', 'Breakfast Daily', 'Museum Passes', 'Seine River Cruise'],
    itinerary: ['Day 1: Arrive & check-in at Le Marais boutique hotel', 'Day 2: Eiffel Tower & Champs-Élysées', 'Day 3: Louvre Museum & Tuileries Garden', 'Day 4: Versailles Palace day trip', 'Day 5: Montmartre & Sacré-Cœur', 'Day 6: Wine tasting in Saint-Germain', 'Day 7: Departure'],
  },
  {
    id: 't2', title: 'Tokyo Neon Dreams', location: 'Tokyo, Japan', country: 'Japan', city: 'Tokyo', continent: 'Asia',
    image: `https://images.unsplash.com/photo-1503899036084-c55cdd92da26`,
    gallery: [
      `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf`,
      `https://images.unsplash.com/photo-1536098561742-ca998e48cbcc`,
      `https://images.unsplash.com/photo-1549693578-d683be217e58`,
    ],
    description: 'Immerse yourself in the electric energy of Tokyo. From the serene Meiji Shrine to the bustling streets of Shibuya, experience the perfect fusion of tradition and futurism.',
    price: 3299, afterDiscount: 2799, category: 'Adventure', duration: '8 Days / 7 Nights',
    rating: 4.8, reviews: 287, seatsLeft: 8, totalSeats: 25, featured: true,
    includes: ['4-star Hotel', 'JR Rail Pass', 'Airport Transfer', 'Breakfast Daily', 'Sushi-making Class', 'Robot Restaurant Show'],
    itinerary: ['Day 1: Arrive at Narita, transfer to Shinjuku', 'Day 2: Meiji Shrine & Harajuku', 'Day 3: Tsukiji Market & TeamLab', 'Day 4: Day trip to Mount Fuji', 'Day 5: Akihabara & Anime tour', 'Day 6: Asakusa & Senso-ji Temple', 'Day 7: Shibuya & Roppongi nightlife', 'Day 8: Departure'],
  },
  {
    id: 't3', title: 'Maldives Luxury Escape', location: 'Maldives', country: 'Maldives', city: 'Malé Atoll', continent: 'Asia',
    image: `https://images.unsplash.com/photo-1514282401047-d79a71a590e8`,
    gallery: [
      `https://images.unsplash.com/photo-1573843981267-be1999ff37cd`,
      `https://images.unsplash.com/photo-1540202404-a2f29016b523`,
      `https://images.unsplash.com/photo-1544550581-5f7ceaf7f992`,
    ],
    description: 'Ultimate luxury in an overwater villa. Snorkel with manta rays, enjoy private beach dinners under the stars, and indulge in world-class spa treatments.',
    price: 5999, afterDiscount: 4799, category: 'Beach', duration: '6 Days / 5 Nights',
    rating: 5.0, reviews: 198, seatsLeft: 4, totalSeats: 15, featured: true,
    includes: ['Overwater Villa', 'All-Inclusive Meals', 'Seaplane Transfer', 'Private Snorkeling', 'Sunset Cruise', 'Spa Treatment'],
    itinerary: ['Day 1: Seaplane to resort, villa check-in', 'Day 2: Snorkeling & reef exploration', 'Day 3: Private island picnic', 'Day 4: Spa day & sunset dolphin cruise', 'Day 5: Underwater restaurant dining', 'Day 6: Departure'],
  },
  {
    id: 't4', title: 'Santorini Sunset Experience', location: 'Santorini, Greece', country: 'Greece', city: 'Santorini', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff`,
    gallery: [
      `https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e`,
      `https://images.unsplash.com/photo-1560703650-ef3e0f254ae0`,
      `https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c`,
    ],
    description: 'Witness the world-famous Santorini sunset from a cliffside villa in Oia. Explore volcanic beaches, taste local wines, and cruise the caldera.',
    price: 3199, afterDiscount: 2599, category: 'Cultural', duration: '5 Days / 4 Nights',
    rating: 4.9, reviews: 256, seatsLeft: 10, totalSeats: 20, featured: true,
    includes: ['Cave Hotel', 'Caldera Cruise', 'Wine Tasting', 'Airport Transfer', 'Breakfast Daily', 'Cooking Class'],
    itinerary: ['Day 1: Arrive Thira, transfer to Oia', 'Day 2: Caldera cruise & hot springs', 'Day 3: Red Beach & Akrotiri ruins', 'Day 4: Wine tour & sunset dinner', 'Day 5: Departure'],
  },
  {
    id: 't5', title: 'Dubai Gold & Glamour', location: 'Dubai, UAE', country: 'UAE', city: 'Dubai', continent: 'Asia',
    image: `https://images.unsplash.com/photo-1512453979798-5ea266f8880c`,
    gallery: [
      `https://images.unsplash.com/photo-1518684079-3c830dcef090`,
      `https://images.unsplash.com/photo-1580674684081-7617fbf3d745`,
      `https://images.unsplash.com/photo-1597659840241-37e2b4c2f990`,
    ],
    description: 'Experience unrivaled luxury in the city of superlatives. Visit the Burj Khalifa, desert safari, gold souks, and world-class shopping malls.',
    price: 3899, afterDiscount: 3199, category: 'Luxury', duration: '6 Days / 5 Nights',
    rating: 4.7, reviews: 312, seatsLeft: 15, totalSeats: 35, featured: true,
    includes: ['5-star Hotel', 'Desert Safari', 'Burj Khalifa Tickets', 'Airport Transfer', 'Half-Board Meals', 'Yacht Cruise'],
    itinerary: ['Day 1: Arrive & Burj Khalifa at sunset', 'Day 2: Desert safari & BBQ dinner', 'Day 3: Dubai Mall & Gold Souk', 'Day 4: Yacht cruise & Marina walk', 'Day 5: Palm Jumeirah & Atlantis', 'Day 6: Departure'],
  },
  {
    id: 't6', title: 'Bali Sacred Journey', location: 'Bali, Indonesia', country: 'Indonesia', city: 'Ubud', continent: 'Asia',
    image: `https://images.unsplash.com/photo-1537996194471-e657df975ab4`,
    gallery: [
      `https://images.unsplash.com/photo-1555400038-63f5ba517a47`,
      `https://images.unsplash.com/photo-1573790387438-4da905039392`,
      `https://images.unsplash.com/photo-1544644181-1484b3fdfc62`,
    ],
    description: 'Find your zen in Ubud rice terraces, explore ancient temples, surf world-class waves, and rejuvenate with traditional Balinese spa treatments.',
    price: 1899, afterDiscount: 1499, category: 'Wellness', duration: '8 Days / 7 Nights',
    rating: 4.8, reviews: 445, seatsLeft: 18, totalSeats: 40, featured: true,
    includes: ['Boutique Villa', 'Yoga Sessions', 'Temple Tours', 'Surf Lessons', 'Spa Package', 'Cooking Class'],
    itinerary: ['Day 1: Arrive Denpasar, transfer to Ubud', 'Day 2: Tegallalang Rice Terraces', 'Day 3: Temple tour & water purification', 'Day 4: Surf lessons in Canggu', 'Day 5: Mount Batur sunrise trek', 'Day 6: Spa day & Ubud art galleries', 'Day 7: Uluwatu Temple & Kecak dance', 'Day 8: Departure'],
  },
  {
    id: 't7', title: 'New York City Lights', location: 'New York, USA', country: 'USA', city: 'New York', continent: 'North America',
    image: `https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9`,
    gallery: [
      `https://images.unsplash.com/photo-1534430480872-3498386e7856`,
      `https://images.unsplash.com/photo-1522083165195-3424ed129620`,
      `https://images.unsplash.com/photo-1485871981521-5b1fd3805eee`,
    ],
    description: 'Broadway shows, Central Park, the Statue of Liberty, and the best pizza in the world. NYC is calling!',
    price: 2799, afterDiscount: 2299, category: 'Cultural', duration: '5 Days / 4 Nights',
    rating: 4.7, reviews: 523, seatsLeft: 20, totalSeats: 50, featured: false,
    includes: ['Manhattan Hotel', 'Broadway Tickets', 'Statue of Liberty Tour', 'Airport Transfer', 'City Pass', 'Food Tour'],
    itinerary: ['Day 1: Arrive & Times Square walk', 'Day 2: Statue of Liberty & Ellis Island', 'Day 3: Central Park & MET Museum', 'Day 4: Broadway show & SoHo shopping', 'Day 5: Departure'],
  },
  {
    id: 't8', title: 'Kenyan Safari Adventure', location: 'Nairobi, Kenya', country: 'Kenya', city: 'Nairobi', continent: 'Africa',
    image: `https://images.unsplash.com/photo-1516426122078-c23e76319801`,
    gallery: [
      `https://images.unsplash.com/photo-1535083783855-76ae62b2914e`,
      `https://images.unsplash.com/photo-1547471080-7cc2caa01a7e`,
      `https://images.unsplash.com/photo-1518709594023-6eab9bab7b23`,
    ],
    description: 'Witness the Great Migration, stay in luxury safari lodges, and come face-to-face with the Big Five in the Masai Mara.',
    price: 4299, afterDiscount: 3599, category: 'Adventure', duration: '7 Days / 6 Nights',
    rating: 4.9, reviews: 189, seatsLeft: 6, totalSeats: 16, featured: false,
    includes: ['Safari Lodge', 'Game Drives', 'Bush Breakfast', 'Airport Transfer', 'Full-Board Meals', 'Masai Village Visit'],
    itinerary: ['Day 1: Arrive Nairobi, Giraffe Centre', 'Day 2: Fly to Masai Mara', 'Day 3-4: Game drives & Big Five spotting', 'Day 5: Hot air balloon safari', 'Day 6: Masai village & Lake Nakuru', 'Day 7: Return to Nairobi & departure'],
  },
  {
    id: 't9', title: 'Machu Picchu Trek', location: 'Cusco, Peru', country: 'Peru', city: 'Cusco', continent: 'South America',
    image: `https://images.unsplash.com/photo-1587595431973-160d0d163571`,
    gallery: [
      `https://images.unsplash.com/photo-1526392060635-9d6019884377`,
      `https://images.unsplash.com/photo-1580619305218-8423a7ef79b4`,
      `https://images.unsplash.com/photo-1594398901394-4e34551d698c`,
    ],
    description: 'Trek the legendary Inca Trail to Machu Picchu. Acclimatize in charming Cusco and explore the Sacred Valley.',
    price: 2899, afterDiscount: 2399, category: 'Adventure', duration: '9 Days / 8 Nights',
    rating: 4.8, reviews: 267, seatsLeft: 10, totalSeats: 20, featured: false,
    includes: ['Hotels & Camping', 'Guided Trek', 'Train Tickets', 'Machu Picchu Entry', 'All Meals on Trek', 'Porter Service'],
    itinerary: ['Day 1: Arrive Cusco, acclimatize', 'Day 2: Sacred Valley tour', 'Day 3: Ollantaytambo ruins', 'Day 4-7: Inca Trail trek', 'Day 8: Machu Picchu sunrise tour', 'Day 9: Return to Cusco & departure'],
  },
  {
    id: 't10', title: 'Iceland Northern Lights', location: 'Reykjavik, Iceland', country: 'Iceland', city: 'Reykjavik', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1504829857797-ddff29c27927`,
    gallery: [
      `https://images.unsplash.com/photo-1520769669658-f07657f5a307`,
      `https://images.unsplash.com/photo-1476610182048-b716b8518aae`,
      `https://images.unsplash.com/photo-1531168556467-80aace0d0144`,
    ],
    description: 'Chase the Aurora Borealis, soak in the Blue Lagoon, explore glaciers and waterfalls in this otherworldly landscape.',
    price: 3599, afterDiscount: 2999, category: 'Adventure', duration: '6 Days / 5 Nights',
    rating: 4.9, reviews: 178, seatsLeft: 8, totalSeats: 18, featured: false,
    includes: ['4-star Hotel', 'Golden Circle Tour', 'Blue Lagoon Entry', 'Northern Lights Tour', 'Glacier Hike', 'Airport Transfer'],
    itinerary: ['Day 1: Arrive Reykjavik, city walk', 'Day 2: Golden Circle tour', 'Day 3: South Coast waterfalls & black beach', 'Day 4: Glacier hike & ice cave', 'Day 5: Blue Lagoon & northern lights hunt', 'Day 6: Departure'],
  },
  {
    id: 't11', title: 'Barcelona Mediterranean Vibes', location: 'Barcelona, Spain', country: 'Spain', city: 'Barcelona', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1583422409516-2895a77efded`,
    gallery: [
      `https://images.unsplash.com/photo-1562883676-8c7feb83f09b`,
      `https://images.unsplash.com/photo-1564221710304-0b37c8b4a5c6`,
      `https://images.unsplash.com/photo-1523531294919-4bcd7c65e216`,
    ],
    description: 'Gaudi masterpieces, La Boqueria market, Gothic Quarter wandering, and beach sunsets on the Mediterranean.',
    price: 2199, afterDiscount: 1799, category: 'Cultural', duration: '5 Days / 4 Nights',
    rating: 4.7, reviews: 398, seatsLeft: 22, totalSeats: 40, featured: false,
    includes: ['Boutique Hotel', 'Sagrada Familia Tickets', 'Tapas Tour', 'Airport Transfer', 'Breakfast Daily', 'Flamenco Show'],
    itinerary: ['Day 1: Arrive & Gothic Quarter walk', 'Day 2: Sagrada Familia & Park Güell', 'Day 3: La Boqueria & Barcelona beach', 'Day 4: Day trip to Montserrat', 'Day 5: Departure'],
  },
  {
    id: 't12', title: 'Swiss Alpine Majesty', location: 'Swiss Alps, Switzerland', country: 'Switzerland', city: 'Interlaken', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1531366936337-7c912a4589a7`,
    gallery: [
      `https://images.unsplash.com/photo-1527668752968-14dc70a27c95`,
      `https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99`,
      `https://images.unsplash.com/photo-1491555103944-7c647fd857e6`,
    ],
    description: 'Breathtaking mountain railways, pristine lakes, and luxury chalets amid snow-capped peaks.',
    price: 4199, afterDiscount: 3499, category: 'Adventure', duration: '7 Days / 6 Nights',
    rating: 4.9, reviews: 156, seatsLeft: 10, totalSeats: 20, featured: false,
    includes: ['Mountain Chalet', 'Swiss Travel Pass', 'Jungfraujoch Ticket', 'Fondue Dinner', 'Paragliding', 'Boat Cruise'],
    itinerary: ['Day 1: Arrive Zurich, train to Interlaken', 'Day 2: Jungfraujoch - Top of Europe', 'Day 3: Lake Thun cruise & Grindelwald', 'Day 4: Paragliding & adventure sports', 'Day 5: Lauterbrunnen Valley & waterfalls', 'Day 6: Lucerne day trip', 'Day 7: Departure via Zurich'],
  },
  {
    id: 't13', title: 'Cape Town Wonders', location: 'Cape Town, South Africa', country: 'South Africa', city: 'Cape Town', continent: 'Africa',
    image: `https://images.unsplash.com/photo-1580060839134-75a5edca2e99`,
    gallery: [
      `https://images.unsplash.com/photo-1516026672322-bc52d61a55d5`,
      `https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e`,
      `https://images.unsplash.com/photo-1591210659640-e498b05e0a77`,
    ],
    description: 'Table Mountain hikes, Cape Peninsula drives, shark cage diving, and exquisite wine country tours.',
    price: 2699, afterDiscount: 2199, category: 'Adventure', duration: '7 Days / 6 Nights',
    rating: 4.8, reviews: 234, seatsLeft: 14, totalSeats: 28, featured: false,
    includes: ['Boutique Hotel', 'Table Mountain Cable Car', 'Wine Tasting Tour', 'Cape Peninsula Tour', 'Airport Transfer', 'Breakfast Daily'],
    itinerary: ['Day 1: Arrive & V&A Waterfront', 'Day 2: Table Mountain & Kirstenbosch', 'Day 3: Cape Peninsula & Cape of Good Hope', 'Day 4: Stellenbosch wine country', 'Day 5: Robben Island & Bo-Kaap', 'Day 6: Shark cage diving or beach day', 'Day 7: Departure'],
  },
  {
    id: 't14', title: 'Istanbul East-West Fusion', location: 'Istanbul, Turkey', country: 'Turkey', city: 'Istanbul', continent: 'Europe',
    image: `https://images.unsplash.com/photo-1524231757912-21f4fe3a7200`,
    gallery: [
      `https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b`,
      `https://images.unsplash.com/photo-1558383331-f520f2888351`,
      `https://images.unsplash.com/photo-1527866959252-deab85ef7d1b`,
    ],
    description: 'Hagia Sophia, Grand Bazaar haggling, Bosphorus cruises, and the most incredible kebabs you\'ll ever taste.',
    price: 1799, afterDiscount: 1399, category: 'Cultural', duration: '5 Days / 4 Nights',
    rating: 4.7, reviews: 367, seatsLeft: 25, totalSeats: 45, featured: false,
    includes: ['4-star Hotel Sultanahmet', 'Bosphorus Cruise', 'Grand Bazaar Tour', 'Airport Transfer', 'Breakfast Daily', 'Turkish Bath'],
    itinerary: ['Day 1: Arrive & Sultanahmet exploration', 'Day 2: Hagia Sophia & Blue Mosque', 'Day 3: Grand Bazaar & Spice Market', 'Day 4: Bosphorus cruise & Asian side', 'Day 5: Departure'],
  },
  {
    id: 't15', title: 'Rio Carnival Spirit', location: 'Rio de Janeiro, Brazil', country: 'Brazil', city: 'Rio de Janeiro', continent: 'South America',
    image: `https://images.unsplash.com/photo-1483729558449-99ef09a8c325`,
    gallery: [
      `https://images.unsplash.com/photo-1544989164-31dc3291c737`,
      `https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f`,
      `https://images.unsplash.com/photo-1564659907532-6b5f98c8e68f`,
    ],
    description: 'Samba rhythms, Copacabana sunsets, Christ the Redeemer at dawn, and rainforest adventures.',
    price: 2599, afterDiscount: 2099, category: 'Cultural', duration: '6 Days / 5 Nights',
    rating: 4.6, reviews: 289, seatsLeft: 16, totalSeats: 35, featured: false,
    includes: ['Beachfront Hotel', 'Christ the Redeemer Tour', 'Sugarloaf Cable Car', 'Samba Show', 'Airport Transfer', 'Favela Tour'],
    itinerary: ['Day 1: Arrive & Copacabana sunset', 'Day 2: Christ the Redeemer & Tijuca Forest', 'Day 3: Sugarloaf Mountain & Urca', 'Day 4: Ipanema & cultural walking tour', 'Day 5: Samba show & nightlife', 'Day 6: Departure'],
  },
  {
    id: 't16', title: 'Singapore Future City', location: 'Singapore', country: 'Singapore', city: 'Singapore', continent: 'Asia',
    image: `https://images.unsplash.com/photo-1525625293386-3f8f99389edd`,
    gallery: [
      `https://images.unsplash.com/photo-1508964942454-1461b402a69c`,
      `https://images.unsplash.com/photo-1496939376851-89342e90adcd`,
      `https://images.unsplash.com/photo-1565967511849-76a60a516170`,
    ],
    description: 'Gardens by the Bay, hawker food adventures, Marina Bay Sands, and the world\'s best airport.',
    price: 2899, afterDiscount: 2399, category: 'Luxury', duration: '5 Days / 4 Nights',
    rating: 4.8, reviews: 345, seatsLeft: 18, totalSeats: 30, featured: false,
    includes: ['Marina Bay Hotel', 'Gardens by the Bay', 'Night Safari', 'Airport Transfer', 'Hawker Food Tour', 'Sentosa Island Pass'],
    itinerary: ['Day 1: Arrive & Marina Bay Sands', 'Day 2: Gardens by the Bay & Cloud Forest', 'Day 3: Sentosa Island adventures', 'Day 4: Hawker food tour & Little India', 'Day 5: Departure'],
  },
];

export const seedTours = async () => {
  console.log("⏳ جاري تنظيف ورفع الداتا الجديدة...");
  try {
    for (const tour of toursData) {
      // بنستخدم setDoc عشان نحدد الـ ID بنفسنا (t1, t2...) 
      // وده اللي بيضمن إن الحجز يشتغل على الـ IDs اللي في الـ UI
      await setDoc(doc(db, 'tours', tour.id), {
        ...tour,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ تم رفع: ${tour.title}`);
    }
    console.log("🚀 مبروك يا هندسة! الـ 16 رحلة بقوا جاهزين في الـ Database.");
  } catch (error) {
    console.error("❌ حصل خطأ أثناء الرفع:", error);
  }
};