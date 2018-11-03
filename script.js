var response;
var btn = document.getElementById('btn');
var currentQuestion = 0;
var numOfQuestions = 10;
var answeredQuestion = 0; // Variabel som mäter nuvarande fråga
var printAnswer = document.getElementById("printAnswer");
var correctAnswer; // Variabel som lagrar det korrekta svaret
var userCorrect = 0; // Mäter användarens korrekta svar
var trueButton = document.getElementById("trueButton");
var falseButton = document.getElementById("falseButton");

btn.addEventListener("click", function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
httpReq.open('GET', 'https://opentdb.com/api.php?amount=1&category=12&difficulty=easy&type=boolean');
  
httpReq.onreadystatechange = function() {
// Kolla om begärat kommit fram och fått svar
    if (httpReq.readyState == 4) { 
        if (httpReq.status == 200) {
            response = httpReq.response; // Tar svaret och sparar i variabel
            console.log(response);
            response.results.forEach(function(question, index) { // Skriver ut quizbehållare
                var quiz = document.createElement("div");
                correctAnswer = question.correct_answer; // Hämta de korrekta svaren och spara
                currentQuestion++; // Mätare för antalet frågor i quizet
                quiz.id = index; // Anger id till quiz
                content.appendChild(quiz);  // Det nyskapade elementet blir child till content
                // Presentera frågan för användaren
                var quizContent = ` 
                  <div id="quizContent">
                  <h2> ${question.question} </h2>
                  </div> 
                  `;
                // Behåll knapparna synliga tills dess att de trycks på
                trueButton.style.visibility = "visible";
                falseButton.style.visibility = "visible";
                printAnswer.style.visibility = "hidden";
                document.getElementById(quiz.id).innerHTML = quizContent; // Hämtar quizets id och skriver ut med egenskapen innerHTML
            });
          }
        } 
  };
  httpReq.responseType = 'json';
  httpReq.send();
  });

    content.addEventListener('click', function(e) { 
        if (e.target.id == "trueButton") { // Eventlistener för true-knappen
            if (correctAnswer == "True") {
                printAnswer.innerHTML = "Correct!";
                hideButtons();
                console.log(correctAnswer);
                userCorrect++; // Mätare ökar om användaren svarat rätt
                answeredQuestion++;
            } else {
                printAnswer.innerHTML = "Incorrect!";
                answeredQuestion++;
                hideButtons();
            }
            if (answeredQuestion === 10) { // Quiz stannar efter 10 frågor
                displayResult();
            }    
        }
            if (e.target.id == "falseButton") { // Eventlistener för false-knappen
                if (correctAnswer == "False") {
                    printAnswer.innerHTML = "Correct!";
                    hideButtons();
                    console.log(correctAnswer);
                    userCorrect++;
                    answeredQuestion++;
            }  else {
                    printAnswer.innerHTML = "Incorrect!";
                    answeredQuestion++;
                    hideButtons();
            }  
            if (answeredQuestion === 10) { // Quiz stannar efter 10 frågor
                displayResult();
            }    
        }
     });

     // Göm knapparna och visa svar när frågan är besvarad
     function hideButtons() {
        trueButton.style.visibility = "hidden";
        falseButton.style.visibility = "hidden";
        printAnswer.style.visibility = "visible";
     }

     function displayResult() {
        content.innerHTML = "Your result is: " + userCorrect + " out of " + currentQuestion;
        setInterval(function(){ location.reload(); }, 5000);
     }