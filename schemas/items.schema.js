import mongoose from 'mongoose';

const ItemStatSchema = new mongoose.Schema(
  {
    health: {
      type: Number,
      default: 0,
    },
    power: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const ItemSchema = new mongoose.Schema({
  item_code: {
    type: Number,
    required: true, // 필수요소 - 아이템 코드
    unique: true, // 중복불가 - 아이템 코드
  },
  item_name: {
    type: String,
    required: true, // 필수요소 - 아이템 명
  },
  item_stat: {
    type: ItemStatSchema, // 서브Schema(ItemStatSchema) 선언 및 사용
  },
});

// ItemSchema를 바탕으로 Item모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model('Item', ItemSchema);
