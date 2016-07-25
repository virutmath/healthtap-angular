<?php
include 'vendor/autoload.php';
use GuzzleHttp\Client;
$client = new Client();
$method = isset($_GET['method']) ? $_GET['method'] : '';
$header_string = isset($_GET['header']) ? urldecode($_GET['header']) : '';

$url = 'http://healthcall.gosutv.net/users/info';
$response = $client->get($url, [
	'headers'=>[
		'Authorization' => $header_string
	]
]);
ob_clean();
header('Access-Control-Allow-Origin : *');
echo $response->getBody();
?>
