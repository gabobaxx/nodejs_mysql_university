const router = require('express').Router();

const controller = require('../controllers/controllers.js');

router.get('/', controller.index);
router.post('/add', controller.save);
router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.delete);

module.exports = router;