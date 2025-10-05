import "./SpecialtyCard.css";

interface SpecialtyCardProps{
    srcImg: string;
    title: string;
    description: string;
}

export function SpecialtyCard({ srcImg, title, description }: SpecialtyCardProps){
    return (
        <div className="specialty-card">
            <img src={ srcImg } alt="" className="specialty-img" />
            <div>
                <h3 className="specialty-title">{ title }</h3>
                <p>{ description }</p>
            </div>
        </div>
    );
}