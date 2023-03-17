import React, { useState } from "react";
import Loading from "../Loading";

// 새로 나온 언어, 새로 나온 라이브러리
const Profile = () => {
    const [ name, setName ] = useState("");
    const [ introduction, setIntroduction ] = useState("");
    const [ techs, setTechs ] = useState([]);
    
    const [ isLoading ,setIsLoading ] = useState(true);

    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else
    {
        return(
            <div>
            </div>
        )
    }
}

export default Profile;