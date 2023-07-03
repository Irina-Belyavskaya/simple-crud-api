const axios = require('axios');

axios.get('http://localhost:3000/api/users')
  .then((response) => {
    console.log('Test scenario 1:');
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

axios.post('http://localhost:3000/api/users', {
    username: 'John Doe',
    age: 25,
    hobbies: ['Reading', 'Gaming']
  })
  .then((response) => {
    console.log('Test scenario 2:');
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

axios.get('http://localhost:3000/api/users/123')
  .then((response) => {
    console.log('Test scenario 3:');
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

axios.put('http://localhost:3000/api/users/123', {
    username: 'John Smith',
    age: 30,
    hobbies: ['Coding']
  })
  .then((response) => {
    console.log('Test scenario 4:');
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

axios.delete('http://localhost:3000/api/users/123')
  .then(() => {
    console.log('Test scenario 5:');
    console.log('User deleted successfully');
  })
  .catch((error) => {
    console.error(error.response.data);
  });

axios.get('http://localhost:3000/api/users/123')
  .then((response) => {
    console.log('Test scenario 6:');
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });
