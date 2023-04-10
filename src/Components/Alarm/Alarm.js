import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACK_URL } from "../Constants/URL";

const Alarm = ({ alarmCount }) => {
  const [alarmList, setAlarmList] = useState([]);
  const [open, setOpen] = useState(false);
  const [alarmId, setAlarmId] = useState("");
  const NavItem = (props) => {
    console.log(open);
    return (
      <li style={{ listStyle: "none" }}>
        <div
          href="#"
          onClick={() => {
            setOpen(!open);
            viewAlarm();
          }}
          style={{ position: "relative", cursor: "pointer", listStyle: "none" }}
        >
          <i className="fa-sharp fa-solid fa-bell fa-2xl p-4 ">
            {alarmList.length > 0 ? (
              <>
                <div
                  className="badge"
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "15px",
                    width: "20px",
                    height: "20px",
                    fontWeight: "400",
                    borderRadius: "50%",
                    backgroundColor: "tomato",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8px",
                    fontSize: "12px",
                  }}
                >
                  {alarmCount}
                </div>
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

  const viewAlarm = useCallback(async () => {
    const res = await axios.get(`${BACK_URL}/users/alarm/list`);
    setAlarmList(res.data);
  }, []);

  const confirmAlarm = useCallback((projectId, alarmId) => {
    axios.get(`${BACK_URL}/users/alarm/confirm/${alarmId}`).then((res) => {
      console.log(res);
    });
    window.location.assign(`/project/${projectId}`);
  }, []);

  useEffect(() => {
    viewAlarm();
  }, [viewAlarm]);

  return (
    <>
      <NavItem>
        <ul
          className="border bg-secondary bg-opacity-50"
          style={{ position: "absolute", listStyle: "none", padding: 0 }}
        >
          {alarmList.map((a, index) => {
            return (
              <li
                className="mb-2 mt-1 text-start"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  confirmAlarm(a.projectId, a.alarmId);
                }}
                key={index}
              >
                {a.title}
                {a.field}
              </li>
            );
          })}
        </ul>
      </NavItem>
    </>
  );
};

export default Alarm;
