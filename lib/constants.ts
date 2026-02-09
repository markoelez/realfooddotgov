import type {
  StatItem,
  PyramidTier,
  FAQItem,
  GrokPrompt,
  PolicyItem,
  PDFResource,
} from "./types";

export const NAV_LINKS = [
  { label: "Real Food", href: "#real-food" },
  { label: "State Of Our Health", href: "#health" },
  { label: "The Solution", href: "#solution" },
  { label: "New Pyramid", href: "#pyramid" },
  { label: "Resources", href: "#resources" },
  { label: "Real Answers", href: "#answers" },
  { label: "Winning", href: "#winning" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const HEALTH_STATS: StatItem[] = [
  {
    value: "50%",
    description: "of Americans have prediabetes or diabetes",
  },
  {
    value: "75%",
    description: "of adults report having at least one chronic condition",
  },
  {
    value: "90%",
    description:
      "of U.S. healthcare spending goes to treating chronic disease\u2014much of which is linked to diet and lifestyle",
  },
];

export const PYRAMID_TIERS: PyramidTier[] = [
  {
    id: "protein",
    title: "Protein, Dairy, & Healthy Fats",
    description:
      "We are ending the war on protein. Every meal must prioritize high-quality, nutrient-dense protein from both animal and plant sources, paired with healthy fats from whole foods such as eggs, seafood, meats, full-fat dairy, nuts, seeds, olives, and avocados.",
    servingTarget:
      "1.2\u20131.6 grams of protein per kilogram of body weight per day",
    bgColor: "#FDFBEE",
    foods: [
      { name: "Milk", image: "/images/pyramid/milk.webp", alt: "Milk" },
      {
        name: "Olive Oil",
        image: "/images/pyramid/olive-oil.webp",
        alt: "Olive Oil",
      },
      {
        name: "Salmon",
        image: "/images/pyramid/salmon.webp",
        alt: "Salmon",
      },
      {
        name: "Chicken",
        image: "/images/pyramid/chicken.webp",
        alt: "Chicken",
      },
      {
        name: "Canned Tuna",
        image: "/images/pyramid/canned-tuna.webp",
        alt: "Canned Tuna",
      },
      {
        name: "Avocado",
        image: "/images/pyramid/avocado.webp",
        alt: "Avocado",
      },
      {
        name: "Cheese",
        image: "/images/pyramid/cheese.webp",
        alt: "Cheese",
      },
      {
        name: "Yogurt",
        image: "/images/pyramid/yogurt.webp",
        alt: "Yogurt",
      },
      { name: "Steak", image: "/images/pyramid/steak.webp", alt: "Steak" },
      {
        name: "Ground Beef",
        image: "/images/pyramid/ground-beef.webp",
        alt: "Ground Beef",
      },
      {
        name: "Rice & Beans",
        image: "/images/pyramid/bowl-rice-beans.webp",
        alt: "Bowl of Rice and Beans",
      },
      {
        name: "Shrimp",
        image: "/images/pyramid/shrimp.webp",
        alt: "Shrimp",
      },
      {
        name: "Butter",
        image: "/images/pyramid/butter.webp",
        alt: "Butter",
      },
      {
        name: "Walnuts",
        image: "/images/pyramid/walnut-shelled.webp",
        alt: "Walnut Shelled",
      },
      {
        name: "Walnut Kernel",
        image: "/images/pyramid/walnut-kernel.webp",
        alt: "Walnut Kernel",
      },
      {
        name: "Almonds",
        image: "/images/pyramid/almond.webp",
        alt: "Almonds",
      },
      {
        name: "Peanuts",
        image: "/images/pyramid/peanuts.webp",
        alt: "Peanuts",
      },
      { name: "Eggs", image: "/images/pyramid/eggs.webp", alt: "Eggs" },
    ],
  },
  {
    id: "vegetables-fruits",
    title: "Vegetables & Fruits",
    description:
      "Vegetables and fruits are essential to real food nutrition. Eat a wide variety of whole, colorful, nutrient-dense vegetables and fruits in their original form, prioritizing freshness and minimal processing.",
    servingTarget: "Vegetables: 3 servings per day. Fruits: 2 servings per day.",
    bgColor: "#F4FFAE",
    foods: [
      {
        name: "Broccoli",
        image: "/images/pyramid/broccoli.webp",
        alt: "Broccoli",
      },
      {
        name: "Lettuce",
        image: "/images/pyramid/lettuce.webp",
        alt: "Lettuce",
      },
      {
        name: "Tomatoes",
        image: "/images/pyramid/tomatoes.webp",
        alt: "Tomatoes",
      },
      {
        name: "Frozen Peas",
        image: "/images/pyramid/frozen-peas.webp",
        alt: "Frozen Peas",
      },
      {
        name: "Carrots",
        image: "/images/pyramid/carrots.webp",
        alt: "Carrots",
      },
      {
        name: "Green Beans",
        image: "/images/pyramid/green-beans.webp",
        alt: "Green Beans",
      },
      {
        name: "Butternut Squash",
        image: "/images/pyramid/butternut.webp",
        alt: "Butternut Squash",
      },
      {
        name: "Potatoes",
        image: "/images/pyramid/potato.webp",
        alt: "Potatoes",
      },
      {
        name: "Blueberries",
        image: "/images/pyramid/blueberries.webp",
        alt: "Blueberries",
      },
      {
        name: "Strawberries",
        image: "/images/pyramid/strawberry.webp",
        alt: "Strawberries",
      },
      {
        name: "Bananas",
        image: "/images/pyramid/bananas.webp",
        alt: "Bananas",
      },
      {
        name: "Apples",
        image: "/images/pyramid/apples.webp",
        alt: "Apples",
      },
      {
        name: "Oranges",
        image: "/images/pyramid/oranges.webp",
        alt: "Oranges",
      },
      {
        name: "Grapes",
        image: "/images/pyramid/grapes.webp",
        alt: "Grapes",
      },
    ],
  },
  {
    id: "whole-grains",
    title: "Whole Grains",
    description:
      "Whole grains are encouraged. Refined carbohydrates are not. Prioritize fiber-rich whole grains and significantly reduce the consumption of highly processed, refined carbohydrates that displace real nourishment.",
    servingTarget: "2\u20134 servings per day.",
    bgColor: "#F3F0D6",
    foods: [
      { name: "Bread", image: "/images/pyramid/bread.webp", alt: "Bread" },
      { name: "Oats", image: "/images/pyramid/bowl-oats.webp", alt: "Oats" },
      { name: "Rolled Oats", image: "/images/pyramid/oats.webp", alt: "Rolled Oats" },
    ],
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is the New Pyramid?",
    answer:
      "The New Pyramid is a simple guide designed to help Americans eat real, whole foods more consistently. It prioritizes nutrient-dense foods and reduces reliance on highly processed products, using modern nutrition science to support everyday health.",
  },
  {
    question: "Why does this matter?",
    answer:
      "For the first time, the official guidance from the United States government is to avoid highly processed food. We are not making a legal definition or attacking an industry \u2013 we are stating a public health truth that Americans already feel in their bodies and see in their families. The government\u2019s message is simple: what we eat shapes how long and how well we live \u2013 and choosing real food is one of the most powerful health decisions a person, a family, and a nation can make.",
  },
  {
    question: 'What does "Eat Real Food" mean?',
    answer:
      "Eating real food means choosing foods that are whole or minimally processed and recognizable as food. These foods are prepared with few ingredients and without added sugars, industrial oils, artificial flavors, or preservatives.",
  },
  {
    question: "Why does the New Pyramid emphasize protein and vegetables?",
    answer:
      "Protein and vegetables form the foundation of real food meals. Together, they support muscle health, metabolic function, gut health, and stable energy while naturally crowding out highly processed foods.",
  },
  {
    question: "Are fats part of eating real foods?",
    answer:
      "Yes. Healthy fats are a natural part of real foods such as meat, seafood, dairy, nuts, olives, and avocados. These fats support brain health, hormone function, and nutrient absorption when consumed in their natural forms.",
  },
  {
    question: "How does the New Pyramid address added sugars?",
    answer:
      "Added sugars are not part of eating real foods and are not recommended. The New Pyramid encourages avoiding added sugars entirely, especially for children, while allowing naturally occurring sugars found in whole fruits and plain dairy.",
  },
  {
    question: "Where do grains fit in the New Pyramid?",
    answer:
      "Grains can be part of a real food diet when eaten in whole or traditionally prepared forms. Foods like oats, rice, and true sourdough are preferred. Refined and packaged grain products should be limited.",
  },
  {
    question: "What about hydration?",
    answer:
      "Hydration matters. Choose water or unsweetened beverages to accompany meals and snacks.",
  },
  {
    question: "Is the New Pyramid a strict diet?",
    answer:
      "No. The New Pyramid is a flexible framework meant to guide better choices, not dictate exact meals. It supports cultural traditions, personal preferences, and different lifestyles while reinforcing one core goal: eat real foods most of the time.",
  },
];

export const GROK_PROMPTS: GrokPrompt[] = [
  {
    title: "Overwhelmed Parent on a Budget",
    prompt:
      "How do I feed my family REAL FOOD when we only have $200 a week and no time to cook? We\u2019re vegetarian, love Indian food, and I only have about 20 minutes for dinner. I feel like eating REAL FOOD is for people with more money and time than us.",
  },
  {
    title: "Junk Food Habit I Can\u2019t Break",
    prompt:
      "How do I switch to REAL FOOD when junk food is the only thing that feels satisfying? I live on chips, cookies, candy, and Pop-Tarts. I\u2019m on a student budget and I can\u2019t imagine giving it up without feeling deprived.",
  },
  {
    title: "Food Desert + Fixed Income",
    prompt:
      "How are we supposed to eat REAL FOOD when the only nearby option is a gas station and we\u2019re on a fixed income? I feel guilty about all the packaged snacks, but I don\u2019t know how to access REAL FOOD where we live.",
  },
  {
    title: "School Lunch Guilt",
    prompt:
      "My child eats school breakfast and lunch and it doesn\u2019t feel like REAL FOOD. I don\u2019t have time to pack meals every day. Am I failing them? Is there any realistic way to get more REAL FOOD into their day?",
  },
  {
    title: "Pregnant and Barely Functioning",
    prompt:
      "I\u2019m pregnant, nauseous, exhausted, and living on crackers \u2014 but I want to eat REAL FOOD for my baby. What actually matters in pregnancy? What REAL FOOD options are realistic when you\u2019re this tired?",
  },
  {
    title: "Picky Eaters and Dinner Battles",
    prompt:
      "My kids will only eat white, microwaveable foods and refuse REAL FOOD. I don\u2019t want dinner to be a nightly fight. How do I help picky kids gradually accept REAL FOOD without power struggles?",
  },
  {
    title: "Autoimmune and Worried",
    prompt:
      "I have an autoimmune disease and just read that processed food might make symptoms worse. Could switching to REAL FOOD help? How do I start eating REAL FOOD without it becoming overwhelming or expensive?",
  },
  {
    title: "Working Two Jobs, No Time",
    prompt:
      "I\u2019m working two jobs and barely keeping up with bills. I want to feed my family REAL FOOD, but most nights we\u2019re grabbing drive-thru because I\u2019m exhausted. How do people actually make REAL FOOD happen when there\u2019s no time or energy left?",
  },
  {
    title: "Elderly Parent on a Fixed Income",
    prompt:
      "My aging parent lives alone, is on a fixed income, and mostly eats frozen dinners and packaged snacks. I\u2019m worried they\u2019re not getting REAL FOOD, but they don\u2019t cook much anymore. How can I help them get more REAL FOOD without it being complicated or expensive?",
  },
  {
    title: "Chronic Stress + Emotional Eating",
    prompt:
      "I\u2019m constantly stressed and I use processed snacks to cope. I want to eat more REAL FOOD, but when I\u2019m overwhelmed, I crave sugar and salty junk. How do I shift toward REAL FOOD without feeling like I\u2019m losing my comfort?",
  },
];

export const POLICY_ITEMS: PolicyItem[] = [
  {
    title: "Removing Soda and Candy from SNAP",
    description:
      "The USDA is working with states to prevent SNAP funds from being used for sugary drinks, ensuring more support goes toward nutrient-dense, real food.",
  },
  {
    title: "Ensuring Schools and Military Bases Serve Real Food",
    description:
      "The Trump Administration is updating federal procurement guidelines to ensure schools and the military serve more delicious, real food.",
  },
  {
    title: "Improving Infant Formula Standards",
    description:
      "The FDA is conducting its first full review of infant formula nutrition standards since 1998.",
  },
  {
    title: "Phasing Out Petroleum-Based Dyes from Food",
    description:
      "The Trump Administration is establishing a national standard and timeline for the food industry to phase out petroleum-based food dyes in favor of natural alternatives.",
  },
  {
    title: 'Overhauling the FDA\u2019s "Generally Recognized as Safe" (GRAS) Designation',
    description:
      "The FDA is strengthening transparency and requiring gold-standard safety analysis for future ingredients entering the U.S. food supply.",
  },
];

export const PDF_RESOURCES: PDFResource[] = [
  {
    title: "Scientific Foundation Appendices",
    url: "https://cdn.realfood.gov/Scientific%20Report%20Appendices_FINAL_1.28.26.pdf",
    coverImage: "/images/covers/1.webp",
    bgColor: "#F3F0D6",
  },
  {
    title: "The Scientific Foundation for the Dietary Guidelines for Americans",
    url: "https://cdn.realfood.gov/Scientific%20Report_1.8.26.pdf",
    coverImage: "/images/covers/2.webp",
    bgColor: "#153F15",
  },
  {
    title: "Daily Servings Guide",
    url: "https://cdn.realfood.gov/Daily%20Serving%20Sizes.pdf",
    coverImage: "/images/covers/3.webp",
    bgColor: "#F4FFAE",
  },
  {
    title: "Dietary Guidelines for Americans",
    url: "https://cdn.realfood.gov/DGA.pdf",
    coverImage: "/images/covers/4.webp",
    bgColor: "#8EB258",
  },
];
