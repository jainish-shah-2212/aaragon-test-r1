const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const tasksRouter = require('./tasks');


// Create a board
router.post('/', async (req, res) => {
  const { title , columns } = req.body;
  if (!title || !columns || columns.length == 0 ) return res.status(400).json({ error: 'title is required' });
  const cols = columns.filter(col => col && col.length > 0).map(col => col.trim()).map(col => col.toLowerCase());
  try {
    const board = await prisma.board.create({ data: { title, columns } });
    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create board' });
  }
});


// get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list boards' });
  }
});

// Get board by id 
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const board = await prisma.board.findUnique({
      where: { id },
    });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get board' });
  }
});

// Update board
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title , columns } = req.body;

  try {
    const board = await prisma.board.update({ where: { id }, data: { title, columns } });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update board' });
  }
});

// Delete board
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.board.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

router.use('/:boardId/tasks', tasksRouter);


module.exports = router;
