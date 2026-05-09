const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 5000;
const cors=require('cors');
const groqRoutes=require('./routes/groqRoutes');
const runwayRoutes=require('./routes/runwayRoutes');
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/groq',groqRoutes);
app.use('/api/runway',runwayRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});