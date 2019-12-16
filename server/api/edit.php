<?php

$link = get_db_link();

if($request['method'] === 'GET') {
  $userId = $request['query']['userId'];
  $sqlGetUserInfo =
  "SELECT *
  FROM users AS u
  WHERE u.userId = $userId";
  $userInfoObj = $link->query($sqlGetUserInfo);
  $userInfo = mysqli_fetch_assoc($userInfoObj);
  $response['body'] = $userInfo;
  send($response);
}

if($request['method'] === 'PUT') {
  $userId = intval($request['body']['userId']);
  $images = $request['body']['images'];
  $firstName = $request['body']['firstName'];
  $lastName = $request['body']['lastName'];
  $location = $request['body']['location'];
  $age = $request['body']['age'];
  $height = $request['body']['height'];
  $jobTitle = $request['body']['jobTitle'];
  $ethnicity = $request['body']['ethnicity'];
  $religion = $request['body']['religion'];
  $iLike = $request['body']['iLike'];
  $iAm = $request['body']['iAm'];
  $iAppreciate = $request['body']['iAppreciate'];

    $sqlUpdateInfo =
      "UPDATE users
      SET
        images = ?,
        firstName = ?,
        lastName = ?,
        location = ?,
        age = ?,
        height = ?,
        jobTitle = ?,
        ethnicity = ?,
        religion = ?,
        iLike = ?,
        iAm = ?,
        iAppreciate = ?
      WHERE userId = $userId";
    $stmt = $link->prepare($sqlUpdateInfo);
    $stmt->bind_param(
      "ssssdsssssss",
      $images,
      $firstName,
      $lastName,
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

    $sqlGetUserInfo =
      "SELECT * FROM users
       WHERE users.userId = $userId";
    $userInfoObj = $link->query($sqlGetUserInfo);
    $userInfo = mysqli_fetch_assoc($userInfoObj);
    $response['body'] = $userInfo;

  send($response);
}
