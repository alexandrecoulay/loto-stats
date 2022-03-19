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
    const [bestDraws, setBestDraws] = useState({
        first: 0,
        seconde: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
        lucky: 0
    })

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

            setBestDraws(response.best_draws);
        }

        getData()
    }, [])



    return (
        <div className="next-draws">
            <div className="draws">
                <div className="draw">
                    <label>Grille la plus chanceuse :</label> 
                    <NextDraw {...bestDraws} />
                </div>
                <div className="draw">
                    <label>Numéros les plus chanceux (par place de tirage) :</label> 
                    <NextDraw {...maxDraws} />
                </div>
                <div className="draw">
                    <label>Numéros les moins chanceux (par place de tirage) :</label> 
                    <NextDraw {...minDraws} />
                </div>
            </div>
        </div>
    )
}

export default Create;