import React, { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { baseapiurl } from "../../Services/constante";

function Charts() {
    const [data, setData] = useState({})
    const [page, setPage] = useState("first")

    useEffect(() => {
        async function getData() {
            const request = await fetch(`${baseapiurl}/numbers`);
            const response = await request.json();

            console.log(response);
            setData(response)
        }
        
        getData();
    }, [])


    return (
        <div className="chart_bar">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="number" interval="preserveStartEnd" tickLine={10} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="draw" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Charts;