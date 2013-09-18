<?php include_once('db.inc.php')?>
<?php include_once('quizFunctions.php');


header('Content-Type: application/json');



$guest_id = (int) $_POST['guest_id'];

parse_str(urldecode($_REQUEST['formData']),$memberData);



saveGuestAnswers($memberData);

$jsonOutput =  json_encode(true);



?>