var response;
var btn = document.getElementById('btn');
var currentQuestion = 0;
var correctAnswer;
var userCorrect = 0;

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

    trueButton.addEventListener('click', function() {
            if (correctAnswer == "True") {
                alert("Correct!");
                console.log(userCorrect);
                userCorrect++;
            } else {
                alert("Sorry, that's wrong!");
            }
            if (currentQuestion === 10) {
                alert("Correct Answers: " + userCorrect + " out of " + currentQuestion);
                location.reload();
          }
          trueButton.style.visibility = "hidden";
          falseButton.style.visibility = "hidden";
    }); 

    falseButton.addEventListener('click', function() {
            if (correctAnswer == "False") {
                alert("Correct!");
                console.log(userCorrect);
                userCorrect++;
            } else {
                alert("Sorry, that's wrong!");
              }
            if (currentQuestion === 10) {
                alert("Correct Answers: " + userCorrect + " out of " + currentQuestion);
                location.reload();
            }
            trueButton.style.visibility = "hidden";
            falseButton.style.visibility = "hidden";
        });