import express from 'express';
import Equip from '../schemas/equips.schema.js';
import Character from '../schemas/characters.schema.js';
import Item from '../schemas/items.schema.js';

const router = express.Router();

// 캐릭터가 장착한 아이템 목록 조회 API
router.get('/equips/:character_id', async (req, res) => {
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
    character_id: character_id,
    equips: [],
  };

  const currentEquip = await Equip.findOne({ character_id }).exec();

  if (!currentEquip) {
    return res.status(200).json({ data });
  }

  currentEquip.equips.forEach(async (item_code) => {
    const currentItem = await Item.findOne({ item_code }).exec();

    if (!currentItem) {
      return res.status(404).json({
        errorMessage: `아이템(item_code:${item_code}) 조회에 실패하였습니다.`,
      });
    }

    data.equips.push({
      item_code: currentItem.item_code,
      item_name: currentItem.item_name,
    });
  });

  return res.status(200).json({ data });
});

// 아이템 장착 API
router.post('/equips/:character_id', async (req, res) => {
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

  const { item_code } = req.body;

  if (isNaN(item_code)) {
    return res
      .status(400)
      .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
  }

  const currentItem = await Item.findOne({ item_code }).exec();

  if (!currentItem) {
    return res.status(404).json({
      errorMessage: `아이템 조회에 실패하였습니다.`,
    });
  }

  const currentEquip = await Equip.findOne({ character_id }).exec();

  let equip;
  if (currentEquip) {
    // return res
    //   .status(404)
    //   .json({ errorMessage: '이미 존재하는 캐릭터 장비창입니다.' });
    equip = currentEquip;
    equip.equips.push(item_code);
  } else {
    equip = new Equip({
      character_id,
      equips: [item_code],
    });
  }

  const baseCharacterData = {
    health: currentCharacter.health,
    power: currentCharacter.power,
  };

  currentCharacter.health += currentItem.item_stat.health;
  currentCharacter.power += currentItem.item_stat.power;

  await currentCharacter.save();

  const patchedCharacterData = {
    health: currentCharacter.health,
    power: currentCharacter.power,
  };

  await equip.save();

  return res.status(201).json({
    message: `캐릭터 '${currentCharacter.name}'가 아이템 '${currentItem.item_name}'를 장착했습니다!`,
    Before: baseCharacterData,
    After: patchedCharacterData,
  });
});

// 아이템 탈착 API

export default router;
