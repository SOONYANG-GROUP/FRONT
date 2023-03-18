import React, { useEffect, useState } from "react";

const Summoners = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState("");

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    return(
        <div>

        </div>
    )
}

export default Summoners