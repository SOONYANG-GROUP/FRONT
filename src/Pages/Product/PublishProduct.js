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
    
    const onChangeName = () => {

    }

    const onChangeDescription = () => {

    }

    const onChangeProjectLink = () => {

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