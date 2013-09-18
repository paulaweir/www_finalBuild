<?php include_once('db.inc.php')?>
<?php include_once('quizFunctions.php');

$guest_id = isset($_REQUEST['guest_id']) ? (int) $_REQUEST['guest_id'] : 1;

header('Content-Type: application/json');


$jsonOutput =  json_encode(getGuestScore($guest_id));

echo $jsonOutput;



?>