---
title: Prepared Statement
date: 2026-09-16
category: techblog
tags:
  - sqlinjection
  - webhacking
  - evision
---
## 2\. Prepared Statement를 이용한 방어 방법으로 코드 수정 및 설명

#### SQL 문장과 사용자 입력값을 분리하여 처리하기

**\[기존 코드\]**

```
<?php

$id = $_POST['id'];
$password = $_POST['password'];

$sql = "SELECT * FROM users
WHERE id = '$id'
AND password = '$password'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
echo "로그인 성공";
} 
else {
echo "로그인 실패";
}

?>
```

-   $변수명 : 변수 선언 (대입 값에 따라 데이터타입 자동 결정)
-   사용자 입력값(username, password) → superglobal 변수로 가져오기 ($\_POST/$\_GET)
-   echo : 출력
-   “$a” → 변수 값이 그대로 들어가 출력
-   ‘$a’ → 변수 값이 들어가지 않고 문자열 그대로 출력

-   서버와 DB 연결 통로를 $conn 객체에 저장
-   mysqli\_query($conn, sql문) : sql문 바로 실행 후 $result에 Result Object 저장됨

**\[수정 코드\]**

```
<?php

$id = $_POST['id'];
$password = $_POST['password'];

$sql = "SELECT * FROM users
WHERE id = ?
AND password = ?";

$stmt = $conn -> prepare($sql);

$stmt -> bind_param("ss", $id, $password);
$stmt -> execute();
$result = $stmt -> get_result();


if (mysqli_num_rows($result) > 0) {
echo "로그인 성공";
} 
else {
echo "로그인 실패";
}

?>
```

1.  $conn -> prepare() : ‘?’ 로 채워진 SQL문을 DB에 전달하여 미리 컴파일
2.  $stmt -> bind\_param() : $id, $password를 차례로 문자열(s), 문자열(s)로 parameter에 대입

→ 사용자의 입력값이 SQL문과 함께 문자열로 합쳐져 한 번에 DB 엔진에 들어가는 일 X
