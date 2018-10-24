var response;

document.addEventListener('DOMContentLoaded', function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
  
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4) {
        if (httpReq.status == 200) {
            console.log(httpReq.response);
            response = httpReq.response;
            //content.innerHTML = response.results[5].question;
            response.results.forEach(function(question, index) {
                let quiz = document.createElement("div");
                quiz.classList.add("quizCard"); 
                quiz.id = index;
                content.appendChild(quiz); 
                var quizContent = ` 
                  <div id="quizContent">
                  <h2> ${question.question} </h2>
                  <p class="correct"><strong>Correct answer: ${question.correct_answer} </strong></p>
                  <input type="button" class="btn" value="True" id="trueButton">
                  <input type="button" class="btn" value="False" id="falseButton">
                </div> `;
               document.getElementById(quiz.id).innerHTML = quizContent;
            });

    var btn = document.getElementsByClassName('btn'); 
    var printCorrect = document.getElementsByTagName('p'); 
    var trueButton = document.getElementById('trueButton');
    // var falseButton = document.getElementById('falseButton');
    quizContent = document.getElementById('quizContent');
    var numOfQuestions = response.results.length;
    
    var answers = []; // array som lagrar användarens svar
    var currentQ = 0; // visar nuvarande fråga

    // Lagra alla korrekta svar
    var correctAnswer = response.results[currentQ].correct_answer;
    for (var i = 0; i <= 9; i++) {
      console.log(correctAnswer);
      correctAnswer = response.results[i].correct_answer;



    if (btn === correctAnswer) {
        alert("Correct!");
        correctAnswer++;
        currentQ++;
    } else {
        currentQ++;
    }

    }

    // if (true == correct_answer) {answers.push();} 
    // else if (true == incorrect_answers) {do not push.}
    content.addEventListener('click', function(e) {
        if (btn) {
            for (var x = 0; x < printCorrect.length; x++) {
              printCorrect[x].classList.remove('correct');
            }
        } 
    }); 

    // Lägg till knapp som visar resultat
    content.appendChild(submitBtn);
    submitBtn.addEventListener('click', function() {
        alert(correctAnswer + ' out of ' + numOfQuestions);
    });
}
}
};


httpReq.open('GET', 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean');
httpReq.responseType = 'json';
httpReq.send();
console.log(httpReq);
});