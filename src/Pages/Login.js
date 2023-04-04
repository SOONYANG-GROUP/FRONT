import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Login = () => {
  if (!sessionStorage.getItem("accessToken")) {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    window.location.replace("/");
  }

  if (sessionStorage.getItem("accessToken")) {
    let token = sessionStorage.getItem("accessToken").split(" ")[1];
    console.log(token);
    let decoded = jwt_decode(token);
    console.log(decoded);
  }

  return <>loading...</>;
};

export default Login;
