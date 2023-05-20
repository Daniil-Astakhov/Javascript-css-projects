import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


const Page404 = () => {
    return(
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel 404"
                    />
                <title>404</title>
            </Helmet>
            <ErrorMessage />
            <p>404 PAGE NOT FOUND <br />
            Protocol missing... Exiting programm.. <br />
            Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
            <Link to='/'>Back to main</Link>
        </div>
    );
}
export default Page404;