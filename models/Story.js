const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  header: String,
  assoziation: String,
  content: String,
  notes: String,
  _words: { type: Schema.Types.ObjectId, ref: "Word" },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
