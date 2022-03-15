import React, { useEffect, useState } from "react";
import TableElement from "../Components/Draws/TableElements";
import { baseapiurl } from "../Services/constante";

function Draws() {

    const [draws, setDraws] = useState([]);

    useEffect(() => {
        async function getData() {
            const request = await fetch(`${baseapiurl}/draws`);
            const response = await request.json()
            
            setDraws(response);
        }

        getData()
    }, [])



    return (
        <div className="table-wrapper" >
            <table className="fl-table">
                <thead>
                <tr>
                    <th>Jour</th>
                    <th>n°1</th>
                    <th>n°2</th>
                    <th>n°3</th>
                    <th>n°4</th>
                    <th>n°5</th>
                    <th>Chance</th>
                </tr>
                </thead>
                <tbody>
                {
                    draws.length > 0 ? draws.map((e, index) => <TableElement key={index} element={e} />) : <tr><td>Chargement ...</td></tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export default Draws;