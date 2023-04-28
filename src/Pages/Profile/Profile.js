import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProfileDummyData from "../../DummyData/Profile.json";
import backgroundImg from "../../assets/images/BackGround.png";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useParams } from "react-router-dom";
import { BACK_URL } from "../../Components/Constants/URL";

const Profile = ({ isLoggedIn }) => {
  const [userId, setUserid] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [alarmStatus, setAlarmStatus] = useState();
  const [recruitingProjects, setRecruitingProject] = useState([]);
  const [runningProjects, setRunningProjects] = useState([]);
  const [endProjects, setEndProjects] = useState([]);
  const [projects, setPorjcts] = useState([]);
  const [ProfileEmail, setProfileEmail] = useState();
  const [jwtEmail, setjwtEmail] = useState();
  const [participatedUserId, setParticipatedUserId] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      let token = sessionStorage.getItem("accessToken").split(" ")[1];
      // console.log(token);
      let decoded = jwt_decode(token);
      setjwtEmail(decoded.email);
    }
    const fetch = async () => {
      if (id) {
        await axios
          .get(`${BACK_URL}/users/profile/${id}`)
          .then((res) => {
            console.log(res);
            setProfile(res.data);
            setUserid(res.data.id);
            setIsLoading(false);
            setPorjcts(res.data.projectGroupDtos);
            setProfileEmail(res.data.email);
            return res;
          })
          .catch((e) => {
            return e;
          });
      } else {
        await axios
          .get(`${BACK_URL}/users/profile`)
          .then((res) => {
            console.log(res.data);
            setProfile(res.data);
            setUserid(res.data.id);
            setIsLoading(false);
            setPorjcts(res.data.projectGroupDtos);
            return res;
          })
          .catch((e) => {
            return e;
          });
      }
    };

    const getProfile = () => {
      const profileData = ProfileDummyData.profiles;
      // setProfile(profileData);l
      // setIsLoading(false);
    };
    getProfile();
    fetch();
  }, []);
  const categorizeProjects = () => {
    setRecruitingProject(
      projects?.filter((item) => item.status === "READY") || []
    );
    setRunningProjects(
      projects?.filter((item) => item.status === "RUNNING") || []
    );
    setEndProjects(projects?.filter((item) => item.status === "END") || []);
  };

  useEffect(() => {
    categorizeProjects();
  }, [projects]);

  const editProfile = () => {
    window.location.assign("/editProfile");
    return;
  };
  const setAlarm = async () => {
    try {
      axios.get(`${BACK_URL}/users/alarm/setting`).then((res) => {
        setAlarmStatus(res.data);
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const cancelApplication = (id) => {
    console.log(id);
    axios.get(`${BACK_URL}/projects/${id}/cancel`);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    // console.log(jwtEmail == ProfileEmail);
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
            src="https://cdn-icons-png.flaticon.com/512/25/25657.png"
            className="rounded-circle position-absolute top-50 start-50 translate-middle"
            style={{
              width: "120px",
              height: "120px",
              border: "2px solid white",
              backgroundSize: "cover",
            }}
          />
          <div className="card-body">
            <h3 className="card-title text-center fw-bold">{profile.name}</h3>
            <p className="card-text text-center text-muted"></p>
          </div>
        </div>

        <div className="col-md-6 mb-3 mx-auto">
          <button className="btn" onClick={editProfile}>
            편집하기
          </button>
          <button className="btn" onClick={setAlarm}>
            {alarmStatus ? <>알림 취소하기</> : <>알림 받기</>}
          </button>
          <div className="container px-5">
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4>
                <i className="fa-sharp fa-solid fa-address-card"></i> 정보
              </h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            <div className="row gx-5 mb-3 mt-3">
              <div className="col-lg-8">
                <div className="support-fields">{profile.detailField}</div>
              </div>
            </div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
              <h4>
                <i className="fa-brands fa-stack-overflow"></i> 로그
              </h4>
            </div>
            <hr className="mt-0 mb-3 mt-3 " />
            {jwtEmail == ProfileEmail ? (
              <>
                참가 신청한 프로젝트
                {recruitingProjects.map((log, index) => {
                  return (
                    <div className="card card-body mb-3" key={index}>
                      <span className="d-flex justify-content-between">
                        <div
                          onClick={() => {
                            window.location.assign(`/project/${log.id}`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-terminal"></i> {log.title} |
                          {log.field} | {log.description}
                        </div>
                        <button
                          onClick={() => {
                            cancelApplication(log.id);
                          }}
                        >
                          신청 취소
                        </button>
                      </span>
                    </div>
                  );
                })}
                <hr className="mt-0 mb-3 mt-3 " />
              </>
            ) : (
              <></>
            )}
            {runningProjects.length > 0 ? (
              <>
                진행중인프로젝트
                {runningProjects.map((log, index) => {
                  const showTimeLines = async () => {
                    console.log(log.participateUsersId);

                    await axios
                      .get(
                        `${BACK_URL}/users/profile/${log.id}/${log.participateUsersId}`
                      )
                      .then((res) => {
                        console.log(res.data);
                      });
                  };
                  return (
                    <div
                      className="card card-body mb-3"
                      key={index}
                      onClick={showTimeLines}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <i className="fa-solid fa-terminal"></i> {log.title}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            <hr className="mt-0 mb-3 mt-3 " />
            완료된 프로젝트
            {endProjects.map((log, index) => {
              return (
                <div
                  className="card card-body mb-3"
                  key={index}
                  onClick={() => {
                    window.location.assign(`/project/${log.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span>
                    <i className="fa-solid fa-terminal"></i> {log.title}
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
