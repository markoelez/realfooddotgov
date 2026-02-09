export interface FoodItem {
  name: string;
  image: string;
  alt: string;
}

export interface PyramidTier {
  id: string;
  title: string;
  description: string;
  servingTarget: string;
  foods: FoodItem[];
  bgColor: string;
}

export interface StatItem {
  value: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PolicyItem {
  title: string;
  description: string;
}

export interface GrokPrompt {
  title: string;
  prompt: string;
}

export interface PDFResource {
  title: string;
  url: string;
  coverImage: string;
  bgColor: string;
}
