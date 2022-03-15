import React from "react";

function MainPage({ children }) {
    return (
        <div className="main">
            <nav>
                <a href="/">Accueil</a>
                <a href="/prediction">Prediction</a>
                <a href="/average">Moyenne</a>
                <a href="/draws">Tirages</a>
                <a href="/charts">Afficher les graphiques</a>
                <a href="/repartition">Afficher la répartition</a>
            </nav>
            { children }
        </div>
    )
}

export default MainPage;