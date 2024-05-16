import express from 'express';
import Character from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 생성 API
router.post('/characters', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  } else if (await Character.findOne({ name: name }).exec()) {
    return res
      .status(404)
      .json({ errorMessage: '이미 존재하는 캐릭터 명입니다.' });
  }

  const characterMaxId = await Character.findOne().sort('-character_id').exec();
  const id = characterMaxId ? characterMaxId.character_id + 1 : 1;

  const character = new Character({
    character_id: id,
    name,
  });

  await character.save();

  const data = {
    character_id: character.character_id,
  };

  return res.status(201).json({
    message: `새로운 캐릭터 '${character.name}'를 생성하셨습니다!`,
    data,
  });
});

// 캐릭터 삭제 API
router.delete('/characters/:character_id', async (req, res) => {
  const id = req.params.character_id;

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  const character = await Character.findOne({ character_id: id }).exec();

  if (!character) {
    return res
      .status(404)
      .json({ errorMessage: '캐릭터 조회에 실패하였습니다.' });
  }

  const name = character.name;

  await Character.deleteOne({ character_id: id }).exec();

  return res
    .status(200)
    .json({ message: `캐릭터 '${name}'를 삭제하였습니다.` });
});

// 캐릭터 상세 조회 API
router.get('/characters/:character_id', async (req, res) => {
  const { character_id } = req.params;

  if (isNaN(character_id)) {
    return res
      .status(400)
      .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  const currentCharacter = await Character.findOne({ character_id }).exec();

  if (!currentCharacter) {
    return res
      .status(404)
      .json({ errorMessage: '캐릭터 조회에 실패하였습니다.' });
  }

  const data = {
    name: currentCharacter.name,
    health: currentCharacter.health,
    power: currentCharacter.power,
  };
  return res.status(200).json({ data });
});

export default router;
