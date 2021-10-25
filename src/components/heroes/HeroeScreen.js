import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { heroImages } from '../../helpers/heroImages';
import { getHeroByid } from '../../selectors/getHeroByid';

export const HeroeScreen = ({history}) => {
    const {heroeId} = useParams();
    const hero = useMemo(() => getHeroByid(heroeId), [heroeId])
    // const hero = getHeroByid(heroeId);

    if(!hero){
        return <Redirect to="/" />;
    }

    const handleReturn = () =>{
        if(history.length <=2){
            history.push('/')
        }else{
            history.goBack();
        }
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;
    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                //  src={`../assets/${heroeId}.jpg`}// desde public/assets
                 src={heroImages(`./${heroeId}.jpg`).default}
                 alt={superhero}
                 className="img-thumbnail animate__animated animate__fadeInLeft"
                 />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: { alter_ego }</b></li>
                    <li className="list-group-item"><b>Publisher: { publisher }</b></li>
                    <li className="list-group-item"><b>First Appearance: { first_appearance }</b></li>
                </ul>
                <h5>Characters</h5>
                <p>{characters}</p>
                <button 
                className="btn btn-outline-info"
                onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
