<?php

$link = get_db_link();

if($request['method'] == 'GET') {
  $userId = intval($request['query']['userId']);

  $sqlGetUserData =
  "SELECT *
   FROM users
   WHERE users.userId = $userId";
  $userDataObj = $link->query($sqlGetUserData);
  $userData = mysqli_fetch_assoc($userDataObj);
  $response['body'] = $userData;
  send($response);
}
