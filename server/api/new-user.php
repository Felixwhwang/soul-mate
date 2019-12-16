<?php

$link = get_db_link();

if($request['method'] === 'POST') {
  //get infomation from frontend
  $email = $request['body']['email'];
  $password = $request['body']['password'];
  $images = $request['body']['images'];
  $firstName = $request['body']['firstName'];
  $lastName = $request['body']['lastName'];
  $gender = $request['body']['gender'];
  $location = $request['body']['city'] . ', ' . $request['body']['state'];
  $age = $request['body']['age'];
  $height = $request['body']['height'];
  $jobTitle = $request['body']['jobTitle'];
  $ethnicity = $request['body']['ethnicity'];
  $religion = $request['body']['religion'];
  $iLike = $request['body']['iLike'];
  $iAm = $request['body']['iAm'];
  $iAppreciate = $request['body']['iAppreciate'];

  $sqlCheckEmail =
  "SELECT email
    FROM users AS u
    WHERE u.email = ?";
  $stmt = $link->prepare($sqlCheckEmail);
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $matchedUserObj = $stmt->get_result();
  $matchedUserObj = mysqli_fetch_assoc($matchedUserObj);

  if(!$matchedUserObj) {
    //insert query
    $sqlInsertInfo =
      "INSERT INTO users (email, password, images, firstName, lastName, gender,
        location, age, height, jobTitle, ethnicity, religion, iLike, iAm,
        iAppreciate, createdAt)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    $stmt = $link->prepare($sqlInsertInfo);
    $stmt->bind_param(
      "sssssssdsssssss",
      $email,
      $password,
      $images,
      $firstName,
      $lastName,
      $gender,
      $location,
      $age,
      $height,
      $jobTitle,
      $ethnicity,
      $religion,
      $iLike,
      $iAm,
      $iAppreciate
    );
    $stmt->execute();
    $userId = $link->insert_id;

    //prepare new user info for frontend
    $sqlGetUserInfo =
      "SELECT * FROM users
       WHERE users.userId = $userId";
    $newUserObj = $link->query($sqlGetUserInfo);
    $newUserInfo = mysqli_fetch_assoc($newUserObj);
    $response['body'] = $newUserInfo;
  } else {
    $response['body'] = 'email has already exist';
  }

  send($response);
}
