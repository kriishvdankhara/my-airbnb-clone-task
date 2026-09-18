// All content for the listing, extracted from the reference.
// Image files live in /public/images and are referenced by absolute path.
import type { Listing, PhotoCategory, TourPhoto } from "@/types/listing";

const img = (name: string) => `/images/${name}`;

export const listing: Listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  specs: "3 guests · 1 bedroom · 1 bed · 1 bathroom",
  rating: 4.95,
  reviewCount: 19,
  location: "Candolim, Goa, India",

  // 5-image hero grid (big left, then 2x2)
  hero: [
    "2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg",
    "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg",
    "9be71047-fc52-438a-9270-75cb470f6752.jpeg",
    "67c61c6f-6260-4809-9510-0360e58a345d.jpeg",
    "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg",
  ].map(img),

  host: {
    name: "Mirashya Homes",
    tenure: "2 years hosting",
    avatar: img("host.jpeg"),
    superhost: true,
    reviews: "1,463",
    ratingValue: "4.68",
    yearsHosting: "2",
    born: "Born in the 80s",
    school: "Where I went to school: NICMAR GOA",
    responseRate: "100%",
    responseTime: "Responds within an hour",
  },

  highlights: [
    {
      icon: "outdoor",
      title: "Outdoor entertainment",
      text: "The pool and alfresco dining are great for summer trips.",
    },
    {
      icon: "cool",
      title: "Designed for staying cool",
      text: "Beat the heat with the A/C and ceiling fan.",
    },
    {
      icon: "key",
      title: "Self check-in",
      text: "You can check in with the building staff.",
    },
  ],

  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴",

  sleep: [
    { name: "Bedroom", detail: "1 double bed", img: img("67c61c6f-6260-4809-9510-0360e58a345d.jpeg") },
    { name: "Living room", detail: "1 sofa", img: img("a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg") },
  ],

  // "What this place offers" — first 10 shown, unavailable ones struck through
  amenities: [
    { icon: "kitchen", label: "Kitchen" },
    { icon: "wifi", label: "Wifi" },
    { icon: "workspace", label: "Dedicated workspace" },
    { icon: "parking", label: "Free parking on premises" },
    { icon: "pool", label: "Pool" },
    { icon: "hottub", label: "Hot tub" },
    { icon: "pets", label: "Pets allowed" },
    { icon: "camera", label: "Exterior security cameras on property" },
    { icon: "co", label: "Carbon monoxide alarm", unavailable: true },
    { icon: "smoke", label: "Smoke alarm", unavailable: true },
  ],

  amenitiesFull: [
    {
      group: "Bathroom",
      items: [{ label: "Hairdryer" }, { label: "Cleaning products" }, { label: "Shampoo" },  { label: "Hot water" }, { label: "Shower gel" }],
    },
    {
      group: "Bedroom and laundry",
      items: [
         { label: "Washing machine" },
         { label: "Hangers" },
        { label: "Bed linen" },
        { label: "Room-darkening blinds" },
        { label: "Iron" },
        { label: "Clothes storage" },
        { label: "Cot" },
      ],
    },
    {
      group: "Entertainment",
      items: [{ label: "TV" }],
    },
    {
      group: "Family",
      items: [{ label: "Cot" }],
    },
    {
      group: "Heating and cooling",
      items: [{ label: "Air conditioning" }, { label: "Ceiling fan" }],
    },
    {
      group: "Home safety",
      items: [
        { label: "Exterior security cameras on property" },
        { label: "Carbon monoxide alarm", unavailable: true },
        { label: "Smoke alarm", unavailable: true },
      ],
    },
    {
      group: "Internet and office",
      items: [{ label: "Wifi" }, { label: "Dedicated workspace" }],
    },
    {
      group: "Kitchen and dining",
      items: [
        { label: "Kitchen" },
        { label: "Fridge" },
        { label: "Freezer" },
        { label: "Microwave" },
        { label: "Cooking basics" },
        { label: "Crockery and cutlery" },
        { label: "Kettle" },
        { label: "Coffee" },
        { label: "Wine glasses" },
        { label: "Toaster" },
        { label: "Blender" },
        { label: "Cooker" },
      ],
    },
    {
      group: "Location features",
      items: [{ label: "Private entrance" }],
    },
    {
      group: "Outdoor",
      items: [{ label: "Patio or balcony" }, { label: "Outdoor dining area" }],
    },
    {
      group: "Parking and facilities",
      items: [
        { label: "Free parking on premises" }, 
        { label: "Pool" }, 
        { label: "Hot tub" },
        { label: "Gym" }
      ],
    },
    {
      group: "Services",
      items: [
        { label: "Pets allowed" },
        { label: "Cleaning available during stay" },
        { label: "Long-term stays allowed" },
        { label: "Self check-in" },
      ],
    },
  ],

  booking: {
    price: "₹28,499",
    priceUnit: "for 5 nights",
    checkIn: "10/18/2026",
    checkOut: "10/23/2026",
    guests: "2 guests",
    freeCancel: "Free cancellation before 17 October",
    promo: "Get 10% off your next stay.",
    promoTerms: "Terms apply",
  },

  calendar: {
    heading: "5 nights in Candolim",
    range: "18 Oct 2026 - 23 Oct 2026",
    // months rendered from Date; selection is inclusive 18–23 Oct 2026
    months: [
      { year: 2026, month: 9 }, // October (0-indexed)
      { year: 2026, month: 10 }, // November
    ],
    selectStart: { year: 2026, month: 9, day: 18 },
    selectEnd: { year: 2026, month: 9, day: 23 },
  },

  ratingBreakdown: [
    { star: 5, pct: 95 },
    { star: 4, pct: 15 },
    { star: 3, pct: 0 },
    { star: 2, pct: 0 },
    { star: 1, pct: 0 },
  ],

  categoryScores: [
    { icon: "cleanliness", label: "Cleanliness", score: "5.0" },
    { icon: "accuracy", label: "Accuracy", score: "5.0" },
    { icon: "checkin", label: "Check-in", score: "5.0" },
    { icon: "communication", label: "Communication", score: "5.0" },
    { icon: "location", label: "Location", score: "4.8" },
    { icon: "value", label: "Value", score: "4.8" },
  ],

  reviewTopics: [
    { icon: "comfort.png", label: "Comfort", count: 6 },
    { icon: "accuracy.png", label: "Accuracy", count: 5 },
    { icon: "hot-tub.png", label: "Hot tub", count: 5 },
    { icon: "condition.png", label: "Condition", count: 4 },
    { icon: "hospitality.png", label: "Hospitality", count: 8 },
    { icon: "cleanliness.png", label: "Cleanliness", count: 4 },
    { icon: "amenities.png", label: "Amenities", count: 2 },
    { icon: "decor.png", label: "Decor", count: 2 },
    { icon: "indoor-spaces.png", label: "Indoor spaces", count: 2 },
    { icon: "location.png", label: "Location", count: 2 },
  ].map((t) => ({ ...t, icon: img(t.icon) })),

  reviews: [
    {
      name: "Amit",
      letter: "A",
      color: "#ebd8ba",
      textColor: "#735220",
      tenure: "2 months on Airbnb",
      date: "1 week ago",
      text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    },
    {
      name: "Aheesh",
      avatar: img("rev1.jpeg"),
      tenure: "3 years on Airbnb",
      date: "2 weeks ago",
      text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    },
    {
      name: "Samiksha",
      avatar: img("rev2.jpeg"),
      tenure: "8 months on Airbnb",
      date: "May 2026",
      text: "the host nitish was really great help",
    },
    {
      name: "Vedant",
      letter: "V",
      color: "#ede3f7",
      textColor: "#604385",
      tenure: "4 years on Airbnb",
      date: "May 2026",
      text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.",
    },
    {
      name: "Vaibhav S",
      avatar: img("rev3.jpeg"),
      tenure: "3 years on Airbnb",
      date: "May 2026",
      text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    },
    {
      name: "Mohd",
      avatar: img("rev4.jpeg"),
      tenure: "5 years on Airbnb",
      date: "May 2026",
      text: "Great place. Exactly as described in the listing.",
    },
  ],

  cohosts: [
    { name: "Sharath", avatar: img("co1.jpg") },
    { name: "Aman Dev Pahwa", avatar: img("co2.jpg") },
    { name: "Maria Karen Priyanka", avatar: img("co3.jpg") },
    { name: "Simran", avatar: img("s1.jpeg") },
    { name: "Pallavi", avatar: img("s2.jpeg") },
    { name: "Sanyukta", avatar: img("s3.jpeg") },
    { name: "Shruti", letter: "S", color: "#f4a6c0" },
    { name: "Amisha", letter: "A", color: "#9ca3af" },
  ],

  neighbourhood:
    "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",

  thingsToKnow: {
    cancellation: [
      "Free cancellation before 17 October.Cancel before check-in on 18 October for a partial refund.",
      "Review this host's full policy for details.",
    ],
    houseRules: ["Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"],
    safety: [
      "Carbon monoxide alarm not reported",
      "Smoke alarm not reported",
      "Exterior security cameras on property",
    ],
  },

  moreStays: [
    { title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91", img: img("s1.jpeg") },
    { title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: "4.95", img: img("s2.jpeg") },
    { title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94", img: img("s3.jpeg") },
    { title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96", img: img("s4.jpeg") },
    { title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95", img: img("s5.jpeg") },
    { title: "Serene Sunset Villa with Private Pool & Garden", price: "₹34,120", rating: "4.89", img: img("s6.jpeg") },
    { title: "Baga Beachfront Luxury Suite & Jacuzzi", price: "₹28,500", rating: "4.97", img: img("s1.jpeg") },
    { title: "Cozy Palm Grove Cottage | Candolim Beach", price: "₹18,900", rating: "4.92", img: img("s2.jpeg") },
    { title: "The Heritage Goan Portuguese Home", price: "₹31,450", rating: "4.98", img: img("s3.jpeg") },
    { title: "Modern Ocean View Penthouse with Terrace", price: "₹48,000", rating: "4.93", img: img("s4.jpeg") },
  ],
};

export const amenityIconMap: Record<string, string> = {
  "Kitchen": "AmKitchen",
  "Wifi": "AmWifi",
  "Dedicated workspace": "AmWorkspace",
  "Free parking on premises": "AmParking",
  "Pool": "AmPool",
  "Hot tub": "AmHottub",
  "Pets allowed": "AmPets",
  "Exterior security cameras on property": "AmCamera",
  "Carbon monoxide alarm": "AmCo",
  "Smoke alarm": "AmSmoke",
  "Air conditioning": "AmAc",
  "Ceiling fan": "HiCool",
  "Hairdryer": "AmHairdryer",
  "Hot water": "AmHotwater",
  "Shampoo": "AmShampoo",
  "Shower gel": "AmShowergel",
  "Bed linen": "AmBedlinen",
  "Room-darkening blinds": "AmBlinds",
  "Clothes storage": "AmClothesStorage",
  "Hangers": "AmHangers",
  "Iron": "AmIron",
  "Cot": "AmCot",
  "TV": "AmTv",
  "Exercise equipment": "AmParking",
  "Fridge": "AmFridge",
  "Freezer": "AmFridge",
  "Microwave": "AmMicrowave",
  "Cooking basics": "AmKitchen",
  "Cooker": "AmCooker",
  "Blender": "AmBlender",
  "Kettle": "AmKettle",
  "Toaster": "AmToaster",
  "Coffee": "AmCoffee",
  "Wine glasses": "AmWineglasses",
  "Crockery and cutlery": "AmCrockery",
  "Private entrance": "AmPrivateEntrance",
  "Gym": "AmGym",
  "Cleaning available during stay": "ScCleanliness",
  "Long-term stays allowed": "AmLongterm",
  "Self check-in": "HiKey",
  "Cleaning products": "AmClean",
  "Washing machine": "AmWashMachine",
  "Patio or balcony": "AmPatio",
  "Outdoor dining area": "AmOutdoorDining",
};

// Photo-tour categories with explicit row layout (1 = full-width, 2 = side-by-side pair).
// Row patterns match the reference's photo-tour arrangement.
export const photoTour: PhotoCategory[] = [
  {
    id: "living-room-1",
    title: "Living room 1",
    subtitle: "Sofa · Air conditioning · Ceiling fan · TV",
    rows: [1, 2],
    photos: ["a9831aeb-f441-44f5-a38f-4cf54e3f0fcf", "a45feaa2-b607-4092-83ac-5fd4b2894959", "f1da1c3d-0d10-481e-9b63-c71f9073f30b"],
  },
  {
    id: "living-room-2",
    title: "Living room 2",
    subtitle: "Ceiling fan · Hot tub",
    rows: [1, 2, 1, 2, 1],
    photos: ["090d8b0b-b539-42c0-84f8-e1fb0cdf9a93", "9be71047-fc52-438a-9270-75cb470f6752", "f6de1663-4e9c-4414-b63b-29a154a92ee1", "2367476f-11c4-4a14-a7c6-267be62c1d59", "34529829-a971-44d3-ac2f-90ea3678a34d", "153aa732-4935-48b8-a6fe-b469b6af5efc", "3c6e6809-1bb1-47a6-8e24-aff593e1c28f"],
  },
  {
    id: "full-kitchen",
    title: "Full kitchen",
    subtitle: "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
    rows: [2],
    photos: ["56c44812-52c0-4481-90d8-101ec1f34c7a", "ddc853d7-e658-405c-bedc-8f31106c447e"],
  },
  {
    id: "bedroom",
    title: "Bedroom",
    subtitle: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
    rows: [1, 2, 1, 2],
    photos: ["67c61c6f-6260-4809-9510-0360e58a345d", "1c827136-4a85-4fe0-8e69-3fd8ea19bb17", "0622ab42-b851-4d55-9d9f-df3143bc5909", "a74e3c0b-3188-4442-9146-1cd4d6ea45df", "48a8ffbc-fbf7-4f84-bc29-ee400da3f08b", "3cf31697-f3f3-4c60-82c4-029acb119ae4"],
  },
  {
    id: "full-bathroom",
    title: "Full bathroom",
    subtitle: "Hairdryer · Hot water · Shampoo · Shower gel",
    rows: [1],
    photos: ["97c78f8a-5090-4663-aebc-ba4e13b47092"],
  },
  {
    id: "gym",
    title: "Gym",
    subtitle: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
    rows: [1, 2, 2],
    photos: ["9aa8e65f-94ac-4ba0-9a10-9ec91e536d22", "246bd88d-4dd6-4117-a401-02a36ebfcf16", "4fede77d-7a71-446f-89e3-263af937f3fa", "79f59adb-5a5f-4d6c-8109-1f01f4ca0d03", "f19d8c0a-1d88-42a4-9218-686d4f0db7e4"],
  },
  {
    id: "exterior",
    title: "Exterior",
    subtitle: "",
    rows: [1, 2, 1, 2],
    photos: ["23ea6621-6f74-4baa-acea-2fd03e312b41", "5adfdf3e-d497-4efc-ab8c-fc559dab311e", "608748cd-6ee7-4a71-88a2-ba79d3ddba5a", "5b856fde-a393-41bf-b373-c9d02e64221f", "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d", "42befad7-fb29-473d-91db-b03e7a544d1d"],
  },
  {
    id: "pool",
    title: "Pool",
    subtitle: "Pool",
    rows: [1, 2],
    photos: ["fc02f48f-a937-42c5-895d-f9cc3113d6ca", "929545d3-e241-46c0-8a70-c24531ce7b54", "8eb65a8b-e795-4870-b141-6f63b1be24ae"],
  },
  {
    id: "additional-photos",
    title: "Additional photos",
    subtitle: "",
    rows: [1, 2, 1, 2, 1, 2, 1],
    photos: ["70325367-cbae-4993-b560-18cd3f6edd53", "cc7a56bd-242c-498a-9aef-0cffac619e54", "30ad93b2-293f-494d-b645-626303c6cb93", "9642a60d-e9de-4e1a-89c2-9ebd230f4a74", "b6599f26-d65c-4df0-baf2-ef18c82a86a3", "dc01fd46-b119-48d3-a43b-f6c093e26eca", "fe37b80e-da8a-4225-b27b-dfbb5d763c01", "3c90338e-86b4-423f-aae1-279e0ccc3a18", "862d936c-0f34-4e50-af87-b519e2781d19", "79addceb-8c2d-419b-80ff-e29af426a94c"],
  },
].map((c) => ({ ...c, photos: c.photos.map((p) => img(p + ".jpeg")) }));

// Flat ordered list of every photo-tour image (used by the lightbox for prev/next).
export const allPhotos: TourPhoto[] = photoTour.flatMap((c) =>
  c.photos.map((src) => ({ src, category: c.title }))
);
