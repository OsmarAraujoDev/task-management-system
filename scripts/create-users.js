const axios = require('axios');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomUser() {
  const names = ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gustavo', 'Helena'];
  const sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Rodrigues', 'Almeida'];
  const nickname = `${names[getRandomInt(names.length)]} ${sobrenomes[getRandomInt(sobrenomes.length)]} Dev`;
  const email = `user${getRandomInt(10000)}@example.com`;
  const phone = `55${getRandomInt(99)}9${getRandomInt(99999999)}`;
  const password = '12345678';

  return { nickname, email, phone, password };
}

async function createUser(user) {
  try {
    const response = await axios.post('http://localhost:3000/users/', user);

    console.log(`userId: ${response.data.data.userId}`);
  } catch (error) {
    console.error('Error trying to create user:', error.response?.data || error.message);
  }
}

async function main() {
  const total = 5;
  for (let i = 0; i < total; i++) {
    const user = generateRandomUser();
    await createUser(user);
  }
}

main();