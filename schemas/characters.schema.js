import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    required: true, // 필수요소 - 캐릭터 id
    unique: true, // 중복불가 - 캐릭터 id
  },
  name: {
    type: String,
    required: true, // 필수요소 - 캐릭터 명
    unique: true, // 중복불가 - 캐릭터 명
  },
  health: {
    type: Number,
    default: 500, // 기본 값 - 체력
  },
  power: {
    type: Number,
    default: 100, // 기본 값 - 힘
  },
});

// CharacterSchema를 바탕으로 Character모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model('Character', CharacterSchema);
