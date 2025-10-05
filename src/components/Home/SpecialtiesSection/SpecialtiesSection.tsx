import { specialitiesCardsData } from "../../../data/specialitiesCardsData";
import { SpecialtyCard } from "../SpecialtyCard/SpecialtyCard";
import "./SpecialtiesSection.css";

interface SpecialtiesSectionProps{
    title: string;
}

export function SpecialtiesSection( { title }: SpecialtiesSectionProps ){
    return (
        <section id="specialties" className="specialties-section">
            <div className="section-content">
                <h2>{ title }</h2>
                <div className="specialties-container">
                    {
                        specialitiesCardsData.map( (card, index) => (
                            <SpecialtyCard key={index} 
                                srcImg={ card.srcImg }
                                title={ card.title }
                                description= { card.description}
                            />
                        ) )
                    }
                </div>
            </div>
        </section>
    );
}