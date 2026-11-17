<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];

$to = 'uxhub09@gmail.com';
$subject = $data['subject'] ?? '[UX Hub Lead] Form Submission';
$text = $data['text'] ?? json_encode($data, JSON_PRETTY_PRINT);
$replyTo = $data['replyTo'] ?? ($data['formData']['email'] ?? 'hello@uxhub.in');

function sendGmailSmtp($to, $subject, $body, $replyTo) {
    $host = 'ssl://smtp.gmail.com';
    $port = 465;
    $username = 'uxhub09@gmail.com';
    $password = 'jbhrdwhzmrmkahdh';

    $socket = @fsockopen($host, $port, $errno, $errstr, 12);
    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        $data = "";
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === " ") {
                break;
            }
        }
        return $data;
    };

    $send = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $res = $read();
    if (substr($res, 0, 3) !== '220') { fclose($socket); return false; }

    $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'uxhubglobal.com'));
    $res = $read();

    $send("AUTH LOGIN");
    $res = $read();
    if (substr($res, 0, 3) !== '334') { fclose($socket); return false; }

    $send(base64_encode($username));
    $res = $read();
    if (substr($res, 0, 3) !== '334') { fclose($socket); return false; }

    $send(base64_encode($password));
    $res = $read();
    if (substr($res, 0, 3) !== '235') { fclose($socket); return false; }

    $send("MAIL FROM:<$username>");
    $res = $read();
    if (substr($res, 0, 3) !== '250') { fclose($socket); return false; }

    $send("RCPT TO:<$to>");
    $res = $read();
    if (substr($res, 0, 3) !== '250') { fclose($socket); return false; }

    $send("DATA");
    $res = $read();
    if (substr($res, 0, 3) !== '354') { fclose($socket); return false; }

    $b64Subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        "From: \"UX Hub System\" <$username>",
        "To: <$to>",
        "Reply-To: <$replyTo>",
        "Subject: $b64Subject",
        "Date: " . date('r'),
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit"
    ];

    $cleanBody = str_replace("\r\n.", "\r\n..", $body);
    $send(implode("\r\n", $headers) . "\r\n\r\n" . $cleanBody . "\r\n.");
    $res = $read();
    if (substr($res, 0, 3) !== '250') { fclose($socket); return false; }

    $send("QUIT");
    fclose($socket);
    return true;
}

$sent = false;
try {
    $sent = sendGmailSmtp($to, $subject, $text, $replyTo);
} catch (Exception $e) {
    $sent = false;
}

if (!$sent) {
    // Fallback to PHP native mail()
    $headers = [
        'From: "UX Hub System" <uxhub09@gmail.com>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8'
    ];
    $sent = @mail($to, $subject, $text, implode("\r\n", $headers));
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to deliver email through SMTP and mail()']);
}
