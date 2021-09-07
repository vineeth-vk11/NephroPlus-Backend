const dotenv = require('dotenv');
const express = require('express');
dotenv.config({ path: './.env' });
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(morgan('tiny'))
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Welcome to the Nephro API');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
