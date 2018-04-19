//Teacher clicks create question Button
function workspaceCreateQuestion() {
	//var createQuestionDiv = document.createElement("DIV");

	//Selection of workspace
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	//Creation of question page
	
	//Creation of FORM(Form of question)
	var form = document.createElement("FORM");

	//Creation of SELECT(Topic of question)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "topic");
	label.appendChild(document.createTextNode("Topic"));
	workspace.appendChild(label);

	var select = document.createElement("SELECT");
	select.setAttribute("id", "topic");
	form.appendChild(select)

	//Creation of OPTION(options for topic)
	//Topic 1
	var option = document.createElement("OPTION");
	option.setAttribute("value", "For-Loops");
	var textNode = document.createTextNode("For-Loops");
	option.appendChild(textNode);
	select.appendChild(option);
	//Topic 2
	var option = document.createElement("OPTION");
	option.setAttribute("value", "Recursion");
	var textNode = document.createTextNode("Recursion");
	option.appendChild(textNode);
	select.appendChild(option);
	//Topic 3
	var option = document.createElement("OPTION");
	option.setAttribute("value", "Strings");
	var textNode = document.createTextNode("Strings");
	option.appendChild(textNode);
	select.appendChild(option);

	//Creation of SELECT(Difficulty of question)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "difficulty");
	label.appendChild( document.createTextNode("Difficulty") );
	workspace.appendChild(label);
	
	var select = document.createElement("SELECT");
	select.setAttribute("id", "difficulty");
	form.appendChild(select);

	//Creation of OPTION(options for difficulty)
	//Difficulty 1
	var option = document.createElement("OPTION");
	option.setAttribute("value", "1");
	var textNode = document.createTextNode("Easy");
	option.appendChild(textNode);
	select.appendChild(option);
	//Difficulty 2
	var option = document.createElement("OPTION");
	option.setAttribute("value", "2");
	var textNode = document.createTextNode("Medium");
	option.appendChild(textNode);
	select.appendChild(option);
	//Difficulty 3
	var option = document.createElement("OPTION");
	option.setAttribute("value", "3");
	var textNode = document.createTextNode("Hard");
	option.appendChild(textNode);
	select.appendChild(option);

	//Creation of TEXTAREA(question of question)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "content");
	label.appendChild( document.createTextNode("Question") );
	workspace.appendChild(label);
	
	var textarea = document.createElement("TEXTAREA");
	textarea.setAttribute("id", "content");
	textarea.setAttribute("placeholder", "Enter the question");
	textarea.setAttribute("required", "required");
	form.appendChild(textarea);

	//Creation of INPUT(function of question)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "functionName");
	label.appendChild( document.createTextNode("Name of function"));
	workspace.appendChild(label);
	
	var input = document.createElement("INPUT");
	input.setAttribute("id", "functionName");
	input.setAttribute("type", "text");
	input.setAttribute("autocomplete", "off");
	input.setAttribute("placeholder", "Enter function name");
	input.setAttribute("required", "required");
	form.appendChild(input);
	
	//Creation of DIV(Holds testcases & arguments)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "testCases");
	label.appendChild( document.createTextNode("Testcases") );
	workspace.appendChild(label);
	
	var div = document.createElement("DIV");
	div.setAttribute("id", "testCases");

	//Creation of INPUT(# of testcase)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "testCount");
	label.appendChild( document.createTextNode("Number of testcases"));
	workspace.appendChild(label);
	
	var input = document.createElement("INPUT");
	input.setAttribute("type", "number");
	input.setAttribute("id", "testCount");
	input.setAttribute("required", "required");
	input.setAttribute("value", "1");
	input.setAttribute("min", "1");
	input.setAttribute("max", "5");
	div.appendChild(input);

	//Creation of INPUT(# of arguments per testcase)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "argCount");
	label.appendChild( document.createTextNode("Number of arguments") );
	workspace.appendChild(label);
	
	var input = document.createElement("INPUT");
	input.setAttribute("type", "number");
	input.setAttribute("id", "argCount");
	input.setAttribute("required", "required");
	input.setAttribute("value", "0");
	input.setAttribute("min", "0");
	input.setAttribute("max", "10");
	div.appendChild(input);

	//Creation of INPUT(Button to display testcases )
	var input = document.createElement("INPUT");
	input.setAttribute("type", "button");
	input.setAttribute("value", "Create test cases");
	input.setAttribute("onclick", "createTestCases()");
	div.appendChild(input);
	
	form.appendChild(div);

	//Creation og INPUT(Button to submit question)
	var input = document.createElement("INPUT");
	input.setAttribute("type","button");
	input.setAttribute("value", "Submit question");
	input.setAttribute("onclick", "submitQuestion()");
	form.appendChild(input);
	
	workspace.appendChild(form);
}

