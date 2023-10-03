import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedQuiz from "./components/FinishedQuiz";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    // Data Recevied Check
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    // Data Failed Check
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    // Start Quiz
    case "start":
      return {
        ...state,
        status: "active",
      };
    // answer
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    // next button to move on next question
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: undefined,
      };
    // Finished
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    // final State

    default:
      throw new Error("Error ( No Action Find )");
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecevied", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <>
      <div className="app">
        <Header />

        {/* <h5>{points > 0 ? points : ""}</h5> */}

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              totalQuestion={questions.length}
              onClick={() => dispatch({ type: "start" })}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                maxPoints={maxPoints}
                points={points}
                index={index}
                totalQuestion={questions.length}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={questions.length}
              />
            </>
          )}

          {status === "finished" && (
            <FinishedQuiz
              points={points}
              maxPossiblePoints={maxPoints}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
