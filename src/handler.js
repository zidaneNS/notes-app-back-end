const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    id,
    body,
    createdAt,
    updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'data berhasil ditambah',
      data: {
        noteId : id
      }
    })
      .code(201);
  } else {
    return h.response({
      status: 'fail',
      message: 'data gagal ditambah'
    })
      .code(500);
  }
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  }
});

const getNodeByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    };
  }

  h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
    .code(404);
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };

    h.response({
      status: 'success',
      message: 'Catatn berhasil diupdate'
    })
      .code(200);
  }

  h.response({
    status: 'fail',
    message: 'Gagal diperbarui, id tidak ditemukan'
  })
    .code(404);
};

const deleteNoteById = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    h.response({
      status: 'success',
      messaage: 'data berhasil dihapus'
    })
      .code(200);
  }

  h.response({
    status: 'fail',
    message: 'data gagal dihapus, id tidak ditemukan'
  })
    .code(404);
};

module.exports = { addNoteHandler, getAllNotesHandler, getNodeByIdHandler, editNoteByIdHandler, deleteNoteById };