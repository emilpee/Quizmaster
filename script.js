var response;
var btn = document.getElementById('btn');
var currentQuestion = 0;
var correctAnswer;
var userCorrect = 0;
var trueButton = document.getElementById("trueButton");
var falseButton = document.getElementById("falseButton");

btn.addEventListener("click", function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
httpReq.open('GET', 'https://opentdb.com/api.php?amount=' + 1 + '&category=12&difficulty=easy&type=boolean');
  
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4) {
        if (httpReq.status == 200) {
            response = httpReq.response;
            console.log(response);
            response.results.forEach(function(question, index) {
                var quiz = document.createElement("div");
                correctAnswer = question.correct_answer;
                quiz.classList.add("quizCard"); 
                currentQuestion++;
                quiz.id = index;
                content.appendChild(quiz); 
                var quizContent = ` 
                  <div id="quizContent">
                  <h2> ${question.question} </h2>
                  </div> 
                  `;
                document.getElementById(quiz.id).innerHTML = quizContent;
                trueButton.style.visibility = "visible";
                falseButton.style.visibility = "visible";
            });
          }
        }
    };
    httpReq.responseType = 'json';
    httpReq.send();
  });


    console.log(correctAnswer);

    
    content.addEventListener('click', function(e) {
        if (e.target.id == "trueButton") {
            if (correctAnswer == "True") {
                alert("Correct!");
                console.log(userCorrect);
                userCorrect++;
            } else {
                alert("Sorry, that's wrong!");
            }
            if (currentQuestion === 10) {
                alert("Your result is: " + userCorrect + " out of " + currentQuestion);
                content.innerHTML = "Thanks for taking my quiz!";
                setInterval(function(){ location.reload(); }, 5000);
          }
          trueButton.style.visibility = "hidden";
          falseButton.style.visibility = "hidden";
        }

    else if (e.target.id == "falseButton") {
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
                setInterval(function(){ location.reload(); }, 5000);
            }
            trueButton.style.visibility = "hidden";
            falseButton.style.visibility = "hidden";
        }
     });