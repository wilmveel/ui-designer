<?php
	//header('Content-type: application/json');	
	
	$dir = "data";
	$json = "";
	
	if ($handle = opendir($dir )) {


		/* This is the correct way to loop over the directory. */
		$json .= '[';
		$first = false;
		while (false !== ($entry = readdir($handle))) {
			
			if ($entry != "." && $entry != "..") {
				if($first){
					$json .= ',';
				}
				$first = true;
				
				$json .= '"' .$entry . '"';
			}
		}
		$json .= ']';
		closedir($handle);
	}
	
	echo $json;
?>