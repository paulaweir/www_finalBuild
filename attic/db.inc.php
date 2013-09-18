<?php 

/*
 * Declare a number of constants that you can change depending on your application
*/
define("DB_HOST","eventovate.db.10981868.hostedresource.com");
define("DB_USER","eventovate");
define("DB_PASSWORD","Webeldev2013!");
define("DB_DATABASE","eventovate");
/*
 * Declare a number of constants that you can change depending on your application
*/

$link_id=@mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
if($link_id) {
	
	//echo "Successful Connection";
} else {

	//echo "UnSuccessful Connection: " . DB_HOST;
	EXIT;
}

if(mysql_select_db(DB_DATABASE,$link_id)) {
	//echo "<p>Connection to database successful </p>";
} else {

	//echo "<p>Connection to database failed  </p>";
}

?>