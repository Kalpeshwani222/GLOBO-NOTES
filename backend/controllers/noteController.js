const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require('../models/userModel');

//get the user specific notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

//get the all public notes
const getPublicNotes = asyncHandler(async (req, res) => {
  const getnote = await Note.find({
    public: true,})
    .populate("user", "name pic ")

    res.json(getnote);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category, checkpublic } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the Feilds");
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      content,
      category,
      public: checkpublic,
    });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category, checkpublic } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    note.public = checkpublic;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});


//seacrch

const searchNote = asyncHandler(async (req, res) => {

  const result = await Note.find({
    public: true,
    "$or":[
      {
        title : {$regex : req.params.key}
      },
      {
        content:{$regex : req.params.key}
      },
    ]
  }).populate("user", "name pic ")
  res.json(result);
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
  getPublicNotes,
  searchNote,
};