//workspaceCreateQuestion():
//Teacher creates test cases
function createTestCases() {
	
	var testCount = document.getElementById("testCount").value;
	var argCount = document.getElementById("argCount").value;
	
	var testCases = document.getElementById("testCases");
	
	while (testCases.firstChild) {
		console.log("Remove testCases.firstChild");
		testCases.removeChild(testCases.firstChild);
	};

	//Creation of INPUTs(testCout)
	for (var i = 0; i<testCount; i++){
		var div = document.createElement("DIV");
		div.setAttribute("id", "testCase"+i+"");
		
		var inputTC = document.createElement("INPUT");
		inputTC.setAttribute("type", "text");
		inputTC.setAttribute("placeholder", "Output "+(i+1)+"");
		inputTC.setAttribute("id", "outputCase"+i+"");
		inputTC.setAttribute("required", "required");
		div.appendChild(inputTC);

		for (var j = 0; j<argCount; j++){
			var inputAC = document.createElement("INPUT");
			inputAC.setAttribute("type", "text");
			inputAC.setAttribute("placeholder", "Arg "+(j+1)+"");
			inputAC.setAttribute("name", "argCase"+i+"[]");
			inputAC.setAttribute("required", "required");
			div.appendChild(inputAC);
		}

		testCases.appendChild(div);
	}
}

//workspaceCreateQuestion:
//Teacher submits question
function submitQuestion() {
	console.log("submitQuestion executed");
	
	//Relevant Info to send to backend
	var topic = document.getElementById("topic").value;
	var difficulty = document.getElementById("difficulty").value;
	var functionName = document.getElementById("functionName").value;
	var content = document.getElementById("content").value;
	
	//Iterate over div of testCases
	var docTestCases = 
	document.getElementById("testCases").querySelectorAll("div");
	
	var testCases = [];
	//Creation of array of test cases 
	for (var i = 0; i < docTestCases.length; i++){
		console.log(docTestCases.length);
		var testCaseChildren = docTestCases[i].childNodes;
		var testCaseLength = testCaseChildren.length;
		
		var outputTC = testCaseChildren[0].value;
		
		var outputAC=[];
		for (var j = 1; j < testCaseLength; j++){
			var arg = testCaseChildren[j].value;
			outputAC.push(arg);
		}
		console.log("Output: "+outputTC+"\nArgs: "+outputAC+"");
		testCases.push({"output":outputTC, "params":outputAC});

	}
	//Send info to Backend
	var questionJson = {
		"topic":topic,
		"difficulty":difficulty,
		"functionName":functionName,
		"content":content,
		"testCases":testCases
	};
	
	questionJson = wrapJson(questionJson, "addQuestions");
	submitMiddle(questionJson, NOOP);

}

