import "./Home.css";

import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "../../components/Home/HeroSection/HeroSection";
import { heroItems } from "../../data/heroItems";
import { WhyChooseUsSection } from "../../components/Home/WhyChooseUsSection/WhyChooseUsSection";
import { whyChooseUsItems } from "../../data/whyChooseUsItems";
import { FirstConsultSection } from "../../components/Home/FirstConsultSection/FirstConsultSection";
import { SpecialtiesSection } from "../../components/Home/SpecialtiesSection/SpecialtiesSection";
import { ItsSimpleSection } from "../../components/Home/ItsSimpleSection/ItsSimpleSection";

function Home() {
  return (
    <>
        <Header />
        <main>
            <HeroSection title={ "Brackets" } items={ heroItems }/>
            <WhyChooseUsSection title= "¿Por qué elegirnos?" items={ whyChooseUsItems }/>
            <FirstConsultSection />
            <SpecialtiesSection title= "Especialidades"/>
            <ItsSimpleSection title="Es simple" />
        </main>
        <Footer />
    </>
  );
}

export default Home;