import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import SearchForm from "@/components/home/SearchForm";
import HowItWorks from "@/components/home/HowItWorks";
import CommunesList from "@/components/home/CommunesList";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SearchForm />
      <HowItWorks />
      <CommunesList />
    </Layout>
  );
};

export default Index;
