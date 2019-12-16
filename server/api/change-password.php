<?php

$link = get_db_link();

if($request['method'] === 'PUT') {
  $userId = $request['body']['userId'];
  $oldPassword = $request['body']['oldPassword'];
  $newPassword = $request['body']['newPassword'];

  $sqlCheckPassword =
  "SELECT u.userId
   FROM users AS u
   WHERE u.userId = '$userId' AND u.password = '$oldPassword'";
  $checkObj = $link->query($sqlCheckPassword);
  $check = mysqli_fetch_assoc($checkObj);

  if($check) {
    $sqlChangePassword =
    "UPDATE users
    SET password = '$newPassword'
    WHERE userId = '$userId'";
    $resultObj = $link->query($sqlChangePassword);
    $result = mysqli_fetch_assoc($resultObj);
    $response['body'] = 'update password successfully';
  } else {
    $response['body'] = 'wrong password';
  }

  send($response);
}
