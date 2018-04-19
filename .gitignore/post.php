<?php

	//Send to Middle
	$URL = 'https://web.njit.edu/~bc334/middle.php';

	$curlRequest = curl_init();
	
	//Connection to URL
	curl_setopt($curlRequest, CURLOPT_URL, $URL);
	
	//Return as a string
	curl_setopt($curlRequest, CURLOPT_RETURNTRANSFER, true);

	//Regular HTTP POST
	curl_setopt($curlRequest, CURLOPT_POST, true);

	//Full data to post in POST
	curl_setopt($curlRequest, CURLOPT_POSTFIELDS, http_build_query($_POST));

	$result = curl_exec($curlRequest);

	echo $result;
	//?
	//curl_close($curlRequest);

?>
