import GovBanner from "@/components/layout/GovBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HealthCrisisSection from "@/components/sections/HealthCrisisSection";
import PyramidSection from "@/components/sections/PyramidSection";
import RealFoodDefinition from "@/components/sections/RealFoodDefinition";
import FoodsToAvoidSection from "@/components/sections/FoodsToAvoidSection";
import RealAnswersSection from "@/components/sections/RealAnswersSection";
import PolicySection from "@/components/sections/PolicySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <GovBanner />
      <Header />
      <main>
        <HeroSection />
        <HealthCrisisSection />
        <PyramidSection />
        <RealFoodDefinition />
        <FoodsToAvoidSection />
        <RealAnswersSection />
        <PolicySection />
        <ResourcesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
