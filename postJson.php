<?php
	/*Expect Input
		{
		mainBody: //Everything sending
		mainType: //Location of endpoints
		}
	*/
	$jsonWrapper = file_get_contents('php://input');
	
	$body = json_decode($jsonWrapper)->{'mainBody'};
	$type = json_decode($jsonWrapper)->{'mainType'};
		
	//Send to Middle endpoints dependent on type

	if ($type == "login")://SENDING
		$URL = "https://web.njit.edu/~bc334/middle.php/login";
	
	elseif ($type == "addQuestions")://SENDING
		$URL = "https://web.njit.edu/~bc334/middle.php/addQuestions";

	elseif ($type == "getQuestions")://GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/getQuestions";
	
	elseif ($type == "createExam")://SENDING
		$URL = "https://web.njit.edu/~bc334/middle.php/createExam";
	
	elseif ($type == "getExamIDs")://GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/getExamIDs";
	
	elseif ($type == "getExam")://SENDING/GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/getExam";
	
	elseif ($type == "gradeExam")://SENDING
		$URL = "https://web.njit.edu/~bc334/middle.php/gradeExam";
	
	elseif ($type == "getOpenExams")://SEND/GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/getOpenExams";

	elseif ($type == "getStudentIDs")://GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/getStudentIDs";
	
	elseif ($type == "submitExam")://SENDING 
		$URL = "https://web.njit.edu/~bc334/middle.php/submitExam";
	
	elseif ($type == "reviewExam")://SENDING/GETTING
		$URL = "https://web.njit.edu/~bc334/middle.php/reviewExam";
	endif;
	//var_dump($URL);
	
	$curlRequest = curl_init();
	
	//Connection to URL
	curl_setopt($curlRequest, CURLOPT_URL, $URL);
	
	//Return as a string
	curl_setopt($curlRequest, CURLOPT_RETURNTRANSFER, true);

	//Regular HTTP POST
	curl_setopt($curlRequest, CURLOPT_POST, 1);

	//Full data to post in POST
	curl_setopt($curlRequest, CURLOPT_POSTFIELDS, $body);
	
	//
	curl_setopt($curlRequest, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json'//,
	));

	$result = curl_exec($curlRequest);
	//var_dump ($result);
	echo $result;
?>
