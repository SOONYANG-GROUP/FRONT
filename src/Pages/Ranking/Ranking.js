import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const Ranking = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        
    }, []);

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <></>
        )
    }
}

export default Ranking;