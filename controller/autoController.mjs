import Auto from '../modules/autoModules.mjs';

class AutoController {
  static async autoListLoad(req, res) {
    try {
      const autoList = await Auto.loadAutoList();
      res.render('autos/autopark', {
        auto: autoList,
      });
    } catch (error) {}
  }

  static async autoForm(req, res) {
    res.render('autos/addAuto', {auto: null});
  }

  static async addAuto(req, res) {
    try {
      const autoObj = {imgSrc: req.file.filename, ...req.body};
      Auto.addAutoNew(autoObj);
      res.redirect('/auto');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding auto');
    }
  }

  static async autoEditForm(req, res) {
    try {
      const autoById = await Auto.getAutoById(req.params.id);
      res.render('autos/addAuto', {auto: autoById});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading auto');
    }
  }

  static async updateAuto(req, res) {
    try {
      const autoObjPost = {imgSrc: req.file.filename, ...req.body};
      Auto.updateAuto(req.params.id, autoObjPost);
      res.redirect('/auto');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating auto');
    }
  }

  static async autoDelete(req, res) {
    try {
      Auto.deleteAuto(req.params.id);
      res.redirect('/auto');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting auto');
    }
  }
}

export default AutoController;
