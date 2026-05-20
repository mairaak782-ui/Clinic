import { Doctor, BlogArticle } from "./types";

export const CLINIC_SPECIALTIES = [
  { id: "General Medicine", name: "General Medicine", icon: "Stethoscope", desc: "Primary and preventative care for all ages." },
  { id: "Pediatrics", name: "Pediatrics", icon: "Baby", desc: "Specialized care for infants, children, and adolescents." },
  { id: "Cardiology", name: "Cardiology", icon: "Heart", desc: "Comprehensive diagnosis and treatment of heart conditions." },
  { id: "Orthopedics", name: "Orthopedics", icon: "Activity", desc: "Joint, bone, muscle, and orthopedic rehabilitation." },
  { id: "Dermatology", name: "Dermatology", icon: "Sparkles", desc: "Expert assessment and therapy for skin, hair, and nail health." },
  { id: "Neurology", name: "Neurology", icon: "Brain", desc: "Advanced neuroscience care for brain and nervous disorders." },
  { id: "OB-GYN", name: "Obstetrics & Gynecology", icon: "UserRound", desc: "Dedicated healthcare for women throughout every stage of life." },
];

export const CLINIC_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Evelyn Stone",
    title: "MD, Board-Certified Cardiologist",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 142,
    education: "Johns Hopkins University School of Medicine",
    languages: ["English", "Spanish"],
    availability: "Mon, Wed, Fri (9:00 AM - 4:00 PM)",
    nextSlot: "Today, 2:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Stone has over 14 years of experience specializing in cardiovascular health, preventative cardiology, and non-invasive diagnostic cardiac testing. She believes in heart wellness through lifestyle adjustments and targeted therapy."
  },
  {
    id: "doc-2",
    name: "Dr. Marcus Vance",
    title: "MD, FAAP Pediatrician",
    specialty: "Pediatrics",
    rating: 4.8,
    reviews: 198,
    education: "Harvard Medical School",
    languages: ["English", "French"],
    availability: "Tue, Thu, Sat (8:00 AM - 1:00 PM)",
    nextSlot: "Tomorrow, 9:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Vance is a dedicated pediatrician focused on supporting healthy child development from birth through adolescence. His playful checkup style makes doctor visits fun and anxiety-free for care-seekers and parents."
  },
  {
    id: "doc-3",
    name: "Dr. Sarah Lin",
    title: "MD, Chief of Family Practice",
    specialty: "General Medicine",
    rating: 5.0,
    reviews: 310,
    education: "Stanford University School of Medicine",
    languages: ["English", "Mandarin"],
    availability: "Mon-Thu (9:00 AM - 5:00 PM)",
    nextSlot: "Today, 3:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Lin approaches primary medicine with a comprehensive, whole-body perspective. She specializes in chronic disease management, lifestyle habit restructuring, and family physical wellness screenings."
  },
  {
    id: "doc-4",
    name: "Dr. David Kael",
    title: "MD, Orthopedic Specialist",
    specialty: "Orthopedics",
    rating: 4.7,
    reviews: 89,
    education: "Perelman School of Medicine at University of Pennsylvania",
    languages: ["English"],
    availability: "Wed, Thu (1:00 PM - 5:00 PM)",
    nextSlot: "Tomorrow, 1:15 PM",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Kael is an expert in sports injury remediation, skeletal joint preservation, and advanced non-surgical orthopedic therapies. He is dedicated to helping patients restore active, pain-free mobility."
  },
  {
    id: "doc-5",
    name: "Dr. Clara Wu",
    title: "MD, FAAD Dermatologist",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 114,
    education: "UCSF School of Medicine",
    languages: ["English", "Korean"],
    availability: "Mon, Fri (10:00 AM - 4:00 PM)",
    nextSlot: "Friday, 10:30 AM",
    imageUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Wu guides dermatological treatment by blending therapeutic healing with clinical dermatology. She handles persistent eczema, skin cancer evaluations, adult acne, and skin health maintenance regimes."
  },
  {
    id: "doc-6",
    name: "Dr. Arthur Pendelton",
    title: "MD, Board-Certified Neurologist",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 74,
    education: "Yale School of Medicine",
    languages: ["English", "German"],
    availability: "Tue, Fri (9:00 AM - 3:00 PM)",
    nextSlot: "Tuesday, 11:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Pendelton leads neuromuscular science research and clinical care, specializing in migraines, autonomic disorders, neuropathy, and preventative cerebral health plans for high-risk profiles."
  }
];

