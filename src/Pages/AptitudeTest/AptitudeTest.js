import axios from "axios";
import { useState, useEffect } from "react";

const AptitudeTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGPT, setLoadingGPT] = useState(false);
  const [message, setMessage] = useState(
    "개발자 적성 테스트를 시작하시겠습니까?"
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8081")
        .then((res) => {
          console.log(res.data);
          return res;
        })
        .catch((e) => {
          return e;
        });
      setIsLoading(false);
    };
    setCount(count + 1);
    fetch();
    console.log(count);
    if (count === 10) {
    }
  }, [loadingGPT]);

  const onClickBtn = async (e) => {
    e.preventDefault();
    setLoadingGPT(true);
    const callGPT = async () => {
      await axios
        .post(
          "http://localhost:8081/teststart",
          "질문을 그만하고 추천하는 개발자 직군과 이유를 말해줘"
        )
        .then((res) => {
          setLoadingGPT(false);
          setMessage(res.data.message);
          return res;
        })
        .catch((e) => {
          return e;
        });
    };
    callGPT();
  };

  const submitButtonYes = async (e) => {
    e.preventDefault();
    setLoadingGPT(true);
    const callGPT = async () => {
      await axios
        .post("http://localhost:8081/teststart", { answer: "yes" })
        .then((res) => {
          setLoadingGPT(false);
          setMessage(res.data.message);
          return res;
        })
        .catch((e) => {
          return e;
        });
    };
    callGPT();
  };
  const submitButtonNo = async (e) => {
    e.preventDefault();
    setLoadingGPT(true);
    const callGPT = async () => {
      await axios
        .post("http://localhost:8081/teststart", { answer: "no" }) // send the "no" value in the request body as a JSON object
        .then((res) => {
          setLoadingGPT(false);
          setMessage(res.data.message);
          return res;
        })
        .catch((e) => {
          return e;
        });
    };
    callGPT();
  };

  if (isLoading) {
    return <>Loading....</>;
  } else {
    return (
      <>
        {!loadingGPT ? (
          <>
            <div>{message}</div>
            <button className="btn btn-primary" onClick={submitButtonYes}>
              예
            </button>
            <button className="btn btn-primary" onClick={submitButtonNo}>
              아니오
            </button>
          </>
        ) : (
          <>GPT가 질문을 작성중입니다.</>
        )}

        <br />
        <br />
        <br />

        {loadingGPT ? (
          <>LoadingGPT</>
        ) : (
          <div className="btn btn-primary" onClick={onClickBtn}>
            결과 보기
          </div>
        )}
      </>
    );
  }
};

export default AptitudeTest;
