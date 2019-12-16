<?php
$link = get_db_link();
if($request['method'] === 'GET') {
  $idFrom = $request['query']['idFrom'];

  $sqlMatchOne =
  "SELECT u.firstName, u.images, u.userId
   FROM likes AS l
   JOIN users AS u
   ON l.idTo = u.userId
   WHERE (l.idFrom = $idFrom AND l.isLike = true)";
  $resultObjOne = $link->query($sqlMatchOne);
  $resultOne = mysqli_fetch_all($resultObjOne, MYSQLI_ASSOC);

  $sqlMatchTwo =
  "SELECT u.firstName, u.images, u.userId
   FROM likes AS l
   JOIN users AS u
   ON l.idFrom = u.userId
   WHERE (l.idTo = $idFrom AND l.isLike = true)";
  $resultObjTwo = $link->query($sqlMatchTwo);
  $resultTwo = mysqli_fetch_all($resultObjTwo, MYSQLI_ASSOC);

  $result = [];
  foreach($resultOne as $valueOne) {
    foreach($resultTwo as $valueTwo){
      if($valueOne['firstName'] == $valueTwo['firstName']){
        array_push($result, $valueOne);
      }
    }
  }

  $response['body'] = $result;
  send($response);
}
