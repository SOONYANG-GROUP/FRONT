const Login = () => {
  if (!sessionStorage.getItem("accessToken")) {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    window.location.replace("/");
  }

  return <>loading...</>;
};

export default Login;
