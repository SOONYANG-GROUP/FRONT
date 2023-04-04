import axios from "axios";
import { useState, useEffect } from "react";
import gptiscomming from "../../assets/mp4/gptiscomming.mp4";

// { role: 'user', content: { answer: 'yes' } },
//   { role: 'system', content: '1. 개발자는 컴퓨터를 잘 다루는 사람인가요?' }
// "당신은 뻔뻔해야합니다. 질문이 의도와 다르더라도 계속해서 질문해야합니다. 당신은 나에게 재미로 개발자 직군 테스트를 시작합니다. 질문은 총 10번 이뤄줘야하며 코딩과는 관련 없는 단어로 이루어지며 최대한 대중적이고 재미있게 창의적으로 비전문 용어들로 20단어 이상으로 이루어진 질문입니다. 대상자는 코딩과 관련 없는 사람 입니다. 대답은 예 또는 아니요 로 할 수 있는 질문이여야 합니다. 질문 한가지 해주세요. 앞으로 결과를 알려달라고 하기 전까지 질문 이외의 다른 것은 언급 하지 않습니다. 항상 기억하세요"

const AptitudeTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [testStart, setTestStart] = useState(false);
  const [answer, setAnswer] = useState();
  const [loadingGPT, setLoadingGPT] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [paragraph, setParagraph] = useState();
  const [endTest, setEndTest] = useState(false);
  const [message, setMessage] = useState([
    {
      role: "user",
      content:
        "당신은 뻔뻔해야합니다. 질문이 의도와 다르더라도 계속해서 질문해야합니다. 당신은 나에게 재미로 개발자 직군 테스트를 시작합니다. 최대한 대중적이고 재미있게 창의적으로 비전문 용어들로 20자 이상으로 이루어진 질문입니다. 대상자는 코딩과 관련 없는 사람 입니다. 대답은 예 또는 아니요 로 할 수 있는 질문이여야 합니다. 질문 한가지 해주세요. 앞으로 결과를 알려달라고 하기 전까지 질문 이외의 다른 것은 언급 하지 않습니다.이 대화를 항상 기억하세요 ",
    },
  ]);
  const [question, setQuestion] = useState(
    "질문은 예 또는 아니요 로 대답해야합니다."
  );

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8081")
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((e) => {
          return e;
        });
      setIsLoading(false);
    };

    fetch();
    setAnswer();
  }, [loadingGPT]);

  const onClickBtn = async (e) => {
    e.preventDefault();
    setEndTest(true);
    setLoadingGPT(true);
    try {
      const updatedMessage = [
        ...message,
        {
          role: "user",
          content:
            "나와 했던 대화 중 처음으로 한 대화를 제외한 대화를 토대로 추천하는 개발자 직군과 이유를 알려줘.어떻게든 연관 시켜서. 100자 이내로",
        },
      ];

      if (!updatedMessage || updatedMessage.length === 0) {
        throw new Error("Message is empty or null");
      }

      const response = await axios.post(
        "http://localhost:8081/teststart",
        updatedMessage
      );
      setLoadingGPT(false);
      setQuestion(response.data[response.data.length - 1].content);
      const sentences = question.split(". ");
      const paragraph = sentences.join(".<br>");
      setSentences(sentences);
      setParagraph(paragraph);
    } catch (error) {
      console.error(error);
      setLoadingGPT(false);
      // Handle specific error case for empty or null message
      if (error.message === "Message is empty or null") {
        // Display error message to user
      }
      // Handle other error cases
    }
  };

  const submitButton = async (e) => {
    const updatedMessage = [
      ...message,
      {
        role: "user",
        content: answer,
      },
    ];
    setMessage(updatedMessage);
    const sendPostRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8081/teststart",
          updatedMessage
        );
        console.log(res.data[res.data.length - 1].content);
        setQuestion(res.data[res.data.length - 1].content);
        setMessage(res.data);
        setLoadingGPT(false);
      } catch (e) {
        console.error(e);
      }
    };

    e.preventDefault();
    setLoadingGPT(true);
    console.log(updatedMessage);

    sendPostRequest();
  };

  const startBtn = async () => {
    setLoadingGPT(true);
    try {
      const res = await axios.post("http://localhost:8081/teststart", message);
      console.log(res.data[res.data.length - 1].content);
      setQuestion(res.data[res.data.length - 1].content);
      setMessage(res.data);
      setLoadingGPT(false);
    } catch (e) {
      console.error(e);
    }
    return setTestStart(true);
  };

  const onChangeInput = async (e) => {
    await setAnswer(`${e.target.value}, 다음 질문 해주세요.`);

    console.log(message);
  };

  if (isLoading) {
    return <>Loading....</>;
  } else {
    return (
      <>
        {loadingGPT ? (
          <video muted autoPlay loop style={{ width: "100%", height: "100%" }}>
            <source src={gptiscomming} type="video/mp4" />
          </video>
        ) : (
          <>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                color: "black",
                padding: "20px",
                width: "80%",
                maxWidth: "1000px",
                margin: "0 auto",
                justifyContent: "center",
              }}
            >
              {testStart ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="container  rounded-pill p-5">
                    <div className="col-md-10 mx-auto text-center">
                      <h2 className="mb-5">{question}</h2>
                      {endTest ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="예"
                              onChange={onChangeInput}
                              style={{ width: "1.5em", height: "1.5em" }}
                            />
                            <label
                              className="form-check-label ml-3"
                              htmlFor="inlineRadio1"
                            >
                              <h3>예</h3>
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="아니요"
                              onChange={onChangeInput}
                              style={{ width: "1.5em", height: "1.5em" }}
                            />
                            <label
                              className="form-check-label ml-3"
                              htmlFor="inlineRadio2"
                            >
                              <h3>아니요</h3>
                            </label>
                          </div>
                          {answer ? (
                            <div className="mt-5">
                              <button
                                className="btn btn-primary px-4 py-3"
                                onClick={submitButton}
                              >
                                다음
                              </button>
                            </div>
                          ) : null}
                        </>
                      )}

                      <div className="mt-4">
                        {endTest ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                window.location.reload();
                              }}
                            >
                              다시 하기
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={onClickBtn}
                            >
                              그만하고 결과 보기
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <div className="container  rounded-pill p-5">
                    <div className="col-md-8 mx-auto text-center">
                      <h3 className="mb-5">
                        개발자 직군 테스트를 하시겠습니까?
                      </h3>
                      <button
                        className="btn btn-primary btn-lg px-5 py-3"
                        onClick={startBtn}
                      >
                        시작하기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
};

export default AptitudeTest;
