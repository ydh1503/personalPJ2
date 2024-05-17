import mongoose from 'mongoose';

const EquipsSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    required: true,
    unique: true,
  },
  equips: {
    type: [Number],
    required: true,
    default: [],
  },
});

export default mongoose.model('Equip', EquipsSchema);
