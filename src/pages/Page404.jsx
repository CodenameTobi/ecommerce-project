import Header from "../components/Header"

import './Page404.css';

export function Page404() {
    return (
        <>
            <title>Page not found</title>

            <Header />

            <div className="page404-container">
                <p>Page not found!</p>
            </div>
        </>
    )
}
