import axios from "axios";
import { useState, useEffect } from "react";

const AptitudeTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGPT, setLoadingGPT] = useState(false);
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
    fetch();
  }, [loadingGPT]);

  const onClickBtn = async (e) => {
    e.preventDefault();
    setLoadingGPT(true);
    const callGPT = async () => {
      await axios
        .post("http://localhost:8081/teststart")
        .then((res) => {
          setLoadingGPT(false);
          console.log(res);
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
        <div>
          개발자 적성 테스트 입니다. 간단한 테스트를 통해 어떤 분야의 개발자가
          적성에 맞는지 테스트를 합니다!
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            예
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            아니오
          </label>
        </div>
        {loadingGPT ? (
          <>LoadingGPT</>
        ) : (
          <div className="btn btn-primary" onClick={onClickBtn}>
            GPT
          </div>
        )}
      </>
    );
  }
};

export default AptitudeTest;
