const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {connection} = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/bookLibrary', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', async(req, res)=>{
  res.send("Welcome to book Api");
})

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});



app.get('/api/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

app.post('/api/books', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

app.put('/api/books/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted successfully' });

});


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(port, async ()=>{
  try {
     await connection;
     console.log('Connected to server success!'); 
  } catch (error) {
      console.log(error);
  }

  console.log(`listening to server  ${port}`);
});
