import {Router} from 'express';
import AutoController from '../controller/autoController.mjs';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';

const router = Router();

//---------Settings save and add file path------//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});
const upload = multer({storage});

//-------------------Routers-----------------------------//
router.get('/', AutoController.autoListLoad);

router.get('/add', AutoController.autoForm);

router.post('/add', upload.single('image'), AutoController.addAuto);

router.get('/edit/:id', AutoController.autoEditForm);

router.post('/edit/:id', upload.single('image'), AutoController.updateAuto);

router.delete('/:id', AutoController.autoDelete);

export default router;
