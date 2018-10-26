var response;
var btn = document.getElementById('btn');
var currentQuestion = 0;
var correctAnswer; // Variabel som lagrar det korrekta svaret
var userCorrect = 0; // Mäter användarens korrekta svar
var trueButton = document.getElementById("trueButton");
var falseButton = document.getElementById("falseButton");

btn.addEventListener("click", function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
httpReq.open('GET', 'https://opentdb.com/api.php?amount=' + 1 + '&category=12&difficulty=easy&type=boolean');
// 1 innebär att en fråga skrivs ut i taget vid tryck på knappen
  
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
                alert("Correct!");
                console.log(userCorrect);
                userCorrect++; // Mätare ökar om användaren svarat rätt
            } else {
                alert("Sorry, that's wrong!");
            }
            if (currentQuestion === 10) { // Quiz stannar efter 10 frågor
                alert("Your result is: " + userCorrect + " out of " + currentQuestion); // Skriver ut resultat för användaren
                content.innerHTML = "Thanks for taking my quiz!";
                setInterval(function(){ location.reload(); }, 5000); // Laddar om quiz automatiskt
          }
          // Dölj knapparna efter att användaren svarat på frågan
          trueButton.style.visibility = "hidden";
          falseButton.style.visibility = "hidden";
        }

        else if (e.target.id == "falseButton") { // Eventlistener för false-knappen
            if (correctAnswer == "False") {
                alert("Correct!");
                console.log(userCorrect);
                userCorrect++;
            } else {
                alert("Sorry, that's wrong!");
              }
            if (currentQuestion === 10) {
                alert("Your result is: " + userCorrect + " out of " + currentQuestion);
                content.innerHTML = "Thanks for taking my quiz!"; 
                setInterval(function(){ location.reload(); }, 5000); // Laddar om quiz automatiskt
            }
            trueButton.style.visibility = "hidden";
            falseButton.style.visibility = "hidden";
        }
     });