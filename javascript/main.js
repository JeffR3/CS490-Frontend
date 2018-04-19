//Page can't be manipulated safely until the document is ready
document.addEventListener("DOMContentLoaded", function(){
	console.log("Execution of DOMContentLoaded");
});
function login(){
	var loginJson ={
		"username":document.getElementById('uname').value,
		"password":document.getElementById('password').value
	};
	loginJson=wrapJson(loginJson, "login");
	
	sessionStorage.setItem("ID", document.getElementById('uname').value);
	console.log(sessionStorage.getItem)
	submitMiddle(loginJson, checkLogin);

}
//login Javascript
function checkLogin(jsonInput){
	if (jsonInput["Success"]){	
		sessionStorage.setItem("ID", jsonInput["ID"]);
		if(jsonInput["Instructor"]){
			window.location="https://web.njit.edu/~jrr28/CS490/teacher/";
		}else{
			window.location="https://web.njit.edu/~jrr28/CS490/student/";
		}
	}else{
		alert("Login failed");
	}

}
//Optional
//Check if the inputs elements not empty
function isFormValid(){
	var elements = document.getElementsByTagName("input");
	for (var i = 0; i<elements.length; i++){
		if (elements[i].value == ""){
			return false;
		}
	}
	return true;
}
//START TESTCASE1
function createQuestion() {
	console.log("Username: "+sessionStorage.getItem('ID'));
	
	var testCaseArray=[];
	fillArray(testCaseArray);
	
	//Check Test Cases
	var questionJsonO={
		"topic":document.getElementById('topic').value,
		"difficulty":document.getElementById('difficulty').value,
		"functionName": document.getElementById('functionName').value,
		"content" : document.getElementById('content').value,
		"testCases" : testCaseArray
	};
	
	console.log("Json Object: " + JSON.stringify(questionJsonO));
	console.log("Typeof JsonO: "+typeof(questionJsonO));
	
	questionJsonO = wrapJson(questionJsonO, "addQuestions");	
	
	console.log("JsonWrapper Object: " + questionJsonO);
	
	submitMiddle(questionJsonO, NOOP);
	alert("Question has been Added to Question Bank");
	window.location="https://web.njit.edu/~jrr28/CS490/teacher/";
	
}

//Adding of arguments in each indepedent test case
//createQuestions Javascript
var argCounter =1;
function addArgs() {
	var newDiv = document.createElement('div');
	
	newDiv.innerHTML=
	"<br>"+
	"Argument <input type='text' name='args[]' id='"+(argCounter)+"'>";
	
	document.getElementById("testCaseExample").appendChild(newDiv);
	
	argCounter+=1;
	
	console.log("Argument "+argCounter+" added.");
	var tcArray=document.getElementsByName('args[]')
	for (var i =0; i<tcArray.length; i++){
		var item = tcArray[i];
		console.log("Arg item: "+item.value);
	}
}
//createQuestion Javascript
//Add another test case beside original
var tcCounter = 1;	//Need to exist outside of function for call
var tcLimit = 1;	//Changeable but wants 5 test case max
function createTestCase(divName) {
	if(tcCounter == tcLimit){
		alert("Test cases limited to "+ tcLimit);
	}else{
		var newDiv = document.createElement('div');
		newDiv.innerHTML="Test Case Example "+ (tcCounter+1) + 
		"<br><input type='text' name='testCases[]' id='"+(tcCounter+1)+"'>";
		document.getElementById("testCaseField").appendChild(newDiv);
		tcCounter+=1;
		console.log("Test Case "+tcCounter+" added.");
		var tcArray=document.getElementsByName('testCases[]')
		for (var i = 0; i<tcArray.length; i++){
			var item = tcArray[i];
			console.log("Test Item: "+item.value);
		}
	}
}
//createQuestion Javascript
function fillArray(storeArray){
	var tcArray= document.getElementsByName('testCases[]');
	//console.log("tcArray Length: "+tcArray.length);
	//console.log("tcArray type: "+typeof(tcArray[0].value));
		
	for (var i=0; i<tcArray.length; i++){
		var output = tcArray[i].value;
		console.log("tcArray item: "+ output);
		//storeArray.push(output);
		var argsArray= document.getElementsByName('args[]');
		var paramsArray = [];
		for (var j=0; j<argsArray.length;j++){
			console.log("argsArray item: "+argsArray[j]);
			paramsArray.push(argsArray[j].value);
		}
		storeArray.push( {"output": output,"params": paramsArray});
	}
}
//END TESTCASE1
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

