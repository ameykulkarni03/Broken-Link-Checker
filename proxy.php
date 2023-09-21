<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (replace * with your domain if necessary)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Get the URL to fetch from the query parameters
$url = $_GET['url'];

if (!$url) {
    http_response_code(400);
    echo json_encode(array('error' => 'URL parameter is required'));
    exit();
}

// Use cURL to fetch the content from the external URL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
$response = curl_exec($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(array('error' => 'Internal server error'));
} else {
    // Check the HTTP status code of the response
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode === 200) {
        http_response_code(200);
    } else {
        http_response_code($httpCode);
    }

    // Close the cURL session and return the response
    curl_close($ch);
    echo $response;
}
