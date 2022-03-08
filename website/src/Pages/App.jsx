import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import "../Styles/styles.css";
import Charts from "./Components/Graphs/Charts";
import MainPage from "./Components/MainPage";
import Home from "./Views/Home";
import Draws from "./Views/Draws";
import ChartsParts from "./Components/Graphs/Parts";

function App() {
    
    return (
        <div className="theme-main">
            <MainPage>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/draws" element={<Draws />} />
                        <Route exact path="/charts" element={<Charts />} />
                        <Route exact path="/pie" element={<ChartsParts />} />
                    </Routes>
                </BrowserRouter>
            </MainPage>
        </div>
    );
}

export default App;