//START TESTCASE3

//FUNCTIONS RELATING TO getExamIDs ENDPOINT
function getExamIDs(){
	var JSONNOOP={}
	JSONNOOP = wrapJson(JSONNOOP, "getExamIDs");
	submitMiddle(JSONNOOP, displayExamIDs);

}
function displayExamIDs(jsonInput){
	if (jsonInput["Success"]){
		var examsAvailable=jsonInput["questions"];
		for (var i = 0; i<examsAvailable.length;i++){
			var item = examsAvailable[i];
			//Creation of radiobox per Exam
			var newDiv = document.createElement('div');
			newDiv.innerHTML= 
				"<input type='radio' name='ExamID' value='"+item["ExamID"]+"'>"+
				item["ExamName"];
			document.getElementById("examQuestionBank").appendChild(newDiv);
			console.log("Added ExamID: "+item["ExamID"]);
		
		}
	}else{
		alert("Failure to display Exams by ID");
	}	
}

//FUNCTIONS RELATING TO getExam ENDPOINT
function submitExamID(){
	var examID=document.querySelectorAll('input[type="radio"]:checked');
	var value = examID.length>0? examID[0].value:null;
	console.log("Sending ExamID: "+value);
	var examIDJ ={
		"examID":value
	};
	examIDJ=wrapJson(examIDJ, "getExam");
	
	submitMiddle(examIDJ, displayExam);
}

//getExam as Input and gradExam as ouput
function displayExam(jsonInput){
	if (jsonInput["Success"]){
		document.body.innerHTML="<div id='exam"+jsonInput["ExamID"]+"'></div>";
		var questions=jsonInput["Exam"];//MIGHT CHANGE BECAUSE OF FORMATTING
		
		//Fuck that I will change it myself
		jsonInput.questions=jsonInput.Exam;
		delete jsonInput.Exam;
		//---------------------------------
		console.log("Switch \"Exam\" to \"questions\"");
		console.log("Question: "+questions);
		
		//Every question in Array
		for (var i = 0; i<questions.length;i++){
			var item = questions[i];
			console.log("Item: "+item);
			//Displaying questions
			var newDiv = document.createElement('div');
			newDiv.innerHTML=
			"<p>"+item["content"]+"</p>"+
			"<textarea id='studentResponse"+item["questionID"]+"'"+
			"></textarea><br/>"+
			"<table id="+item["questionID"]+">"+
			"<tr>"+
				"<th>Output</th>"+
				"<th>Arguments</th>"+
			"</tr>";
			document.getElementById("exam"+jsonInput["ExamID"]).appendChild(newDiv);

			console.log("QuestionID: "+item["questionID"]);
			var table= document.getElementById(item["questionID"]);
			console.log("Table: "+table);	
				
			var testCases=item["testcases"];
			//Every testCase in Question
			for (var j=0; j<testCases.length;j++){
				console.log("TestCase "+(j+1)+" added");
				
				var row = table.insertRow();	
				
				var output = row.insertCell();
				output.innerHTML=testCases[j]["output"];
				console.log("testCases output: "+testCases[j]["output"]);
				
				//Every params in testCase
				var args = row.insertCell();
				console.log("params: "+testCases[j]);
				var parameters='';
				for( k in testCases[j].params){
					console.log("paramsInside: "+testCases[j].params[k]);
					parameters += testCases[j].params[k]+", ";
				}//Ended params
				args.innerHTML=parameters;
			}//Ended testCase	
			document.getElementById("exam"+jsonInput["ExamID"]).appendChild(newDiv);
			console.log("Added questionID: "+item["questionID"]);
			//jsonInput.questions[i].studentResponse=String("studentResponse"+item[])
			//"<textarea id='studentResponse"+item["questionID"]+"'"+
			//document.getElementById("studentResponse"+item["questionID"]).value;
			//"<textarea id='studentResponse"+item["questionID"]+"'"+
		
		
		}//Ended Question
		console.log("Username: "+sessionStorage.getItem('uname'));
		jsonInput.userID=sessionStorage.getItem('ID');
		console.log(jsonInput);

		//Submit Button
		var finish = document.createElement("input");
		finish.setAttribute("type", "button");
		finish.setAttribute("value", "Finish Exam")
		finish.setAttribute("id", "fButton")
		document.getElementById("exam"+jsonInput["ExamID"]).appendChild(finish);
		document.getElementById("fButton").onclick=function(){
			//Needed to fill response with user response
			for (var i = 0; i<jsonInput["questions"].length;i++){
				var rTxt=document.getElementById("studentResponse"+
					jsonInput["questions"][i]["questionID"]).value;
				console.log("responseValue: "+rTxt);
				jsonInput["questions"][i].studentResponse=rTxt;
			};
			jsonInput=wrapJson(jsonInput, "gradeExam");
			console.log(jsonInput);
				
			submitMiddle(jsonInput, NOOP);
			alert("Finished Exam");
			window.location="https://web.njit.edu/~jrr28/CS490/student/";//WHY THE FACT DOES THIS GIVE STATUS 0;
		}
	}else{
		alert("Failure to display Exam");
	}	
}

