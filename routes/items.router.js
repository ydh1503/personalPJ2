import express from 'express';
import Item from '../schemas/items.schema.js';

const router = express.Router();

// 아이템 생성 API
router.post('/items', async (req, res, next) => {
  try {
    const { item_code, item_name, item_stat } = req.body;

    if (!item_code || !item_name) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    } else if (await Item.findOne({ item_code }).exec()) {
      return res
        .status(404)
        .json({ errorMessage: '이미 존재하는 아이템 코드입니다.' });
    }

    const item = new Item({
      item_code,
      item_name,
      item_stat,
    });

    await item.save();

    const data = {
      item_code: item.item_code,
      item_name: item.item_name,
      item_stat: item.item_stat,
    };

    return res.status(201).json({
      message: `새로운 아이템 '${item.item_name}'를 생성하셨습니다!`,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 아이템 수정 API
router.patch('/items/:item_code', async (req, res) => {
  try {
    const { item_code } = req.params;

    if (isNaN(item_code)) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    const { item_name, item_stat } = req.body;

    if (!item_name && !item_stat) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    const currentItem = await Item.findOne({ item_code }).exec();

    if (!currentItem) {
      return res
        .status(404)
        .json({ errorMessage: '아이템 조회에 실패하였습니다.' });
    }

    const baseData = {
      item_name: currentItem.item_name,
      item_stat: currentItem.item_stat,
    };

    if (item_name) currentItem.item_name = item_name;
    if (item_stat) currentItem.item_stat = item_stat;

    await currentItem.save();

    const patchedData = {
      item_name: currentItem.item_name,
      item_stat: currentItem.item_stat,
    };

    return res.status(200).json({
      message: `기존 아이템 '${baseData.item_name}'를 수정하셨습니다!`,
      baseData: baseData,
      patchedData: patchedData,
    });
  } catch (error) {
    next(error);
  }
});

// 아이템 목록 조회 API
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort('item_code').exec();

    const data = [];
    for (const item of items) {
      const tmp = {
        item_code: item.item_code,
        item_name: item.item_name,
      };
      data.push(tmp);
    }
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// 아이템 상세 조회 API
router.get('/items/:item_code', async (req, res) => {
  try {
    const { item_code } = req.params;

    if (isNaN(item_code)) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    const currentItem = await Item.findOne({ item_code }).exec();

    if (!currentItem) {
      return res
        .status(404)
        .json({ errorMessage: '아이템 조회에 실패하였습니다.' });
    }

    const data = {
      item_code: currentItem.item_code,
      item_name: currentItem.item_name,
      item_stat: currentItem.item_stat,
    };

    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

export default router;
