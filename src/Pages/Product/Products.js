import React, { useState } from "react";

const Products = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ products , setProducts ] = useState([]);
    

    if(isLoading)
    {
        return(
            <div>
    
            </div>
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

export default Products;