import React, { useState } from "react";
import dayjs from "dayjs";
import { baseapiurl } from "../Services/constante";

function Home() {

    const [draw, setDraw] = useState({
        first: 0,
        seconde: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
        lucky: 0,
        created_at: dayjs().format()
    });

    const changeInput = (e) => {
        e.preventDefault();

        setDraw({ ...draw, [e.target.name]: e.target.value })
    }

    const sendInfo = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(draw)
        };

        const request = await fetch(`${baseapiurl}/add`, requestOptions);

        request.status === 200 ? alert("envoyé") : alert("erreur")
    }

    return (
        <div className="home">
            <div>
                <div className="input-div">
                    <label>n°1 :</label>
                    <input onChange={changeInput} name="first" type="number" value={draw.first} />
                </div>
                <div className="input-div">
                    <label>n°2 :</label>
                    <input onChange={changeInput} name="seconde" type="number" value={draw.seconde} />
                </div>
                <div className="input-div">
                    <label>n°3 :</label>
                    <input onChange={changeInput} name="third" type="number" value={draw.third} />
                </div>
                <div className="input-div">
                    <label>n°4 :</label>
                    <input onChange={changeInput} name="fourth" type="number" value={draw.fourth} />
                </div>
                <div className="input-div">
                    <label>n°5 :</label>
                    <input onChange={changeInput} name="fifth" type="number" value={draw.fifth} />
                </div>
                <div className="input-div">
                    <label>n° chance :</label>
                    <input onChange={changeInput} name="lucky" type="number" value={draw.lucky} />
                </div>
                <div className="input-div">
                    <label>Créé le :</label>
                    <input onChange={changeInput} name="created_at" type="date" value={draw.created_at} />
                </div>
                <button onClick={sendInfo}>Envoyé</button>
            </div>
        </div>
    )
}

export default Home;