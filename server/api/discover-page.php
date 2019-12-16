<?php

$link = get_db_link();

if($request['method'] === 'POST') {
    $gender = $request['body']['gender'];

    if($gender == 'Male') {
       $gender = 'Female';
    } else {
       $gender = 'Male';
    }
    $getAllFemaleUsersql = "select *
       from users
       where gender = '$gender'";
    $result = $link->query($getAllFemaleUsersql);
    $users = $result->fetch_all(MYSQLI_ASSOC);

    $currentUserId = $request['body']['userId'];

    $sqlGetUsers =
    "SELECT l.idTo
     FROM likes AS l
     WHERE l.idFrom = $currentUserId";
     $userDislike = mysqli_fetch_all($link->query($sqlGetUsers), MYSQLI_ASSOC);

   $result=[];
   foreach($users as $userValue) {
      $check = true;
      foreach($userDislike as $dislikeValue){
         if($userValue['userId'] == $dislikeValue['idTo']){
            $check = false;
            break;
         }
      }
      if($check) {
         array_push($result, $userValue);
      }
   }

   $response['body'] = $result;
   send($response);
}
