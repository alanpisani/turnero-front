import "./Home.css";

import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "./HeroSection/HeroSection";
import { heroItems } from "../../data/heroItems";
import { WhyChooseUsSection } from "./WhyChooseUsSection/WhyChooseUsSection";
import { whyChooseUsItems } from "../../data/whyChooseUsItems";
import { SpecialtiesSection } from "./SpecialtiesSection/SpecialtiesSection";
import { ItsSimpleSection } from "./ItsSimpleSection/ItsSimpleSection";
import { FirstConsultSection } from "./FirstConsultSection/FirstConsultSection";

export function Home() {

  return (
    <>
        <Header />
        <main className="home-main">
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