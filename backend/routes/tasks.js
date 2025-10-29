const express = require('express');
const router = express.Router({mergeParams: true});
const prisma = require('../prisma/client');

// Create task
router.post('/', async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const { title, description } = req.body;
  if (!title || !boardId) return res.status(400).json({ error: 'title and boardId are required' });

  try {
    const board = await prisma.board.findFirst({ where: { id: boardId } });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    const columns = board.columns || [];
    if (columns.length === 0) {
      return res.status(400).json({ error: 'Board has no columns defined' });
    }
    const task = await prisma.task.create({ data: { title, description, boardId, status: columns[0] } });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// List tasks
router.get('/', async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  try {
    const tasks = await prisma.task.findMany({ where: { boardId } });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list tasks' });
  }
});

// Get task
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const boardId = parseInt(req.params.boardId, 10);
  try {
    const task = await prisma.task.findFirst({ where: { id , boardId} });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
    const boardId = parseInt(req.params.boardId, 10);
  const id = parseInt(req.params.id, 10);
  const { title, description, status } = req.body;
  try {
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    const task = await prisma.task.findFirst({ where: { id , boardId} });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const columns = board.columns || [];
    if (status && !columns.includes(status)) {
      return res.status(400).json({ error: 'Invalid status for this board' });
    }
    const updatedTask = await prisma.task.update({ where: { id , boardId}, data: { ...task, ...req.body } });
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
    const boardId = parseInt(req.params.boardId, 10);
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.task.delete({ where: { id, boardId } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
