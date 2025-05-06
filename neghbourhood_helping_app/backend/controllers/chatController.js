const Chat = require('../models/Chat');

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate('sender receiver', 'name');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
