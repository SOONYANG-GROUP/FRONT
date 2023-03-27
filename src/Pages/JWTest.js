import React, { useEffect, useState } from "react";

import axios from "axios";

const JWTest = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    
    const [ image, setImage ] = useState(null);

    useEffect(() => {
        setIsLoading(false);
    }, []);
    
    const handleImage = async (e) => {
        await setCreating(true);
        const file = e.target.files[0];
        setFileToBase(file);
        await setCreating(false);
        console.log(file);
        
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try
        {
            console.log('hel')
            await axios.post("http://localhost:9999/upload/skill/thumbnail", {image})
            .then((res) => {
                const _id = res.data._id;
                window.location.replace(`/skill/${_id}`);
            })
            .catch((err) => {
                console.error(err)
            })
        }
        catch(error)
        {
            console.error(error);
        }
        
    }

    
    if(creating)
    {
        return(
            <div></div>
        )
    }
    else
    {
        return(
            <div>
                {creating ? (<></>) : (<img src={image}/>)}
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                />
                <button onClick={onSubmit}>Submit</button>
            </div>
        )
    }
}

export default JWTest;