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
    console.log(profile);
    return (
      <>
        <div class="card col-md-6 mb-3 mx-auto position-relative">
          <img
            src={backgroundImg}
            class="card-img-top"
            alt="..."
            style={{ height: "12rem" }}
          />
          <img
            src="https://media.licdn.com/dms/image/C4E03AQHx5UwslFTP9g/profile-displayphoto-shrink_800_800/0/1516305818135?e=2147483647&v=beta&t=8ZUNRLMaagGdK5o3p3wmgPoZL3JgCQc6oTmydGTLODQ"
            class="rounded-circle position-absolute top-50 start-50 translate-middle"
            style={{ width: "120px", border: "2px solid white" }}
          />
          <div class="card-body">
            <h5 class="card-title">{profile[0].name}</h5>
            <p class="card-text">{profile[0].introduce}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>

        <div class="card col-md-6 mb-3 mx-auto">
          <div class="container px-5">
            <div class="text-uppercase-expanded small mb-2 pt-5">
              <h4>정보</h4>
            </div>
            <hr class="mt-0 mb-3 mt-3 " />
            <div class="row gx-5 mb-3 mt-3">
              <div class="col-lg-8">
                <div class="support-fields">{profile[0].info}</div>
              </div>

              <div class="col-lg-4 text-lg-end">
                <div class="text-gray-400 small">May 2018 - Present</div>
              </div>
            </div>
            <div class="text-uppercase-expanded small mb-2 pt-5">
              <h4>로그</h4>
            </div>
            <hr class="mt-0 mb-3 mt-3 " />
            <div class="row gx-5 mb-3 mt-3">
              <div class="col-lg-8">
                {profile[0].logs.map((p) => {
                  return (
                    <>
                      {p.title} {p.field} {p.discription}
                    </>
                  );
                })}
              </div>
              <div class="col-lg-4 text-lg-end">
                <div class="text-gray-400 small">August 2015 - May 2018</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
