import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const Battle = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    

    useEffect(() => {
        setIsLoading(false);
    }, []);

    

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div>
                
            </div>
        )
    }
}

export default Battle;