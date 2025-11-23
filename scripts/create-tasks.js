const axios = require('axios');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomTask() {
  const titles = [
    'Estudar Node.js', 'Revisar Express', 'Criar API REST', 'Testar endpoints',
    'Documentar código', 'Refatorar funções', 'Implementar autenticação', 'Ajustar validações'
  ];
  const descriptions = [
    'Tarefa importante para o projeto', 'Revisar requisitos', 'Testar funcionalidades',
    'Corrigir bugs', 'Adicionar novos testes', 'Melhorar performance', 'Atualizar dependências'
  ];

  return {
    title: titles[getRandomInt(titles.length)],
    description: descriptions[getRandomInt(descriptions.length)]
  };
}

async function createTask(userId, taskData) {
  try {
    const response = await axios.post(`http://localhost:3000/tasks/${userId}`, taskData);
    console.log(`Tarefa criada: ${response.data.data.taskId} - ${taskData.title}`);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error.response?.data || error.message);
  }
}

async function main() {
  const userId = getRandomInt(77); 
  const total = 5; 

  for (let i = 0; i < total; i++) {
    const task = generateRandomTask();
    await createTask(userId, task);
  }
}

main();