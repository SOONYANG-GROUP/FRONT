import React from "react";

import axios from "axios";

const Test1 = () => {
    const onClickTest = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000", {}, {
            headers: {
                "Authorization": `Bearer dsdfdsafsagfdagfdagfdsa`
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(`err in test1: ${err}`);
        });
    }

    return(
        <div>
            <button onClick={onClickTest}>
                Click Test
            </button>
        </div>
    )    
}

export default Test1;