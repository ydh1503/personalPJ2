import express from 'express';
import connect from './schemas/index.js';
import CharacterRouter from './routes/characters.router.js';
import ItemRouter from './routes/items.router.js';

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
  <h1>구현된 API(/api)</h1>
    <h2>캐릭터(/characters)</h2>
      <h4>POST: 캐릭터 생성</h4>
        <h5>req 예시) </h5>
          {<br>
            "name":"테스트6"<br>
          }<br>
          <br>
      <h3>Path Parameter(/:character_id)</h3>
      <h4>GET   : 캐릭터 상세조회</h4>
      <h4>DEL   : 캐릭터 삭제</h4>
      <br>
    <h2>아이템(/items)</h2>
      <h4>POST  : 아이템 생성</h4>
        <h5>req 예시)</h5>
          {<br>
            "item_code": 9,<br>
            "item_name": "신의 팔찌",<br>
            "item_stat": { }<br>
          }<br>
      <h4>GET   : 아이템 목록 조회</h4>
      <br>
      <h3>Path Parameter(/:item_code)</h3>
      <h4>GET   : 아이템 상세 조회</h4>
      <h4>PATCH : 아이템 수정</h4>
        <h5>req 예시)</h5>
          {<br>
            "item_name": "여신의 팔찌",<br>
            "item_stat": { "health": 20, "power": 3 }<br>
          }<br>
  `);
});

app.use('/api', [CharacterRouter, ItemRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
