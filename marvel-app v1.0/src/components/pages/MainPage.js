import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from '../errorBaundary/ErrorBaundary';
import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import { Helmet } from 'react-helmet';


const MainPage = (props) => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
      setChar(id)
    }


    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel db"
                    />
                <title>Marvel db</title>
            </Helmet>
            <ErrorBaundary>
            <RandomChar />
            </ErrorBaundary>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    <ErrorBaundary> {/* Оберните компонент CharInfo в ErrorBaundary */}
                    <CharInfo charId={selectedChar} />
                    </ErrorBaundary>
                </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )

}
export default MainPage;