//Teacher clicks create exam
function workspaceCreateExam() {
	console.log("workspaceCreateExam() executed");
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	ajaxCallback("getQuestions", displayExamQuestions);

}
//workspaceCreateExam():
//Callback for creating an Exam from questionBank
function displayExamQuestions(jsonInput) {
	var workspace = document.getElementById("workspace");

	var examQuestion = document.createElement("DIV");
	examQuestion.setAttribute("id", "examQuestionBank");
	
	//Name of Exam
	var examName = document.createElement("INPUT");
	examName.setAttribute("type", "text");
	examName.setAttribute("placeholder", "Name of exam");
	examName.setAttribute("id", "examName");
	examQuestion.appendChild( document.createElement("BR") );
	examQuestion.appendChild(examName);

	var questionList = jsonInput["questions"];
	for (var i = 0; i<questionList.length; i++){
		var question = questionList[i];
		
		//Checkbox on selecting question
		var cb = document.createElement("INPUT");
		cb.setAttribute("type", "checkbox");
		cb.setAttribute("name", "questionCheckList[]");
		cb.setAttribute("value", question["QuestionID"]);
		examQuestion.appendChild(cb);

		var questionDiv = document.createElement("DIV");
		questionDiv.setAttribute("name", "question");
			
		//Topic
		var title = document.createElement("P");
		var topicTxtNode = document.createTextNode(
			"Topic: "+question["Topic"]);
		title.appendChild(topicTxtNode);
		
		title.appendChild( document.createElement("BR") );
		
		//Difficulty
		var DifficultyTxtNode = document.createTextNode(
			"Difficulty: "+question["Difficulty"]);
		title.appendChild(DifficultyTxtNode);
		
		questionDiv.appendChild(title);

		//Question
		var p = document.createElement("P");
		var pTxtNode = document.createTextNode(question["Content"]);
		p.appendChild(pTxtNode);

		questionDiv.appendChild(p);

		examQuestion.appendChild(questionDiv)
		
		//Max Points
		var maxPoints = document.createElement("INPUT");
		maxPoints.setAttribute("type", "number");
		maxPoints.setAttribute("min", "0");
		maxPoints.setAttribute("value","0");
		maxPoints.setAttribute("name", "maxPoints[]");
		examQuestion.appendChild(maxPoints);
	}
	
	//Submit exam creation
	var submitExam = document.createElement("INPUT");
	submitExam.setAttribute("type", "button");
	submitExam.setAttribute("value", "Submit new exam");
	submitExam.setAttribute("onclick", "submitExamQuestions()");
	examQuestion.appendChild(submitExam);

	workspace.appendChild(examQuestion);
}
//workspaceCreateExam():
//Submit Exam created
function submitExamQuestions(){
	console.log("submit Exam Questions Executed");
	var examName = document.getElementById("examName").value;
	var qcheckList = 
		document.getElementsByName("questionCheckList[]");
	var examQuestions = [];
	for (var i = 0; i<qcheckList.length; i++){
		var item = qcheckList[i];

		var pointsQuestion = 
			document.getElementsByName("maxPoints[]")[i].value;
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		console.log(item.value);
		console.log(pointsQuestion);
		if (item.checked) {
			examQuestions.push({
				"questionID":item.value,
				"maxPoints": pointsQuestion
			});
		}
	}
	var examJson = {
		"examName":document.getElementById("examName").value,
		"examQuestions":examQuestions
	};
	
	examJson = wrapJson(examJson, "createExam");
	submitMiddle(examJson, NOOP);
	
	clearWorkspace();
}

