import axios from "axios";
import { BACK_URL } from "../Components/Constants/URL";

const UpdateProjectsStatus = () => {
  const updateBtn = async () => {
    try {
      const res = await axios.get(`${BACK_URL}/projects/set`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={updateBtn}>
        프로젝트 업데이트 버튼
      </button>
    </>
  );
};

export default UpdateProjectsStatus;