//FUNCTIONS RELATING TO getStudentIDs ENDPOINT
function getStudents() {
	var JSONNOOP={};
	JSONNOOP= wrapJson(JSONNOOP, "getStudentIDs");
	submitMiddle(JSONNOOP, displayStudents);
}

//getStudentIDs as input / reviewExam as output
function displayStudents(jsonInput){
	if(jsonInput["Success"]) {
		
		//Display student from Students array
		for(var i=0; i<jsonInput["Students"].length;i++){
			//Creation of student selection
			var item = jsonInput["Students"][i];
			console.log("Item: "+item);
			//Creation of radiobox per student
			var newDiv = document.createElement('div');
			newDiv.innerHTML= 
				"<input type='radio' name='studentID' value='"+item["id"]+"'>"+
				item["uname"];
			document.getElementById("studentList").appendChild(newDiv);
			console.log("Added Id: "+item["id"]);
		}
		
		//Creation of button to review student
		var review = document.createElement("input");
		review.setAttribute("type", "button");
		review.setAttribute("value", "Review")
		review.setAttribute("id", "reviewButton")
		document.getElementById("studentList").appendChild(review);
		document.getElementById("reviewButton").onclick=function(){
			console.log(jsonInput);
			var studentID=document.querySelectorAll('input[type="radio"]:checked');
			var value = studentID.length>0? studentID[0].value:null;
			console.log("Sending studentID: "+value);
			var studentIDJ ={
				"userID":value
			};
			studentIDJ=wrapJson(studentIDJ, "reviewExam");
			submitMiddle(studentIDJ, displayReviewExam);
		};
	}else{
		alert("Failure to display current students");
	}
}

//reviewExam as input / submitExam as ouput
function displayReviewExam(jsonInput) {
	if(jsonInput["Success"]){
		var examPage = document.getElementById('studentExam');
		var newDiv = document.createElement('div');
		newDiv.innerHTML=
			"Scored <b>"+jsonInput["examTotalPointsEarned"]+"</b>"+
			" out of <b>"+jsonInput["examTotalPossible"]+"</b>: "+
			(jsonInput["examTotalPointsEarned"]/jsonInput["examTotalPossible"]).toFixed(2)*100.0+"%";
			;
		document.getElementById("studentExam").appendChild(newDiv);
		for (var i=0; i<jsonInput["Questions"].length; i++){
			var questionDiv = document.createElement('div');
			
			//Creation of div containg Question
			questionDiv.innerHTML="<h1>Question</h1>"+
			"<p>"+jsonInput["Questions"][i]["content"]+"</p>"+
			"<h1>Student Response</h1>"+
			"<p>"+jsonInput["Questions"][i]["studentResponse"]+"</p>"+
			"<textarea id='comment"+jsonInput["Questions"][i]["questionID"]+"'>"+
			jsonInput["Questions"][i]["comments"]+
			"</textarea>"+
			"<input id='points"+jsonInput["Questions"][i]["questionID"]+"'"+
			"type='number' min='0' max='"+
			jsonInput["Questions"][i]["maxPoints"]+"' value='"+
			jsonInput["Questions"][i]["totalPointsEarned"]+"'>";
			
		document.getElementById("studentExam").appendChild(questionDiv);
		}
		//Creation of button to review student
		var finishReview = document.createElement("input");
		finishReview.setAttribute("type", "button");
		finishReview.setAttribute("value", "Finish Review")
		finishReview.setAttribute("id", "fRButton")
		document.getElementById("studentExam").appendChild(finishReview);
		document.getElementById("fRButton").onclick=function(){
			console.log(jsonInput);
			//Need to update the value of comments & points worth
			for (var i=0; i<jsonInput["Questions"].length; i++){
				
				//Update Comments
				jsonInput["Questions"][i]["comments"]=
				document.getElementById("comment"+
				jsonInput["Questions"][i]["questionID"]).value;

				//Update Points
				jsonInput["Questions"][i]["totalPointsEarned"]=
				document.getElementById("points"+
				jsonInput["Questions"][i]["questionID"]).value
				
			}	
			//Location file going to
			jsonInput=wrapJson(jsonInput, "submitExam");
			submitMiddle(jsonInput, NOOP);
			alert("Released Exam");
			window.location="https://web.njit.edu/~jrr28/CS490/teacher";
		};
	}else{
		alert("Failure of displaying review Exam");
	}
}
//END TESTCASE3

