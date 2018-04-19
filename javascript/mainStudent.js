//Student takes the exam
function workspaceTakeExam(){
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	//Send userID to get exam to see if student taken the exam already
	var userID = sessionStorage.getItem("ID");
	var userIDJson={
		"userID":userID
	};
	userIDJson = wrapJson(userIDJson, "getOpenExams");
	submitMiddle(userIDJson, displayExamsIDs);
	
	//Submit exam option
	var input = document.createElement("INPUT");
	input.setAttribute("type", "button");
	input.setAttribute("value", "Take Exam");
	input.setAttribute("onclick", "submitExamID()");
	workspace.appendChild(input);
}
//workspaceTakeExam():
//Display student Exam IDs
function displayExamsIDs(jsonInput) {
	console.log("Executing displayExamsIDs");
	var workspace =document.getElementById("workspace");
	
	//var examListDiv = document.createElement("DIV");

	var examsAvailable = jsonInput["exams"];
	
	for (var i = 0; i<examsAvailable.length; i++){
		
		var exam = jsonInput["exams"][i];

		var label = document.createElement("LABEL");
		label.setAttribute("for", exam["ExamID"]);
		
		var input = document.createElement("INPUT");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "examList");
		input.setAttribute("value",  exam["ExamID"]);
		
		label.appendChild(input)

		var txtNode = document.createTextNode(exam["ExamName"]);
		label.appendChild(txtNode);
		
		workspace.appendChild(label)
		
	}	
}
//workspaceTakeExam():
//Student submits examID
function submitExamID(){
	console.log("Executing submitExamID()");
	
	var examList =
		document.getElementById("workspace"
		).querySelectorAll('input[type=radio]:checked');
	var isChecked = examList.length > 0? true:false;

	if (isChecked){
		var examID = examList[0].value;
		
		var examIDJson = {
			"examID":examID
		};

		examIDJson = wrapJson(examIDJson, "getExam");
		submitMiddle(examIDJson, displayExam);

	}else{
		alert("Missing Input")
	}
}
//workspaceTakeExam():
//Display exam from getExam endpoint so student can take it
function displayExam(jsonInput){
	clearWorkspace();
	var workspace = document.getElementById("workspace");

	var questionList = jsonInput["questions"];
	
	for (var i = 0; i<questionList.length; i++){
		var question = questionList[i];
		
		//var div = document.createElement("DIV");
		
		//Question teacher asked
		var p = document.createElement("P");
		var teacherQuestion = document.createTextNode((i+1)+". "
			+question["Content"]);
		p.appendChild(teacherQuestion);

		workspace.appendChild(p);

		//TextArea for student Response
		var textArea = document.createElement("TEXTAREA");
		textArea.setAttribute("name", "studentResponse" );
		
		workspace.appendChild(textArea);

		var hr = document.createElement("HR");
		workspace.appendChild(hr);

	}
	//Saving jsonInput since needs to be called

	var submit = document.createElement("INPUT");
	submit.setAttribute("type", "button");
	submit.setAttribute("value", "Submit Exam");
	
	workspace.appendChild(submit);
	
	//DOM eventListener over onclick
	var button = workspace.querySelector('input[type="button"]');
	button.addEventListener("click", 
		function() { submitExam(jsonInput) });
	
}
//workspaceTakeExam():
//Student submits exam
function submitExam(jsonInput){
	console.log("Executing submitExam(jsonInput)");
	var modJsonInput = jsonInput;
	
	//add userID to json
	modJsonInput["userID"] = sessionStorage.getItem("ID");
	
	//add student Response
	var studentResponseList = document.getElementsByName("studentResponse");
	for (var i = 0; i< studentResponseList.length; i++){
		modJsonInput["questions"][i]["studentResponse"] = 
			studentResponseList[i].value;
	}
	modJsonInput = wrapJson(modJsonInput, "gradeExam");
	submitMiddle(modJsonInput, NOOP);
	
	clearWorkspace();
}


//Student views exam after release
function workspaceReviewExam() { 
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	ajaxCallback("getExamIDs", displayExamsIDs);
	
	var input = document.createElement("INPUT");
	input.setAttribute("type", "button");
	input.setAttribute("value", "Review Exam");
	input.setAttribute("onclick", "submitReviewID()");
	workspace.appendChild(input);

}
//workspaceReviewExam():
//Send IDs for exam
function submitReviewID(){
	
	var userID=sessionStorage.getItem("ID");
	
	var examList =
		document.getElementById("workspace"
		).querySelectorAll('input[type=radio]:checked');
	var isChecked = examList.length > 0? true:false;

	if (isChecked){
		var examID = examList[0].value;
		
		var reviewIDJson = {
			"userID":userID,
			"examID":examID
		};
		reviewIDJson = wrapJson(reviewIDJson, "reviewExam");
		submitMiddle(reviewIDJson, displayReviewExam);

	}else{
		alert("Missing Input")
	}
}
//workspaceReviewExam():
//Display review Exam
function displayReviewExam(jsonInput){
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	if (jsonInput["questions"].length==0){
		workspace.appendChild( document.createTextNode(
		"Can't review Exam if you haven't taken"
		));
	}

	else if (jsonInput["release"]=="0"){
		workspace.appendChild(
		document.createTextNode(
		"Teacher has not released exam"
		));
	}else{
		var scorePercent = document.createElement("P");
		var points = 
		document.createTextNode(jsonInput["scorePercentage"]);
		scorePercent.appendChild(points);
		workspace.appendChild(scorePercent);

		var questionList = jsonInput["questions"];
		for (var i = 0; i < questionList.length; i++){
			var question = questionList[i];
			
			//Question Asked
			var p = document.createElement("P");
			var teacherQuestion = document.createTextNode((i+1)+". "
			+question["content"]);
			p.appendChild(teacherQuestion);

			workspace.appendChild(p);
			
			//Break HTML line
			var br = document.createElement("BR");
			workspace.appendChild(br);
			
			//Student response
			var p = document.createElement("P");
			var studentAnswer = 
				document.createTextNode(question["studentResponse"]);
			p.appendChild(studentAnswer);

			workspace.appendChild(p);
			
			//Teacher's Comment
			var p = document.createElement("P");
			var teacherComment = 
				document.createTextNode(question["comments"]);
			p.appendChild(teacherComment);

			workspace.appendChild(p);
			
			//Generated Fail cases
			workspace.appendChild( document.createTextNode(question["failedCases"]) );
			//TODO: REGEX \n into html break
			
			//Line Break
			var hr = document.createElement("HR");
			workspace.appendChild(hr);

		}
	}
}

//Clear the workspace
function clearWorkspace() {
	var workspace = document.getElementById("workspace");
	workspace.innerHTML="";
}
