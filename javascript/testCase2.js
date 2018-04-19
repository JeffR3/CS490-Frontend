//START TESTCASE2

//FUNCTIONS RELATING TO getQuestions ENDPOINTS
function getQuestions(){
	var JSONNOOP={};
	JSONNOOP = wrapJson(JSONNOOP, "getQuestions");
	submitMiddle(JSONNOOP, showQuestionBank);
}
function showQuestionBank(jsonInput){
	
	var qArray=jsonInput["Questions"];
	console.log("qArray: "+qArray);
	for (var i=0; i<qArray.length; i++){
		var obj = qArray[i];
		displayQuestion(obj);
	}
}
//Do I really need this function
function displayQuestion(jsonO){
	var newDiv = document.createElement('div');
	newDiv.innerHTML= 
	"<input type='checkbox' name='questionBank[]' value='"+jsonO["questionID"]+"'>"+
	"Topic: "+jsonO["topic"]+"<br/>"+
	"Difficulty: "+jsonO["difficulty"]+"<br/>"+
	"<p>"+jsonO["content"]+"</p>"+
	"<input type='number' min='0' id='maxPoints'>";
	
	document.getElementById("questionBank").appendChild(newDiv);
	console.log("Typeof: "+typeof(jsonO));
}

//FUNCTIONS RELATING TO createExam ENDPOINT
function submitExam(){
		var filler=[];
		var tcArray=document.getElementsByName('questionBank[]');
		console.log("tcArray of submitExam(): "+tcArray);
		for (var i = 0; i<tcArray.length; i++){
			var item = tcArray[i];
			var pointsQuestion = document.getElementById('maxPoints').value;
			console.log("Item value: "+item.value);
			console.log("maxPoints: "+pointsQuestion);
			if (item.checked){
				filler.push({
					"questionID":item.value,
					"maxPoints":pointsQuestion
				});
			}
		}
		console.log("examName: "+document.getElementById('examName').value);
		console.log("examQuestions: "+filler);
		var jsonBody ={
			"examName":document.getElementById('examName').value,
			"examQuestions":filler
		};
		jsonBody=wrapJson(jsonBody, "createExam");
		submitMiddle(jsonBody, NOOP);
		alert("Exam has been added to list of Exams");
		window.location="https://web.njit.edu/~jrr28/CS490/teacher";
}
//END TESTCASE2
