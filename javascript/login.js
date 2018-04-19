/*
	The purpose of this javascript are the following:
	*Sending login infomation
*/


//Create login json and send info
function login(){
	var loginJsonO = {
		"username":document.getElementById('username').value,
		"password":document.getElementById('password').value
	};
	loginJsonO = wrapJson(loginJsonO, "login");
	submitMiddle(loginJsonO, checkLogin);
}

//Callback from login()
function checkLogin(jsonInput){
	if (jsonInput["success"]){	
		
		sessionStorage.setItem("ID", jsonInput["userID"]);
		if(jsonInput["role"] == 1){
			window.location="https://web.njit.edu/~jrr28/CS490V2/student/";
		}else{
			window.location="https://web.njit.edu/~jrr28/CS490V2/teacher/";
		}
	}else{
		//Change alert but still notify user failed to login
	}
}
