import "./WhyChooseUsSection.css"

import img1 from "./img-1.jpg";

interface WhyChooseUsSectionProps {
    title: string;
    items: string[];
}

export function WhyChooseUsSection( { title, items }: WhyChooseUsSectionProps){
    return (
        <section id="why-choose-us" className="why-choose-us">
            <div className="why-choose-us-text-container">
            <h2>{ title }</h2>
                <ul>
                    {
                        items.map( (item, index) => (
                            <li key={index}>{ item }</li>
                        ) )
                    }
                </ul>
            </div>
            <img src={img1} alt="" />
        </section>
    );
}