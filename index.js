require('dotenv').config();
const express = require('express');

const userRouter = require('./routes/userRouters');
const loginRouter = require('./routes/loginRouters');
const categorieRouter = require('./routes/categoriesRouter');
const postRouter = require('./routes/postRouter');
// não remova esse endpoint, e para o avaliador funcionar

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categorieRouter);
app.use('/post', postRouter);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.get('/', (request, response) => {
  response.send();
});