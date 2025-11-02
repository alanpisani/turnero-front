import "./HeroSection.css"

interface HeroSectionProps {
  title: string;
  items: string[];
}

export function HeroSection({ title, items }: HeroSectionProps){
    return (
        <section 
            className="hero-section">
            <div className="hero-background"></div>
            <div className="banner-content">
                <h1>{ title }</h1>
                <ul>
                    {
                        items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}