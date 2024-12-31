const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    venue: req.body.venue,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.body.title != null) {
      event.title = req.body.title;
    }
    if (req.body.venue != null) {
      event.venue = req.body.venue;
    }
    if (req.body.date != null) {
      event.date = req.body.date;
    }
    if (req.body.time != null) {
      event.time = req.body.time;
    }
    if (req.body.price != null) {
      event.price = req.body.price;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.remove();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

