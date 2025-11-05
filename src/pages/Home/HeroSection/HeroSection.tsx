import "./HeroSection.css";
import SignUpForm from "./SignUpForm/SignUpForm";

interface HeroSectionProps {
  title: string;
  items: string[];
}

export function HeroSection({ title, items }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="banner-content">
        <div className="banner-content-list">
          <h1>{title}</h1>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="banner-content-form">
          <h3>Sacar turno para tu primera consulta gratis</h3>
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
