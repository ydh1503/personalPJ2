import mongoose from "mongoose";

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
    type: mongoose.Schema.Types.Mixed, // 다양한 타입 저장 가능, 객체 배열 JSON으로 사용
  },
});

// CharacterSchema를 바탕으로 Character모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("Item", ItemSchema);
