import React, { useState } from "react";
import Loading from "../Loading";

const Profile = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ profile, setProfile ] = useState(null);
    
    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <>
            </>
        )
    }
}

export default Profile;