/*
	The purpose of this javascript are the following:
	* Wrap the main json file into new one for reaching endpoints
	* Make AJAX request using said json file
	* Hold an empty callback if just sending
*/

//Empty callback
function NOOP(jsonInput){
	console.log("Empty Callback");
	console.log("Json of Request: "+jsonInput)
}

function ajaxCallback(endpoint, callback) {
	var JSONNOOP = {};
	JSONNOOP = wrapJson(JSONNOOP, endpoint);
	submitMiddle(JSONNOOP, callback);
}

/*	
Wraps main json with endpoint:
GET----------------

General------------
*login- Recieve confirmation and role of user

Teacher------------
getQuestions- Recieve question bank info
getStudentIDs- Recieve students who taken exam
*reviewExam- Recieve exam of student 

Student------------
getExamIDs- Recieve list of exams
*getExam- Recieve exam info
reviewExam- Recieve exam of student (Student reviews exam)

----------------------------------------------------

POST---------------

General------------
*login- Send login info

Teacher------------
addQuestions- Send new question info
createExam- Send exam info (questions + other info)
*reviewExam- Send student ID of exam
submitExam- Send modifications of student exam

Student------------
*getExam- Send examID from list of exams
gradeExam- Send exam that student took

*/
function wrapJson(jsonFormat, type){
	var body = JSON.stringify(jsonFormat);
	var wrapper = {
		mainBody : body,
		mainType : type
	};
	return wrapper;
}

/*
Used to make POST request to middle with AJAX
*/
function submitMiddle(jsonFormat, callback){
	var xmlhttp;
	
	//Check to Browser
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("POST", "https://web.njit.edu/~jrr28/CS490V2/postJson.php", true);
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

