<?php
	session_start();
	header('Content-type: application/json');	
	
	$id = $_GET['id'];
	
	$file = $id; 
	
	$content = file_get_contents("./data/" . $file);
	$json = $content;

	echo $json;
	
	if (isset($_SESSION['history'][$file])){
		$_SESSION['history'][$file] = array();
		$_SESSION['history'][$file][0] = $json;
	}
	
	if (isset($_SESSION['pointer'][$file])){
		$_SESSION['pointer'][$file] = 0;
	}

?>