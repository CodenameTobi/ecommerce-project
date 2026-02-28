import Header from "../../components/Header"

import './Page404.css';

export function Page404({ cart }) {
    return (
        <>
            <title>Page not found</title>

            <Header cart={cart} />

            <div className="page404-container">
                <p>Page not found!</p>
            </div>
        </>
    )
}
