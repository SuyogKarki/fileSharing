const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const fileRoute = require('./routes/files');

mongoose
  .connect('mongodb+srv://admin:mynameissuyog123@cluster0.dqfhdex.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection to MongoDB has been established'))
  .catch(err => console.log(err));

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/files', fileRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log('Backend server is running!');
});
