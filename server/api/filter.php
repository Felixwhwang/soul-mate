<?php

$link = get_db_link();

if($request['method']==='POST') {
    
    $userId = intval($request['body']['userId']);
    $city = $request['body']['city'];
    $state = $request['body']['state'];
    $ethnicity = $request['body']['ethnicity'];
    $religion = $request['body']['religion'];
    $ageMin = $request['body']['ageMin'];
    $ageMax = $request['body']['ageMax'];
    $heightMinFeet = $request['body']['heightMinFeet'];
    $heightMinInch = $request['body']['heightMinInch'];
    $heightMaxFeet = $request['body']['heightMaxFeet'];
    $heightMaxInch = $request['body']['heightMaxInch'];

    $sqlCheckFilterData =
    "SELECT f.userId
     FROM filters AS f
     WHERE f.userId = $userId";
    $stmt = $link->prepare($sqlCheckFilterData);
    $stmt->bind_param("d", $userId);
    $stmt->execute();
    $matchedUserObj = $stmt->get_result();
    $matchedUserObj = mysqli_fetch_assoc($matchedUserObj);
    

    if(!$matchedUserObj) {
        $sqlMakeNewFilterData = 
        "INSERT INTO filters (userId, city, state, ethnicity, religion,
         ageMin, ageMax, heightMinFeet, heightMinInch, heightMaxFeet, heightMaxInch)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $link->prepare($sqlMakeNewFilterData);
        $stmt->bind_param(
            "dssssddssss",
            $userId,
            $city,
            $state,
            $ethnicity,
            $religion,
            $ageMin,
            $ageMax,
            $heightMinFeet,
            $heightMinInch,
            $heightMaxFeet,
            $heightMaxInch
        );
        $stmt->execute();
    }

    $response['body'] = 'success';
    send($response);
}

if ($request['method']==='PUT') {

    $userId = intval($request['body']['userId']);
    $city = $request['body']['city'];
    $state = $request['body']['state'];
    $ethnicity = $request['body']['ethnicity'];
    $religion = $request['body']['religion'];
    $ageMin = $request['body']['ageMin'];
    $ageMax = $request['body']['ageMax'];
    $heightMinFeet = $request['body']['heightMinFeet'];
    $heightMinInch = $request['body']['heightMinInch'];
    $heightMaxFeet = $request['body']['heightMaxFeet'];
    $heightMaxInch = $request['body']['heightMaxInch'];

    $sqlUpdateFilterData = 
    "UPDATE filters
    SET `city`='$city',
        `state`='$state',
        `ethnicity`='$ethnicity',
        `religion`='$religion',
        `ageMin`=$ageMin,
        `ageMax`=$ageMax,
        `heightMinFeet`='$heightMinFeet',
        `heightMinInch`='$heightMinInch',
        `heightMaxFeet`='$heightMaxFeet',
        `heightMaxInch`='$heightMaxInch'
    WHERE `userId`=$userId
    ";
    $stmt = $link->prepare($sqlUpdateFilterData);
    $stmt->execute();
    $response['body'] = 'sucessfully updated';
    send($response);
}

if ($request['method']==='GET') {
    $userId = $request['query']['userId'];
    $sqlGetFilter = 
    "SELECT * 
    FROM filters
    WHERE userId = $userId";
    $filterInfoObj = $link->query($sqlGetFilter);
    $filterInfo = mysqli_fetch_assoc($filterInfoObj);
    $response['body'] = $filterInfo;
    send($response);
}