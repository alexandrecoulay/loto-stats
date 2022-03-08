import React from "react";
import dayjs from "dayjs"

function TableElement({ element }) {
    return (
        <tr>
            <td>{dayjs(element.created_at).format("DD/MM/YYYY")}</td>
            <td>{element.first}</td>
            <td>{element.seconde}</td>
            <td>{element.third}</td>
            <td>{element.fourth}</td>
            <td>{element.fifth}</td>
            <td>{element.lucky}</td>
        </tr>
    )
}

export default TableElement;