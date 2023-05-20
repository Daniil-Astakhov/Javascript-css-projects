import AppBanner from '../appBanner/AppBanner'
import { ComicsList } from "../comicsList/ComicsList";
import { Helmet } from 'react-helmet';
import { useState } from 'react';
const ComicsPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
      setChar(id)
    }
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics list"
                    />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicsList onCharSelected={onCharSelected}/> 
        </>
        
    )
}
export default ComicsPage;