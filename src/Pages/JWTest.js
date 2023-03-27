import React, { useEffect, useState } from "react";

import axios from "axios";

const JWTest = () => {
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        GetSkills();
        setIsLoading(false);
    }, []);
    
    const GetSkills = async () => {
        await axios.get("http://localhost:9999/skill/one/6420e3db35bafa2991683f00")
        .then((res) => {
            
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return(
        <div>

        </div>
    )
}

export default JWTest;