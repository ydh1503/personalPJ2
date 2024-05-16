import express from "express";
import Character from "../schemas/characters.schema.js";

const router = express.Router();

// 캐릭터 생성 API
router.post("/characters", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ errorMessage: "캐릭터 명이 기입되지 않았습니다." });
  } else if (await Character.findOne({ name: name }).exec()) {
    return res
      .status(404)
      .json({ errorMessage: "이미 존재하는 캐릭터 명입니다." });
  }

  const characterMaxId = await Character.findOne().sort("-character_id").exec();
  const id = characterMaxId ? characterMaxId.character_id + 1 : 1;

  const HEALTH = 500;
  const POWER = 100;

  const character = new Character({
    id,
    name,
    HEALTH,
    POWER,
  });

  await character.save();

  return res.status(201).json({ id: character.character_id });
});

// 캐릭터 삭제 API
router.delete("/characters/:character_id", async (req, res) => {
  const { id } = req.params;

  const character = await Character.findById(id).exec();

  if (!character) {
    return res
      .status(404)
      .json({ errorMessage: "존재하지 않는 캐릭터 입니다." });
  }

  await Character.deleteOne({ character_id: id }).exec();

  return res.status(200).json({});
});

// 캐릭터 상세 조회 API
router.get("/characters/:character_id", async (req, res) => {
  const { id } = req.params;

  const currentCharacter = await Character.findById(id).exec();

  if (!currentCharacter) {
    return res
      .status(404)
      .json({ errorMessage: "존재하지 않는 캐릭터입니다." });
  }

  const character = {
    name: currentCharacter.name,
    health: currentCharacter.health,
    power: currentCharacter.power,
  };
  return res.status(200).json({ character });
});

export default router;
