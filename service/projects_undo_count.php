<?php
	session_start();
	//header('Content-type: application/json');	
	
	$file = $_GET['file']; 
	
	if (isset($_SESSION['history'][$file])){
		echo count($_SESSION['history'][$file]);	
	}

?>