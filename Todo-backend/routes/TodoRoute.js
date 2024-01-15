const express = require('express');
const router = express.Router();

const Todocontroller = require('../controllers/TodoController');

router.post('/create',Todocontroller.createTodo);
router.get('/find-all',Todocontroller.findAll);
router.delete('/delete-by-id/:id',Todocontroller.findAll);
router.put('/update/:id/',Todocontroller.findAll);

module.exports = router;