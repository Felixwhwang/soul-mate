<?php

$link = get_db_link();

if($request['method'] === 'POST') {
  $userId = intval($request['body']['userId']);
  $message = $request['body']['message'];
  $picture = $request['body']['picture'];
  $like = 0;

  $sqlInsertMoment =
  "INSERT INTO moments (userId, message, likes, picture, createdAt)
   VALUE (?,?,?,?,CURRENT_TIMESTAMP)";
  $stmt = $link->prepare($sqlInsertMoment);
  $stmt->bind_param(
    "dsds",
    $userId,
    $message,
    $like,
    $picture
  );
  $stmt->execute();
  $momentId = $link->insert_id;

  $sqlGetLastMoment =
  "SELECT * FROM moments AS m
   WHERE m.momentId = $momentId";
  $newMomentObj = $link->query($sqlGetLastMoment);
  $newMoment = mysqli_fetch_assoc($newMomentObj);
  $response['body'] = $newMoment;

  send($response);
}

if($request['method'] === 'GET') {
  $gender = $request['query']['gender'];
  if($gender == 'Male'){
    $gender = 'Female';
  } else {
    $gender = 'Male';
  }
  $sqlGetMoments =
  "SELECT m.momentId, m.userId, m.message, m.likes, m.picture, m.createdAt, u.images, u.firstName
   FROM moments AS m
   JOIN users AS u
   ON m.userId = u.userId
   WHERE u.gender = '$gender';
   ";
  $momentsObj = $link->query($sqlGetMoments);
  $moments = mysqli_fetch_all($momentsObj, MYSQLI_ASSOC);
  $response['body'] = $moments;
  send($response);
}
