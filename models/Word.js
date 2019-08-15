const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  imgPath: String,
  imgName: String,
  public_id:String,

  header: String,
  assoziation: String,
  notes:String,
  type:{type:String, enum: ["VERB", "NOMEN", "ADJEKTIV", "ANDERES"], default:"ANDERES"}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
