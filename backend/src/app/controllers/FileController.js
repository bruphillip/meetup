import File from '../models/File';

class FileController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const { filename } = req.file;

    const file = await File.create({
      file_name: filename,
      user_id: req.userId,
    });
    return res.json(file);
  }
}

export default new FileController();