//Teacher clicks review exam
function workspaceReviewExam() {
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	//Creation of List
	var ul = document.createElement("UL");
	ul.setAttribute("id", "examList");
	
	ajaxCallback("getExamIDs", displayExamsList);
	ajaxCallback("getStudentIDs", displayStudentsList);

	var input = document.createElement("INPUT");
	input.setAttribute("type", "button");
	input.setAttribute("value", "Submit Exam & Student Id");
	input.setAttribute("onclick", "submitExamStudentID()");
	workspace.appendChild(input);
}
//workspaceReviewExam():
//Callback for displaying exams
function displayExamsList(jsonInput) {
	
	var workspace = document.getElementById("workspace");
	var ul = document.getElementById("examList");
		
	//Display Exams Available
	for (var i = 0; i<jsonInput["exams"].length; i++){		
		var li = document.createElement("LI");
		
		var exam = jsonInput["exams"][i];
		
		var input = document.createElement("INPUT");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "exam");
		input.setAttribute("value", exam["ExamID"]);
		li.appendChild(input);
		
		var textNode = document.createTextNode(exam["ExamName"]);
		li.appendChild(textNode);
		
		workspace.appendChild(li);
	}
	
}
//workspaceReviewExam():
//Callback for displaying students
function displayStudentsList(jsonInput) {
	
	var workspace = document.getElementById("workspace");
	var ul = document.getElementById("examList");

	//Display students that taken exam
	for (var i = 0; i<jsonInput["students"].length; i++) {
		var li = document.createElement("LI");
		
		var student = jsonInput["students"][i];
		
		var input = document.createElement("INPUT");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "student");
		input.setAttribute("value", student["UserID"]);
		li.appendChild(input);
		
		var textNode = document.createTextNode(student["Username"]);
		li.appendChild(textNode);
		
		workspace.appendChild(li);
	}
}
//ReviewExam:Submit Exam & Student ID
function submitExamStudentID() {
	console.log("Executing submitExamStudentID");
	//Nodelist where all input type is radio and is checked
	var examStudentID = 
		document.getElementById("workspace"
		).querySelectorAll('input[type="radio"]:checked');
	
	var isChecked = examStudentID.length > 1? true:false;
	
	if (isChecked){
		var examID = examStudentID[0].value;
		var studentID = examStudentID[1].value;
		
		var examStudentIDJson = {
			"examID":examID,
			"userID":studentID
		};
		examStudentIDJson = wrapJson(examStudentIDJson, "reviewExam");
		
		submitMiddle(examStudentIDJson, displayExam);

	}else{
		alert("Missing input");
	}
}
//workspaceReviewExam():
//Callback for displaying exam
function displayExam(jsonInput) {
	clearWorkspace();
	var workspace = document.getElementById("workspace");
	
	//Display 
	var questionList = jsonInput["questions"];
/**/if (questionList.length != 0 ){
	
	
	//Score Percentage
	var scorePercentage = document.createElement("P");

	var score =(jsonInput["examTotalPointsEarned"]/jsonInput["examTotalPossible"]).toFixed(2)*100.0;
	
	console.log(score);
	
	var spTxtNode=document.createTextNode("Score: "+score+"%");
	scorePercentage.appendChild(spTxtNode);
	
	workspace.appendChild(scorePercentage);

	for (var i = 0; i<questionList.length;i++){
		var question = questionList[i];

		//Question Asked
		var p = document.createElement("P");
		var teacherQuestion = 
			document.createTextNode(question["content"] );
		p.appendChild(teacherQuestion);

		workspace.appendChild(p);
		workspace.appendChild( document.createElement("BR") );

		//Student Response
		var p = document.createElement("P");
		var studentAnswer = 
			document.createTextNode( question["studentResponse"] );
		p.appendChild(studentAnswer);
		workspace.appendChild(p);	

		//Student total Points Earned
		var questionWorth = document.createElement("INPUT");
		questionWorth.setAttribute("type", "number");
		questionWorth.setAttribute("name", "newEarnedPoints");
		questionWorth.setAttribute("value", question["totalPointsEarned"]);
		questionWorth.setAttribute("min", "0");
		workspace.appendChild(questionWorth);
		
		//Failed Cases
		workspace.appendChild( document.createTextNode( question["failedCases"]));

		//Teacher's Comment
		var txtArea = document.createElement("TEXTAREA");
		txtArea.setAttribute("value", question["comments"]);
		txtArea.setAttribute("name", "teacherComment");
		workspace.appendChild(txtArea);
	}

	//Submit Changes
	var input = document.createElement("INPUT");
	input.setAttribute("type", "button");
	input.setAttribute("value", "Submit Changes");
	
	workspace.appendChild(input);
	
	//DOM eventListener over onlclick
	var button = workspace.querySelector('input[type="button"]');
	button.addEventListener("click", 
		function() { submitReviewExam(jsonInput) });
/**/}
	else{
		txtNode= document.createTextNode(
			"We are sorry. This exam is not available");
		workspace.appendChild(txtNode);
	}
}
//workspaceReviewExam():
//Submit exam teacher reviewed
function submitReviewExam(jsonInput){
	console.log("submitReviewExam executed");
	var modJsonInput = jsonInput;
	modJsonInput["release"]="1";
	var teacherEdits = document.getElementsByName("teacherComment");
	var teacherPoints = document.getElementsByName("newEarnedPoints");
	for (var i =0; i< teacherEdits.length; i++){
		modJsonInput["questions"][i]["comments"] =
			teacherEdits[i].value;
		modJsonInput["questions"][i]["totalPointsEarned"]=
			teacherPoints[i].value;
	}
	modJsonInput = wrapJson(modJsonInput, "submitExam");
	submitMiddle(modJsonInput, NOOP);
	clearWorkspace();
}

