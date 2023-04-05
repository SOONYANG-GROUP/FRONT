import React, { useEffect, useState } from "react";
import axios from "axios";
import { SUB_BACK_URL } from "../Components/Constants/URL";
import Loading from "./Loading";

const JWTest = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/jwt-test")
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default JWTest;
