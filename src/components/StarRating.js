import './StarRating.css'

export default function StarRating( {stars }) {

const maxStars = 5;

const redondeada = Math.round(stars);

const estrPar = redondeada % 2 === 0 ? redondeada : redondeada + 1;

const porcen =  ((estrPar / 2) / maxStars) * 100;


const StarStyles = () => {
    return {
        width: porcen + "%"
    };
};


return (
    <div className="stars-gray">
        <div className="stars-yellow" style={StarStyles()}></div>
    </div>
);
}