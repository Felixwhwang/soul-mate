<?php

$link = get_db_link();

if($request['method'] === 'GET') {
  $sqlDeleteLikes =
  "DELETE FROM likes WHERE idFrom = 1 AND idTo != 10";
  $link -> query($sqlDeleteLikes);

  $sqlResetPassword =
  "UPDATE users SET password = 'pass' WHERE userId = 1";
  $link -> query($sqlResetPassword);

  $response['body'] = 'reset';
  send($response);
}

?>
