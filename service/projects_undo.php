<?php
	session_start();

	header('Content-type: application/json');	
	
	$file = $_GET['id'];
	
	if (isset($_SESSION['history'][$file]) && isset($_SESSION['pointer'][$file])){
		
		
		$history = $_SESSION['history'][$file];
		$pointer = $_SESSION['pointer'][$file];
		
		if($pointer > 0){
			$i = $pointer - 1;
			$_SESSION['pointer'][$file] = $i;
		}else{
			$i = 0;
		}
		
		$json = $history[$i];
		echo $json;

		file_put_contents("./data/" . $file, $json); 
		
	}

?>