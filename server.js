const express = require('express');

const connectDB = require('./config/db');

const app = express();
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//Middlewares
app.use(express.json({ extended: false }));
//API ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/reg', require('./routes/api/reg'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});