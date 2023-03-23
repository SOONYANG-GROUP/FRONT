import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProfileDummyData from "../../DummyData/Profile.json";
import backgroundImg from "../../assets/images/BackGround.png";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = () => {
      const profileData = ProfileDummyData.profiles;
      setProfile(profileData);
      setIsLoading(false);
    };
    getProfile();
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
            src="https://media.licdn.com/dms/image/C4E03AQHx5UwslFTP9g/profile-displayphoto-shrink_800_800/0/1516305818135?e=2147483647&v=beta&t=8ZUNRLMaagGdK5o3p3wmgPoZL3JgCQc6oTmydGTLODQ"
            className="rounded-circle position-absolute top-50 start-50 translate-middle"
            style={{ width: "120px", border: "2px solid white" }}
          />
          <div className="card-body">
            <h5 className="card-title">{profile[0].name}</h5>
            <p className="card-text">{profile[0].introduce}</p>
          </div>
        </div>

        <div className="col-md-6 mb-3 mx-auto">
          <div className="container px-5">
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4><i className="fa-sharp fa-solid fa-address-card"></i> 정보</h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            <div className="row gx-5 mb-3 mt-3">
              <div className="col-lg-8">
                <div className="support-fields">{profile[0].info}</div>
              </div>
            </div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4><i className="fa-brands fa-stack-overflow"></i> 로그</h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            {profile[0].logs.map((log, index) => {
              return(
                <div className="card card-body mb-3">
                  <span><i className="fa-solid fa-terminal"></i> {log.title} | {log.field} | {log.description}</span>
                </div>
              )
            })}
            
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
