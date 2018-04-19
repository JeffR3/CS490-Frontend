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
