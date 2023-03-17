import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const Labs = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ labs, setLabs ] = useState([]);
    
    useEffect(() => {

    }, [isLoading]);

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div></div>
        )
    }

}

export default Labs;