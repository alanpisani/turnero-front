import type SpecialtyCardType from "../../../types/Home/SpecialtyCardType";
import "./SpecialtyCard.css";

export function SpecialtyCard({ srcImg, title, description }: SpecialtyCardType){
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