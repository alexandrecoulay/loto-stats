import React from "react";

function MainPage({ children }) {
    return (
        <div className="main">
            <nav>
                <a href="/">Accueil</a>
                <a href="/draws">Tirages</a>
                <a href="/charts">Afficher les graphiques</a>
                <a href="/pie">Afficher la répartition</a>
            </nav>
            { children }
        </div>
    )
}

export default MainPage;