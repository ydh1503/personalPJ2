## 배포링크
[링크](http://ydh1503-sparta.store:3000/)

# API 명세서
|기능|API URL|Method|request|response|response(error)|
|---|---|---|---------------|-----------------|-----------------|
|캐릭터 생성|/api/characters|POST|{<br>"name": "호호아줌마"<br>}|{<br>  "message": "새로운 캐릭터 ‘호호아줌마’를 생성하셨습니다!"<br>  "data": {<br>    "character_id": 321<br>  }<br>}<br>|# 400 body를 입력받지 못한 경우<br>{ errorMessage: '데이터 형식이 올바르지 않습니다.' }|
|캐릭터 상세 조회|/api/characters/:character_id|GET|{ }|
|캐릭터 삭제|/api/characters/:character_id|DELETE|{ }|
|아이템 생성|/api/items|POST|
|아이템 목록 조회|/api/items|GET|
|아이템 상세 조회|/api/items/:item_code|GET|
|아이템 수정|/api/items/:item_code|PATCH|