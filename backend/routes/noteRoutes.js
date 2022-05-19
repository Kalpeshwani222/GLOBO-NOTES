const express = require("express");
const { getNotes,createNote,getNoteById,UpdateNote,DeleteNote ,getPublicNotes} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();


router.route('/').get(protect,getNotes);

router.route('/public').get(getPublicNotes);

router.route('/create').post(protect,createNote)

router.route('/:id')
        .get(getNoteById)
         .put(protect,UpdateNote)
         .delete(protect,DeleteNote);



module.exports = router;

