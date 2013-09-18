<?php include_once('db.inc.php')?>
<?php include_once('quizFunctions.php');


header('Content-Type: application/json');

//$jsonOutput =  json_encode($scoreboard);

/* Output the JSON data */
$jsonOutput =  json_encode(getScoreBoard());


echo $jsonOutput;





?>