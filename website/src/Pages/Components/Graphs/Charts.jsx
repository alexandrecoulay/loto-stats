import React, { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { baseapiurl } from "../../Services/constante";

function Charts() {
    const [data, setData] = useState({})
    const [page, setPage] = useState("first")

    useEffect(() => {
        async function getData() {
            const request = await fetch(`${baseapiurl}/group`);
            const response = await request.json();

            console.log(response);
            setData(response)
        }
        
        getData();
    }, [])


    return (
        <div className="chart_bar">
            <div className="select_number">
                <button style={{ textDecoration: page === "first" ? "underline" : "none" }} onClick={() => setPage("first")}>n° 1</button>
                <button style={{ textDecoration: page === "seconde" ? "underline" : "none" }} onClick={() => setPage("seconde")}>n° 2</button>
                <button style={{ textDecoration: page === "third" ? "underline" : "none" }} onClick={() => setPage("third")}>n° 3</button>
                <button style={{ textDecoration: page === "fourth" ? "underline" : "none" }} onClick={() => setPage("fourth")}>n° 4</button>
                <button style={{ textDecoration: page === "fifth" ? "underline" : "none" }} onClick={() => setPage("fifth")}>n° 5</button>
                <button style={{ textDecoration: page === "lucky" ? "underline" : "none" }} onClick={() => setPage("lucky")}>n° chance</button>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data[page]}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" interval="preserveStartEnd" tickLine={10} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Charts;