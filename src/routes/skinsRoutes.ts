import { Router } from 'express';
const router = Router();

// Dummy data for skins
const skins = [
    { id: '1', name: 'Skin 1', types: ['Type 1'], price: 100, color: 'Red' },
];

// GET /skins/available
router.get('/available', (req, res) => {
    res.json(skins);
});

// POST /skins/buy
router.post('/buy', (req, res) => {
    res.json({ message: 'Skin bought successfully' });
});

// GET /skins/myskins
router.get('/myskins', (req, res) => {
    res.json({ message: 'List of my skins' });
});

// PUT /skins/color
router.put('/color', (req, res) => {
    res.json({ message: 'Skin color changed successfully' });
});

// DELETE /skins/delete/:id
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Skin with id ${id} deleted successfully` });
});

// GET /skin/getskin/:id
router.get('/getskin/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Details of skin with id ${id}` });
});

export default router;
