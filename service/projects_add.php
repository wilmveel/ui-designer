<?php
	header('Content-type: application/json');	
	
	$file = "projects.json"; 
	
	$content = file_get_contents("./" . $file.".json");
	$json = $content;

	echo $json;

?>