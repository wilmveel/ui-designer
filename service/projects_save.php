<?php
	session_start();	
	header('Content-type: application/json');	

	$file = $_GET['file']; 
	$json  =file_get_contents('php://input');
	
	// Add json to history
	if (!isset($_SESSION['history'])){
		$_SESSION['history'] = array();
		if(!isset($_SESSION['history'][$file])){
			$_SESSION['history'][$file] = array();
		}
	}
	
	if(!isset($_SESSION['pointer'])){
		$_SESSION['pointer'] = array();
		if(!isset($_SESSION['pointer'][$file])){
			$_SESSION['pointer'][$file] = 0;
		}
	}
	
	$i = $_SESSION['pointer'][$file] + 1;
	$_SESSION['history'][$file][$i] = $json;
	$_SESSION['pointer'][$file] = $i;
	
	
		
	file_put_contents("./data/" . $file, $json);

	echo "OK";

?>