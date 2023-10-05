require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { login } = require('./controllers/users');
const { addUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const urlRegex = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // 100 запросов с 1 ip
});

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), addUser);

app.use(auth);

app.use(requestLogger);

app.use(limiter);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT);
