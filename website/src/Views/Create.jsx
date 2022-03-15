import React, { useEffect, useState } from "react";
import NextDraw from "../Components/Create/NextDraw";
import { baseapiurl } from "../Services/constante";

function Create() {

    const [maxDraws, setMaxDraws] = useState({
        first: 0,
        seconde: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
        lucky: 0
    });
    const [minDraws, setMinDraws] = useState({
        first: 0,
        seconde: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
        lucky: 0
    });

    useEffect(() => {
        async function getData() {
            const request = await fetch(`${baseapiurl}/create`);
            const response = await request.json()
            
            setMaxDraws({
                first: response.max_draws.first[0]["_id"],
                seconde: response.max_draws.seconde[0]["_id"],
                third: response.max_draws.third[0]["_id"],
                fourth: response.max_draws.fourth[0]["_id"],
                fifth: response.max_draws.fifth[0]["_id"],
                lucky: response.max_draws.lucky[0]["_id"]
            })
            setMinDraws({
                first: response.min_draws.first[0]["_id"],
                seconde: response.min_draws.seconde[0]["_id"],
                third: response.min_draws.third[0]["_id"],
                fourth: response.min_draws.fourth[0]["_id"],
                fifth: response.min_draws.fifth[0]["_id"],
                lucky: response.min_draws.lucky[0]["_id"]
            })
        }

        getData()
    }, [])



    return (
        <div className="next-draws">
            <div className="draws">
                <div className="draw">
                    <label>Numéros les plus chanceux :</label> 
                    <NextDraw first={maxDraws.first} seconde={maxDraws.seconde} third={maxDraws.third} fourth={maxDraws.fourth} fifth={maxDraws.fifth} lucky={maxDraws.lucky} />
                </div>
                <div className="draw">
                    <label>Numéros les moins chanceux :</label> 
                <NextDraw first={minDraws.first} seconde={minDraws.seconde} third={minDraws.third} fourth={minDraws.fourth} fifth={minDraws.fifth} lucky={minDraws.lucky} />
                </div>
            </div>
        </div>
    )
}

export default Create;