<?php
if($request['method'] === 'POST') {

  //here image name is extension
  $file_name = $_FILES['image']['name'];
  $file_temp = $_FILES['image']['tmp_name'];

  $imageName = time() . "." . $file_name;
  $target = "../public/images/" . $imageName;
  move_uploaded_file($file_temp, $target);
  $response['body'] = $target;

  send($response);
}
