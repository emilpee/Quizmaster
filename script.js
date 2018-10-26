var response;

document.addEventListener('DOMContentLoaded', function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
  
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4) {
        if (httpReq.status == 200) {
            response = httpReq.response;
            console.log(response);
            response.results.forEach(function(question, index) {
                var quiz = document.createElement("div");
                quiz.classList.add("quizCard"); 
                quiz.id = index;
                content.appendChild(quiz); 
                var quizContent = ` 
                  <div id="quizContent">
                  <h2> ${question.question} </h2>
                  <input type="button" value="True" class="btn" id="trueButton">
                  <input type="button" value="False" class="btn" id="falseButton">
                  </div> 
                  `;
                document.getElementById(quiz.id).innerHTML = quizContent;
            });

    var numOfQuestions = response.results.length;
    var userCorrect = 0;

    // Lagra alla korrekta svar
    var correctAnswer = [];
    for (var i = 0; i <= 9; i++) {
      correctAnswer = response.results[i].correct_answer;
      console.log(correctAnswer);
    }

    content.addEventListener('click', function(e) {
        if (e.target.id == "trueButton") {
            if (correctAnswer == "True") {
                alert("Correct!");
                userCorrect++;
                e.target.parentNode.style.display = "none";
            } else if (correctAnswer == "False") {
                alert("Sorry, that's wrong!");
                e.target.parentNode.style.display = "none";   
            }
          } 
        else if (e.target.id == "falseButton") {
            if (correctAnswer == "False") {
                alert("Correct!");
                userCorrect++;
                e.target.parentNode.style.display = "none";
            } else if (correctAnswer == "True") {
                alert("Sorry, that's wrong!");
                e.target.parentNode.style.display = "none";
              }
            }
      });

    // Lägg till knapp som visar resultat
    content.appendChild(submitBtn);
    submitBtn.addEventListener('click', function() {
        alert("Your result is: " + userCorrect + " out of " + numOfQuestions);
    });
    }
  }
};

httpReq.open('GET', 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=boolean');
httpReq.responseType = 'json';
httpReq.send();
console.log(httpReq);
});