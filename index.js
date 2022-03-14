require('dotenv').config();
const express = require('express');

// const userRouter = require('./routes/userRouters');
// não remova esse endpoint, e para o avaliador funcionar

const userControllers = require('./controllers/userControllers');

const app = express();
app.use(express.json());

app.post('/user', userControllers.postUserController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.get('/', (request, response) => {
  response.send();
});