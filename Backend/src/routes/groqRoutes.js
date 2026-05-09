const express=require('express');
const router=express.Router();
const { generateTagline } = require('../services/groqService');
router.get('/generate-tagline', async (req, res) => {
    const product = req.query.product;
    const tagline = await generateTagline(product);
    res.json({
        tagline
    });
});

module.exports = router;