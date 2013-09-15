<?php
	session_start();
	
	echo "<pre>";
	print_r($_SESSION['history']);
	print_r($_SESSION['pointer']);
	echo "</pre>";

?>