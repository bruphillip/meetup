import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const meetup = await Meetup.findAll({
      attributes: ['title', 'description', 'location', 'date_hour'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['file_name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(meetup);
  }

  async store(req, res) {
    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    res.json(meetup);
  }
}

export default new MeetupController();
