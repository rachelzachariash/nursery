import React from "react";
import { useState, useEffect } from "react";
import { FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";
import "./questions.css";
import emailjs from 'emailjs-com';

function QuestionsAnswers() {
  const questionSend = { id: 0, questions: "", Answers: "", email: "" };

  const [listOfQuestionsAnswers, setListOfQuestionsAnswers] = useState([]);
  useEffect(() => {
    debugger;
    
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("http://localhost:3000/QuestionsAnswers", requestOptions)
  .then(response => response.text())
  .then(result => {
    debugger;
    setListOfQuestionsAnswers(JSON.parse(result));
    console.log(result)})
  .catch(error => console.log('error', error));
},[])


  const [show, setShow] = useState(false);
  const [questionsText, setQuestionsText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [send, setSend] = useState(false);
  const [notGoodDetails, setNotGoodDetails] = useState(false);

  function qustionEmtey() {
    setNotGoodDetails(true);
    alert("יש להזין את השאלה");
  }

  function inputEmail(event) {
    setEmailText(event);
  }

  function inputQuestions(event) {
    setQuestionsText(event);
  }

  function checksEmail(email) {
    const at = email.lastIndexOf("@");
    if (at === -1) {
      return false;
    }
    return true;
  }

  function notGoodEmail() {
    setNotGoodDetails(true);
    alert("יש להזין כתובת מייל חוקית");
  }

  function sendQuestion() {
    if (questionsText === "" || !checksEmail(emailText)) {
      questionsText === "" ? qustionEmtey() : notGoodEmail();
      return;
    }
    setNotGoodDetails(false);
    setSend(true);
    const lenOfListQustions = listOfQuestionsAnswers.length + 1;
    questionSend.id = lenOfListQustions;
    questionSend.questions = questionsText;
    questionSend.email = emailText;
    addUser(questionSend);
  }

  const addUser = async (date) => {
    await fetch("http://localhost:3000/QuestionsAnswers", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
  });
  };

  function notKnow() {
    setNotGoodDetails(true);
  }

  function getquetion() {
    if (notGoodDetails) {
      return
    }
    setQuestionsText('');
    setEmailText('');
    setSend(false);
  }

  return (
    <>
      <h1 className="title">שאלות נפוצות</h1>
      {console.log(listOfQuestionsAnswers),
      listOfQuestionsAnswers.map((QuestionsAnswers) => (
        <div>
          {QuestionsAnswers.Answers !== "" && (
            <p className="pAll">
              <p className="pqa">
                <FaQuestionCircle />{" "}
              </p>
              {QuestionsAnswers.questions}
              <p className="pqa">
                <FaExclamationCircle />
              </p>{" "}
              {QuestionsAnswers.Answers}
            </p>
          )}
        </div>
      ))}
      <button
        onClick={getquetion}
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        הוסף שאלה
            </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                השאלה שלך:
                            </h5>
            </div>
            {!send && <div class="modal-body">
              <textarea
                onChange={(event) =>
                  inputQuestions(event.target.value)
                }
                name="remarks"
                rows="3"
                className="Text"
              />
              <label for="email">הכנס כתובת אימייל:</label>
              <input
                onChange={(event) =>
                  inputEmail(event.target.value)
                }
                type="email"
                id="email"
                name="email"
              ></input>
            </div>}
            <div class="modal-footer">
              <button
                type="button"
                onClick={sendQuestion}
                class="btnsendques"
                data-dismiss="modal"
                aria-label="Close"
              >
                שלח
                            </button>
              <button
                onClick={notKnow}
                type="button"
                class="btnnotnow"
                data-dismiss="modal"
              >
                לא עכשיו
                            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionsAnswers;
