import axios from "axios";

const UpdateProjectsStatus = () => {
  const updateBtn = async () => {
    try {
      const res = await axios.get("http://localhost:8080/projects/set");
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