//START TESTCASE4

//FUNCTIONS RELATING TO reviewExam ENDPOINTS
function getStudentGrades(){
	console.log("Username: "+sessionStorage.getItem('ID'));
	var jsonID={"userID":sessionStorage.getItem("ID")};
	jsonID = wrapJson(jsonID, "reviewExam");
	submitMiddle(jsonID, displayStudentGrades);
}
function displayStudentGrades(jsonInput){
	if(jsonInput["Success"]){
		var newDiv = document.createElement('div');
		newDiv.innerHTML=
			"Scored <b>"+jsonInput["examTotalPointsEarned"]+"</b>"+
			" out of <b>"+jsonInput["examTotalPossible"]+"</b>: "+
			(jsonInput["examTotalPointsEarned"]/jsonInput["examTotalPossible"]).toFixed(2)*100.0+"%";

			document.getElementById("examList").appendChild(newDiv);
	
	for(var i=0; i<jsonInput["Questions"].length; i++){
		var item = jsonInput["Questions"][i];
		
		var questionDiv=document.createElement("div");

		questionDiv.innerHTML="<h1>Question</h1>"+
		"<p>"+jsonInput["Questions"][i]["content"]+"</p>"+
		"<h1>Your Response</h1>"+
		"<p>"+jsonInput["Questions"][i]["studentResponse"]+"</p>"+
		"<h1>Teacher Comments</h1>"+
		"<p>"+jsonInput["Questions"][i]["comments"]+"</p>"+
		"<p> Earned:"+jsonInput["Questions"][i]["totalPointsEarned"]+
		"</p>";

		document.getElementById("examList").appendChild(questionDiv);

	}
	
	}else{
		alert("Failure to Display Exam");
	}
}
//END TESTCASE4
//General Javascript
//Used for empty callback
function NOOP(jsonInput){
	console.log("Empty Callback");
	console.log("Json of Request: "+jsonInput)
}

/*	Wraps main json with endpoint:
	addQuestions, getQuestions, createExam, 
	getExam, submitExam, reviewExam, login
*/
//General Javascript
function wrapJson(jsonFormat, type){
	var body = JSON.stringify(jsonFormat);
	var wrapper = {
		mainBody : body,
		mainType : type
	};
	return wrapper;
}

//General Javascript
//Used to make POST request to middle with AJAX
function submitMiddle(jsonFormat, callback){
	var xmlhttp;
	
	//Check to Browser
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("POST", "https://web.njit.edu/~jrr28/CS490/postJson.php", true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json');

	console.log("Sending: "
	+ JSON.stringify(jsonFormat));
	
	
	xmlhttp.send(JSON.stringify(jsonFormat)); 
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			console.log("Status: Good(200)");
			console.log("State: Good(4)");
			console.log("Response: "+ xmlhttp.response);
			console.log("Response Text: " + xmlhttp.responseText);
			console.log("Parse Text: "+JSON.parse(xmlhttp.responseText));	
			callback(JSON.parse(xmlhttp.responseText));
		}else{
			console.log("Status Error: "+ xmlhttp.status);
			console.log("State Error: "+ xmlhttp.readyState);
		}
	}
}

