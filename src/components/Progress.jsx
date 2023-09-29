import React from "react";

const Progress = ({ index, totalQuestion, points, maxPoints, answer }) => {
  return (
    <header className="progress">
      <progress
        max={totalQuestion}
        value={index + Number(answer !== undefined)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestion}
      </p>
      <p>
        <strong>{points && points}</strong> / {maxPoints}
      </p>
    </header>
  );
};

export default Progress;
