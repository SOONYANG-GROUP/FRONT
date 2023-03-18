import React, { useEffect, useState } from "react";

const PublishProduct = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ productLink, setProductLink ] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeProjectLink = (e) => {
        setProductLink(e.target.value);
    }


    useEffect(() => {

    }, []);

    

}

export default PublishProduct;