import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const Battles = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ battles, setBattles ] = useState([]);
    
    useEffect(() => {
        setIsLoading(false);
    }, []);

    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else
    {
        return(
            <></>
        );
    }
}

export default Battles;