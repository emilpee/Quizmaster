
document.addEventListener('DOMContentLoaded', function() {
var content = document.getElementById("content");
var httpReq = new XMLHttpRequest();
var response;
  
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
                  <div class="quizContent">
                  <h2> ${question.question} </h2>
                  <button type="button" class="btn" id="trueButton">True</button>
                  <button type="button" class="btn" id="falseButton">False</button>
                </div> `;
               document.getElementById(quiz.id).innerHTML = quizContent;
            });


        } else {
            console.log("HTTP-status är inte 200, utan" + httpReq.status);
        }
    }
};

httpReq.open('GET', 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean');
httpReq.responseType = 'json';
httpReq.send();

});
