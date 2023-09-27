import { useEffect, useReducer } from "react";
import Header from "./components/Header";

const initialState = {
  questions: [],
  status: "loading",
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

    default:
      throw new Error("Error ( No Action Find )");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecevied", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />
      </div>
    </>
  );
}

export default App;
