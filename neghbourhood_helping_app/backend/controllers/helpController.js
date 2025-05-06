const HelpRequest = require('../models/HelpRequest');

exports.createHelpRequest = async (req, res) => {
  const { category, description, location } = req.body;
  try {
    const helpRequest = new HelpRequest({
      userId: req.user.id,
      category,
      description,
      location,
    });
    await helpRequest.save();
    res.status(201).json(helpRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find()
      .populate('userId', 'name') 
      .lean();

    res.json(helpRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