//Teacher clicks Show Question Bank
function toggleQuestionBank() {
	ajaxCallback("getQuestions", displayQuestions);
}
//toggleQuestionBank():
//Search through questions
function searchQuestion(text) {
	var re = new RegExp(text, "g");

}
//toggleQuestionBank():
//Display the questions in question bank
function displayQuestions(jsonInput){
	var workspace = document.getElementById("workspace");	
	
	
	
	var questionBank = document.createElement("DIV");
	questionBank.setAttribute("id", "questionBank");
	

	var questions = jsonInput["questions"];
	for (var i = 0; i<questions.length; i++){
		var question = questions[i];
		
		var questionDiv = document.createElement("DIV");
		questionDiv.setAttribute("name", "question");
			
		//Topic
		var title = document.createElement("P");
		var topicTxtNode = document.createTextNode(
			"Topic: "+question["Topic"]);
		title.appendChild(topicTxtNode);
		
		title.appendChild(document.createElement("BR") );
		
		//Difficulty
		var DifficultyTxtNode = document.createTextNode(
			"Difficulty: "+question["Difficulty"]);
		title.appendChild(DifficultyTxtNode);
		
		questionDiv.appendChild(title);

		//Question
		var p = document.createElement("P");
		var pTxtNode = document.createTextNode(question["Content"]);
		p.appendChild(pTxtNode);

		questionDiv.appendChild(p);

		questionBank.appendChild(questionDiv)
		questionBank.appendChild( document.createElement("HR") );
	}
	workspace.appendChild(questionBank);
}
//
function searchQuery(jsonInput){
	var workspace = document.create
	//Creation of SELECT(Difficulty of question)
	//Label
	var label = document.createElement("LABEL");
	label.setAttribute("for", "difficulty");
	label.appendChild( document.createTextNode("Difficulty") );
	workspace.appendChild(label);
	
	var select = document.createElement("SELECT");
	select.setAttribute("id", "difficulty");
	form.appendChild(select);

	//Creation of OPTION(options for difficulty)
	//Difficulty 1
	var option = document.createElement("OPTION");
	option.setAttribute("value", "1");
	var textNode = document.createTextNode("Easy");
	option.appendChild(textNode);
	select.appendChild(option);
	//Difficulty 2
	var option = document.createElement("OPTION");
	option.setAttribute("value", "2");
	var textNode = document.createTextNode("Medium");
	option.appendChild(textNode);
	select.appendChild(option);
	//Difficulty 3
	var option = document.createElement("OPTION");
	option.setAttribute("value", "3");
	var textNode = document.createTextNode("Hard");
	option.appendChild(textNode);
	select.appendChild(option);

	
}

//Clear the workspace
function clearWorkspace() {
	//Div is called workspace
	var workspace = document.getElementById("workspace");
	
	//Deletes every child
	while (workspace.firstChild) {
		console.log("Remove workspace.firstChild");
		workspace.removeChild(workspace.firstChild);
	};

	//Just Makes it Empty
	//workspace.innerHTML="";
}
