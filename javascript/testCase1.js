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
