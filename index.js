const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

const errorHandlerMiddleware = require('./middlewares/errorHandler');

const userRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const productRouter = require('./routers/product');

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
