---
title: Webgoat-SQLInjeciton, Dreamhack-xss-1 문제풀이
date: 2026-09-23
category: ctfwargame
tags:
  - reflected_xss
  - sqlinjection
  - webhacking
  - evision
---
# 1. SQL Injection (intro) 11, 13 문제풀이

## 11번

#### 실습 보고서(Write-up) 작성

* 테이블의 모든 데이터를 가져오기 위해서는 WHERE 의 조건을 항상 참으로 만들어야 한다.
* AND가 OR보다 우선순위가 낮기 때문에 앞에 어떤 내용이 오든 마지막에 OR과 참인 조건이 오면 WHERE 문은 항상 참이 됨을 이용했다.
* auth_tan 자리에 작은따옴표를 닫고 OR과 함께 항상 참인 ‘1’=’1’이 적용되도록 ‘1’=’1 을 입력했다.



#### 사용한 SQL Injection Payload:

Employee Name: Jane

Authentication TAN: 1234 OR ‘1’=’1

#### 공격이 성공한 이유:

last_name과 auth_tan이 모두 일치하는 데이터만 가져오던 SQL문이 뒤의 ‘1’=’1’로 인해 모든 데이터를 가져오는 SQL문으로 변경되어 공격이 성공했다.

```
SELECT * FROM employees 
WHERE last_name = 'JANE' AND auth_tan = '**1234' OR '1'='1**';
```

## 13번

#### 실습 보고서(Write-up) 작성

1. 데이터를 지우기 위한 칼럼 확인

SELECT

→ 이전에 입력한 SELECT문이 나온다. ACTION 테이블로 데이터 지울 수 있음을 확인했다.

2. 데이터 지우기 시도

SELECT'; DELETE FROM access_log WHERE ACTION LIKE 'Jane

→ There is still evidence of what you did. Better remove the whole table. 문장 출력

→ 테이블을 삭제해야함을 알 수 있었다. 

3. 테이블 삭제

UPDATE'; DROP TABLE access_log; SELECT * FROM employees WHERE '1'='1

→ 임의의 검색어를 입력 후 쿼리문을 마무리했다.

→ DROP, TRUNCATE 중 어느 것을 써도 끝의 작은따옴표를 지울 수 없었다.

→ DROP문을 끝낸 후 SELECT문을 써서 작은따옴표를 처리했다.

#### Webgoat 성공 화면 캡처

[##*Image|kage@bevuEb/dJMcah0fdWM/AAAAAAAAAAAAAAAAAAAAAGr-CK3R8AukJXwiJB7UAP5WnY8bLrmzujowGwyzH92l/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1796050799&amp;allow_ip=&amp;allow_referer=&amp;signature=w0blRbD2Iq%2F9u5faB6WlYEX%2Buro%3D|CDM|1.3|{"originWidth":1482,"originHeight":640,"style":"alignCenter","width":746,"height":322}*##]

#### 사용한 SQL Injection Payload:

UPDATE'; DROP TABLE access_log; SELECT * FROM employees WHERE '1'='1

#### 공격이 성공한 이유:

* 예상 SQL문

```
SELECT * FROM access_log WHERE ACTION LIKE 'action_contain';
```

* 바뀐 SQL문

```
SELECT * FROM access_log WHERE ACTION LIKE 'UPDATE'; DROP TABLE access_log; SELECT * FROM employees WHERE '1'='1';
```

검색하는 문장을 ‘;’을 이용해 기존의 SQL문을 끝낸 후 테이블을 제거하는 DROP문을 작성했다. 뒤에 문자열이 등장하는 쿼리를 추가로 작성하여 ‘’’를 지웠다. 이를 통해 ACTION 칼럼에서 검색어 문자열이 존재하는 데이터를 가져오는 SQL문이 ‘UPDATE’를 검색한 후 access_log 테이블을 삭제하고 employees 테이블의 모든 데이터를 조회하는 SQL문들로 변경되어 공격이 성공했다.

# 2. Dreamhack - xss-1 풀기(reflected xss 내용)

#### 공격 원리 write-up 작성

* vuln(xss) page에서 param에 작성한 입력값이 그대로 HTML에 출력되면서 <script> 태그를 통해 alert(1)이 작동하는 모습을 볼 수 있다.
* /flag에서 제출을 누르면 URL 확인하는 봇이 해당 URL을 방문한다
* <script>location.href='/memo?memo='+document.cookie;</script>→ /memo?memo=document.cookie 를 방문하면서 자동으로 document.cookie 값이 memo에 기록
* → 로봇이 입력한 param 읽어 <script> 안의 JS 코드가 실행
* document.cookie 현재 접속 중인 웹사이트에서 브라우저에 저장해 둔 쿠키 정보를 가져오는 JS 명령어
