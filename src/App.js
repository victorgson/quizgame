import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  var [question, setQuestion] = useState();
  var [answer, setAnswer] = useState();
  var [loaded, setLoaded] = useState(false);

  function postAnswer(answer) {
    axios
      .post(`https://localhost:7013/api/v1/TriviaQuiz/${question.id}-${answer}`)
      .then((resp) => {
        setAnswer(resp.data);
        console.log(resp.data);
      });
  }

  function getNewQuestion() {
    axios.get("https://localhost:7013/api/v1/TriviaQuiz").then((resp) => {
      setQuestion(resp.data);
      console.log(resp.data);
      setAnswer("");
    });
  }
  useEffect(() => {
    getNewQuestion();
  }, []);

  if (question != null) {
    return (
      <div className="App">
        {
          <div className="content">
            <h1> {question.questionString} </h1>

            <ul className="buttons">
              {question.answers.map((a, index) => (
                <button key={index} onClick={() => postAnswer(a)}>
                  {a}
                </button>
              ))}
            </ul>
            <h1> {answer} </h1>
            <button onClick={() => getNewQuestion()}> Next question </button>
          </div>
        }
      </div>
    );
  } else {
    return <div className="App">{<h1> Loading </h1>}</div>;
  }
}

export default App;