export const CLINIC_BLOGS: BlogArticle[] = [
  {
    id: "blog-1",
    title: "10 Heart-Healthy Food Swaps You Can Build This Week",
    excerpt: "Nourishing your heart doesn't require drastic diets. Small, daily adaptations can significantly lower cholesterol risk and improve your overall arterial health.",
    content: `Cardiovascular disease remains one of the leading global health issues, yet the power of preventative nutrition is substantial. Making small, highly sustainable adjustments to your food patterns holds more compounding benefits than short-lived fad diets.

### 1. Swap Butter with Extra Virgin Olive Oil
Extra virgin olive oil is full of monounsaturated fatty acids (specifically oleic acid) which can help reduce inflammation and improve your good HDL cholesterol. Use it for stir-frying or dressing fresh salads.

### 2. Swap Salt-Shaking for Zesty Herbs
Excess sodium causes the vascular system to store fluids, increasing blood pressure. Use fresh lemon juice, crushed garlic, rosemary, and smoked paprika to bring vibrant flavor to your dishes without high sodium levels.

### 3. Swap Morning Bagels for Old Fashioned Oatmeal
Soluble fiber acts like a soft cellular gel in the digestive tract, actively binding to cholesterol building blocks and excreting them before absorption. Top with crushed walnuts and fresh blueberries for a potent antioxidant and omega-3 boost.

### 4. Swap Refined White Bread for Sprouted Wheat
Whole grains maintain their fibrous bran and nutrient-dense germ, smoothing glucose delivery and protecting delicate vascular walls from inflammatory blood sugar rushes.

### Comprehensive Heart Milestones:
- Maintain 30 minutes of aerobic heart-rate elevation daily.
- Keep sodium intake below 2,000 mg per day.
- Focus on getting at least 7.5 hours of stress-reducing sleep.

*CarePoint Guidance: Schedule an annual executive metabolic panel to check your apolipoprotein and cholesterol ratios for customized heart wellness profiles.*`,
    category: "Cardiology",
    readTime: "4 min read",
    date: "May 18, 2026",
    author: {
      name: "Dr. Evelyn Stone",
      role: "Cardiology Chief",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
    },
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
    likes: 42
  },
  {
    id: "blog-2",
    title: "Understanding Childhood Immunizations: Timelines & Safety Facts",
    excerpt: "Demystify pediatric vaccine guidelines. Learn how modern schedules are engineered to safely shield infant immune system thresholds.",
    content: `As parent role models, navigating pediatric vaccine schedules can sometimes feel overwhelming. However, immunizations are one of medicine’s safest and most successful public health measures, preventing serious childhood diseases.

### How Immunizations Shield Young Immune Systems
Infants possess passive immunity from their mother during the third trimester, but this defense rapidly declines in early infancy. Vaccinations trigger targeted, harmless immune responses, training antibody memory cells to repel pathogens if exposed in the future.

### The Standard CDC Vaccine Timeline (0 - 12 Months)
- **Birth**: Hepatitis B (Dose 1) protecting initial hepatic entry paths.
- **2 Months**: DTaP, Hib, IPV, PCV13, and Rotavirus to protect against infant pertussis, pneumonia, and viral diarrhea.
- **6 Months**: Completion of initial dose sets plus annual safe influenza guards.
- **12 Months**: MMR (Measles, Mumps, and Rubella) and Varicella (Chickenpox) safe active defense.

### Reassuring Care Facts for Parents:
- Vaccines contain trace antigen amounts that are minor compared to what a child's immune system encounters daily in household environments.
- Normal responses: A mild low-grade fever or injection site redness for 24-48 hours. Warm compresses and pediatric acetaminophen (based on weight) bring quick comfort.

*Pediatric Care Note: Always consult Dr. Vance during regular check-ups to tailor schedule milestones for children with allergy lists.*`,
    category: "Pediatrics",
    readTime: "5 min read",
    date: "May 12, 2026",
    author: {
      name: "Dr. Marcus Vance",
      role: "Senior Pediatrician",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
    },
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
    likes: 67
  },
  {
    id: "blog-3",
    title: "The Ultimate Care Routine for Your Skin Barrier",
    excerpt: "Is your face tight, sensitive, or red? You might be stripping your lipid barrier. Learn how to reconstruct clear, resilient skin structures.",
    content: `Your skin is more than an aesthetic canvas—it is a critical immunological organ. The outermost thin envelope, known as the stratum corneum, is bound by structural lipids (ceramides, fatty acids) that block water evaporation and allergens.

### Signs of a Compromised Lipid Barrier:
- Dry, flaking skin even after thick cream application.
- Redness or stinging sensations when simple water or products are applied.
- Persistent hormonal breakouts combined with dry skin.

### Step-by-Step Recovery Checklist:
1. **Cleanse with care**: Use sub-lukewarm water and soap-free, non-foaming cream cleansers.
2. **Seal with Ceramides**: Choose moisturizers rich in cholesterol lipids, squalane, and active hyaluronic acid.
3. **Painless Protection**: Apply broad-spectrum physical zinc oxide sunscreens every morning. Zinc oxide protects and acts as a skin-calming anti-inflammatory.
4. **Pause Active Chemical Peels**: Temporarily stop retinol, glycolic acids, and manual face scrubs for 14-21 days until skin barrier cells renew.

*Dermatology Advice: Keep skin hydrated in air-conditioned environments by using a clean bedroom humidifier.*`,
    category: "Dermatology",
    readTime: "3 min read",
    date: "May 09, 2026",
    author: {
      name: "Dr. Clara Wu",
      role: "Lead Dermatologist",
      avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=100"
    },
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    likes: 81
  },
  {
    id: "blog-4",
    title: "Building Circadian Rhythms for Refreshing Sleep",
    excerpt: "Disrupted sleep drains brain stamina and cardiovascular healing. Master sleep mechanics with these 4 scientific guidelines.",
    content: `Modern habits often lead our eyes to confuse room artificial lighting with solar daytime patterns. Restoring regular sleep schedules relies on biological synchronizers supporting natural melatonin pathways.

### Melatonin and Biological Light Control
Melatonin, the body’s natural rest-inducing hormone, is synthesized by the pineal gland. Its secretion is heavily suppressed when blue light stimulates specialized photoreceptors in our retinas.

### The Sleep Hygiene Protocol:
- **Morning Lux**: Expose your eyes to at least 15 minutes of direct morning sunlight before 9:00 AM to sync your biological clock.
- **The Cool Room Target**: Set your bedroom temperature near 65-68°F (18°C). Body core temperature drops as part of the metabolic pathway for deep sleep entry.
- **The Screen Buffer**: Switch off tablet screens and active home computer monitors 90 minutes before bedtime.

*General Wellness Advice: If you suffer from chronic insomnia, talk with Dr. Lin for helpful diagnostic evaluations.*`,
    category: "Lifestyle",
    readTime: "4 min read",
    date: "May 05, 2026",
    author: {
      name: "Dr. Sarah Lin",
      role: "Family Medicine Doctor",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=100"
    },
    imageUrl: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=600",
    likes: 54
  }
];
