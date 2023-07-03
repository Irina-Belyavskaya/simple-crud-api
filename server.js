require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const users = [];

const validateUUID = (req, res, next) => {
  const userId = req.params.userId;
  if (!uuidv4.isUUID(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }
  next();
};

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/api/users/:userId', validateUUID, (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    return res.status(400).json({ error: 'Username and age are required' });
  }
  const user = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:userId', validateUUID, (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.username = username || user.username;
  user.age = age || user.age;
  user.hobbies = hobbies || user.hobbies;
  res.status(200).json(user);
});

app.delete('/api/users/:userId', validateUUID, (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.sendStatus(204);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
