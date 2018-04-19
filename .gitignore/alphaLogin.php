<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="loginStyle.css">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">		
</head>
<body>

	<h2>Login Form</h2>
	<form>
	<div class="container">
	
	<label><b>UCID</b></label>
	<input autocomplete=off type="text" placeholder="Enter UCID" id='ucid' name="ucid" required>

	<label><b>Password</b></label>
	<input autocomplete=off type="password" placeholder="Enter Password"  id='pwd' name="pwd" required>    
	</div>
	</form>

	<button type="submit" id="loginBtn">Login</button>
																								
	<div id="ajaxRece">
	NJIT Connection:<br/>
	Backend Connection:<br/>
	</div>
	<script>
	var xmlhttp;
	var handleStateChange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var jsonO = JSON.parse(xmlhttp.responseText);
			var njitConnect = jsonO["njitsuccess"];
			var dbConnect = jsonO["backendsuccess"];
			console.log(jsonO);
			document.getElementById("ajaxRece").innerHTML="NJIT Connection: "+njitConnect+"<br/>Backend Connection: "+dbConnect+"\n";
			//handleResponse(xmlhttp.status, xmlhttp.responseText);
		}
	}

	function sendPost(){
		if (window.XMLHttpRequest){
			xmlhttp= new XMLHttpRequest();
		}else{
			xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");	
		}
xmlhttp.open("POST", "https://web.njit.edu/~jrr28/CS490/post.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var ucid = document.getElementById('ucid').value;
var pwd = document.getElementById('pwd').value;

xmlhttp.send("ucid="+encodeURIComponent(ucid)+"&pwd="+encodeURIComponent(pwd));

xmlhttp.onreadystatechange=handleStateChange;

}
var postButton = document.getElementById("loginBtn");
postButton.addEventListener("click", sendPost);	
</script>
</body>
</html>

