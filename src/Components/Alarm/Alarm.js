import axios from "axios";
import { useState } from "react";
import { BACK_URL } from "../Constants/URL";

const Alarm = ({ alarmCount }) => {
  const [alarmList, setAlarmList] = useState([]);
  const [open, setOpen] = useState(false);
  const [alarmId, setAlarmId] = useState("");
  const NavItem = (props) => {
    console.log(open);
    return (
      <li>
        <div
          href="#"
          onClick={() => {
            setOpen(!open);
            viewAlarm();
          }}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <i className="fa-sharp fa-solid fa-bell fa-2xl p-4 ">
            {alarmList.length > 0 ? (
              <>
                {" "}
                <span
                  className="badge"
                  style={{
                    position: "absolute",
                    top: "1px",
                    width: "10px",
                    height: "10px",
                    fontWeight: "400",
                    borderRadius: "30px",
                    backgroundColor: "tomato",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  {alarmCount}
                </span>
              </>
            ) : (
              <></>
            )}
          </i>
        </div>
        {open && props.children}
      </li>
    );
  };
  const viewAlarm = async () => {
    await axios.get(`${BACK_URL}/users/alarm/list`).then((res) => {
      setAlarmList(res.data);
      setAlarmId(res.data.alarmId);
      console.log(res);
    });
  };

  const confirmAlarm = (projectId, alarmId) => {
    const fetch = async () => {
      await axios
        .get(`${BACK_URL}/users/alarm/confirm/${alarmId}`)
        .then((res) => {
          console.log(res);
          return res;
        });
    };
    window.location.assign(`/project/${projectId}`);
    fetch();
  };

  return (
    <>
      <NavItem>
        <ul
          className="border bg-secondary bg-opacity-50"
          style={{ position: "absolute" }}
        >
          {alarmList.map((a, index) => {
            return (
              <>
                <li
                  className="mb-2 mt-1 text-start"
                  style={{ listStyle: "none", cursor: "pointer" }}
                  onClick={() => {
                    confirmAlarm(a.projectId, a.alarmId);
                  }}
                  key={index}
                >
                  {a.title}
                  {a.field}
                </li>
              </>
            );
          })}
        </ul>
      </NavItem>
    </>
  );
};

export default Alarm;
