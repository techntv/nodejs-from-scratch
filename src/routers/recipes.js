const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const { getAll, save, get, update, remove } = require('../controllers/recipes');

// router.get('/', getAll)
// router.post('/', save)
// router.get('/:id', get)
// router.put('/:id', update)
// router.delete('/:id', remove)

router.route('/').get(getAll).post(auth.authenticate(), save);
router.route('/:id').get(get).put(auth.authenticate(), update).delete(auth.authenticate(), remove);


module.exports = router;