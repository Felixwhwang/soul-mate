<?php
$link = get_db_link();
if($request['method'] === 'POST') {
  $message = $request['body']['message'];
  $idFrom = $request['body']['idFrom'];
  $idTo = $request['body']['idTo'];

  if(!$message) {
    throw new ApiError('Something wrong with request query', 400);
  } else {
    $sqlInsertMessage =
    "INSERT INTO messages (idFrom, idTo, message, createdAt)
     VALUES (?,?,?,CURRENT_TIMESTAMP)";
    $stmt = $link->prepare($sqlInsertMessage);
    $stmt->bind_param("dds", $idFrom, $idTo, $message);
    $stmt->execute();
    $messageId = $link->insert_id;

    $sqlGetInsertMessage =
    "SELECT m.idFrom, m.message, u.images, m.createdAt
     FROM messages AS m
     JOIN users AS u
     ON m.idFrom = u.userId
     WHERE m.messageId = $messageId";
    $newMessageObj = $link->query($sqlGetInsertMessage);
    $newMessage = mysqli_fetch_assoc($newMessageObj);
    $response['body'] = $newMessage;
  }
  send($response);
}

if($request['method'] === 'GET') {
  $idFrom = intval($request['query']['idFrom']);
  $idTo = intval($request['query']['idTo']);

  if(isset($idFrom) && is_numeric($idFrom) && $idFrom !==0
  && isset($idTo) && is_numeric($idTo) && $idTo !==0) {
    $sqlGetMessage =
    "SELECT m.idFrom, m.message, u.images, m.createdAt
     FROM messages AS m
     JOIN users AS u
     ON u.userId = m.idFrom
     WHERE (m.idFrom = $idFrom AND m.idTo = $idTo)
     OR (m.idFrom = $idTo AND m.idTo = $idFrom)";
    $messageObj = $link->query($sqlGetMessage);
    $messages = mysqli_fetch_all($messageObj, MYSQLI_ASSOC);
    $response['body'] = $messages;
  } else {
    throw new ApiError('Something wrong with request query', 400);
  }

  send($response);
}
