
document.addEventListener('DOMContentLoaded', function() {
document.getElementById("content");
var httpReq = new XMLHttpRequest();
var response;
  
httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4) {
        if (httpReq.status == 200) {
            console.log(httpReq.response);
            response = httpReq.response;
            content.innerHTML = response.results[5].question;
        } else {
            console.log("HTTP-status är inte 200, utan" + httpReq.status);
        }
    }
};

httpReq.open('GET', 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean');
httpReq.responseType = 'json';
httpReq.send();

});
