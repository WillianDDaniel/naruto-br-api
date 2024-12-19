const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js');
const characterRoutes = require('./routes/characterRoutes.js');
const jutsuRoutes = require('./routes/justuRoutes.js');
const characterImageRoutes = require('./routes/characterImageRoutes.js');
const villageRoutes = require('./routes/villageRoutes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'web-views')));

app.use('/auth', authRoutes);
app.use('/characters', characterRoutes);
app.use('/jutsus', jutsuRoutes);
app.use('/character-images', characterImageRoutes);
app.use('/villages', villageRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
