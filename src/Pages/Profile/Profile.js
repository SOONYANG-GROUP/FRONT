import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProfileDummyData from "../../DummyData/Profile.json";
import backgroundImg from "../../assets/images/BackGround.png";
import axios from "axios";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await axios.get("http://localhost:8080/profile").then((res) => {
        console.log(res.data);
        return res;
      });
    };

    const getProfile = () => {
      const profileData = ProfileDummyData.profiles;
      setProfile(profileData);
      setIsLoading(false);
    };
    getProfile();

    fetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="card col-md-6 mb-3 mx-auto position-relative">
          <img
            src={backgroundImg}
            className="card-img-top"
            alt="..."
            style={{ height: "12rem" }}
          />
          <img
            src="https://fs.jtbc.co.kr/prog/drama/rebornrich/Img/site/ProgInfo/202211100323537197.jpg"
            className="rounded-circle position-absolute top-50 start-50 translate-middle"
            style={{
              width: "120px",
              height: "120px",
              border: "2px solid white",
              backgroundSize: "cover",
            }}
          />
          <div className="card-body">
            <h3 className="card-title text-center fw-bold">
              {profile[0].name}
            </h3>
            <p className="card-text text-center text-muted">
              {profile[0].introduce}
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-3 mx-auto">
          <div className="container px-5">
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4>
                <i className="fa-sharp fa-solid fa-address-card"></i> 정보
              </h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            <div className="row gx-5 mb-3 mt-3">
              <div className="col-lg-8">
                <div className="support-fields">{profile[0].info}</div>
              </div>
            </div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4>
                <i className="fa-brands fa-stack-overflow"></i> 로그
              </h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            {profile[0].logs.map((log, index) => {
              return (
                <div className="card card-body mb-3">
                  <span>
                    <i className="fa-solid fa-terminal"></i> {log.title} |{" "}
                    {log.field} | {log.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
