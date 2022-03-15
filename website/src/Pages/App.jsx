import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import "../Styles/styles.css";
import Charts from "../Views/Charts";
import MainPage from "../Components/Home/MainPage";
import Home from "../Views/Home";
import Draws from "../Views/Draws";
import ChartsParts from "../Views/Parts";
import Average from "../Views/Average";
import Create from "../Views/Create";

function App() {
    
    return (
        <div className="theme-main">
            <MainPage>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/average" element={<Average />} />
                        <Route exact path="/prediction" element={<Create />} />
                        <Route exact path="/draws" element={<Draws />} />
                        <Route exact path="/charts" element={<Charts />} />
                        <Route exact path="/repartition" element={<ChartsParts />} />
                    </Routes>
                </BrowserRouter>
            </MainPage>
        </div>
    );
}

export default App;
