import React from "react";

function NextDraw({ first, seconde, third, fourth, fifth, lucky }) {

    return (
        <div className="next-draw">
            <div className="circle">
                <span>{ first }</span>
            </div>
            <div className="circle">
                <span>{ seconde }</span>
            </div>
            <div className="circle">
                <span>{ third }</span>
            </div>
            <div className="circle">
                <span>{ fourth }</span>
            </div>
            <div className="circle">
                <span>{ fifth }</span>
            </div>
            <div className="circle lucky">
                <span>{ lucky }</span>
            </div>
        </div>
    )
}

export default NextDraw;