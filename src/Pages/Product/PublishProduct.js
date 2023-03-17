import React, { useState } from "react";
import Loading from "../Loading";

const PublishProduct = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ publishing, setPublishing ] = useState(false);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ techs, setTechs ] = useState([]);
    const [ developmentDiary, setDevelopmentDiary ] = useState([]);
    const [ imagesUrl, setImagesUrl ] = useState([]);
    const [ projectLink, setProjectLink ] = useState("");
    
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeProjectLink = (e) => {
        setProjectLink(e.target.value);
    }

    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else
    {
        if(publishing)
        {
            return(
                <div></div>
            )
        }
        else
        {
            return(
                <div></div>
            )
        }
    }
}

export default PublishProduct;