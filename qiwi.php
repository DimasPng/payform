<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$yourNumber = "79894562532"
$url = 'https://edge.qiwi.com/funding-sources/v2/persons/{yourNumber}!/accounts';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Accept: application/json',
    'Authorization: Bearer 1f856712f1c21f4695c3662b9492f470'
));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
?>
