<?php

$link = get_db_link();

if($request['method'] === 'GET') {
  $idTo = intval($request['query']['idTo']);

  //users like current user
  $sqlListLikesOne =
  "SELECT l.createdAt, u.firstName, u.images, u.userId
   FROM likes AS l
   JOIN users AS u
   ON l.idFrom = u.userId
   WHERE l.isLike = true AND l.idTo = $idTo";
   $resultObjOne = $link->query($sqlListLikesOne);
   $resultOne = mysqli_fetch_all($resultObjOne, MYSQLI_ASSOC);

  //current user likes users
  $sqlListLikesTwo =
  "SELECT l.createdAt, u.firstName, u.images
   FROM likes AS l
   JOIN users AS u
   ON l.idTo = u.userId
   WHERE l.isLike = true AND l.idFrom = $idTo";
  $resultObjTwo = $link->query($sqlListLikesTwo);
  $resultTwo = mysqli_fetch_all($resultObjTwo, MYSQLI_ASSOC);

  //get users who only likes current user, but current user doesn't like back yet
  $result = [];
  foreach($resultOne as $valueOne) {
    $check = false;
    foreach($resultTwo as $valueTwo) {
      if($valueOne['firstName'] == $valueTwo['firstName']) {
        $check = true;
        break;
      }
    }
    if($check == false) {
      array_push($result, $valueOne);
    }
  }

  //current user doesn't likes users
  $sqlListLikesThree =
  "SELECT l.createdAt, u.firstName, u.images
   FROM likes AS l
   JOIN users AS u
   ON l.idTo = u.userId
   WHERE l.isLike = false AND l.idFrom = $idTo";
  $resultObjThree = $link->query($sqlListLikesThree);
  $resultThree = mysqli_fetch_all($resultObjThree, MYSQLI_ASSOC);

  //check result users if in current user's dislike list
  $finalResult = [];
  foreach ($result as $value) {
    $check = false;
    foreach ($resultThree as $valueThree) {
      if ($value['firstName'] == $valueThree['firstName']) {
        $check = true;
        break;
      }
    }
    if ($check == false) {
      array_push($finalResult, $value);
    }
  }

   $response['body'] = $finalResult;
   send($response);
}


if($request['method'] === 'POST') {
  $idFrom = intval($request['body']['idFrom']);
  $idTo = intval($request['body']['idTo']);
  $isLike = $request['body']['isLike'];

  $sqlCheckExist =
  "SELECT * FROM likes AS l
   WHERE l.idFrom = $idFrom AND l.idTo = $idTo";
  $resultObj = $link->query($sqlCheckExist);
  $result = mysqli_fetch_assoc($resultObj);

  if(!$result) {
    $sqlLikes =
      "INSERT INTO likes (idFrom, idTo, isLike, createdAt)
   VALUES (?,?,$isLike,CURRENT_TIMESTAMP)";
    $stmt = $link->prepare($sqlLikes);
    $stmt->bind_param("dd", $idFrom, $idTo);
    $stmt->execute();
    $response['body'] = 'succefully insert';
  } else {
    $response['body'] = 'exist info';
  }

  send($response);
}
