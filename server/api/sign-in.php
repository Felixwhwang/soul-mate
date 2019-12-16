<?php
$link = get_db_link();

if($request['method'] === 'POST') {
  $email = $request['body']['email'];
  $password = $request['body']['password'];
  //check if request body is empty or not
  if(!$email) {
    $response['body'] = 'empty input';
  } else {
    //get email from database
    //prevent SQL injection
    $sqlCheckEmail =
    "SELECT *
     FROM users AS u
     WHERE u.email = ?";
    $stmt = $link->prepare($sqlCheckEmail);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $matchedUserObj = $stmt->get_result();
    $matchedUser = mysqli_fetch_assoc($matchedUserObj);
    //check if user exist in database
    if(!$matchedUser) {
      $response['body'] = 'no user exist';
    } else {
      //check if password is correct
      if ($matchedUser['password'] === $password) {
        $response['body'] = $matchedUser;
      } else {
        $response['body'] = 'wrong password';
      }
    }
  }
  send($response);
}
