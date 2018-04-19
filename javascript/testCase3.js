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
