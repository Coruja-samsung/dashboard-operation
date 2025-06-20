// win + x   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

//npm install fastify //npm install fastify @fastify/static  // npm run ini 

// MIN theme // Symbols // ESLint

import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Configuração de caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

// Servindo arquivos estáticos
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

const carregarDados = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'dados.json'), 'utf-8');
    let DOs = JSON.parse(data);
    return DOs;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    return [];
  }
};

// Rota para enviar os dados processados
fastify.get('/api/dados', async (request, reply) => {
  const dados = await carregarDados();
  return reply.send(dados);
});

fastify.get('/MX', async (request, reply) => {
  reply.redirect('/?wh=C820_L');
});
fastify.get('/CE', async (request, reply) => {
  reply.redirect('/?wh=C820_J');
});
fastify.get('/REC', async (request, reply) => {
  reply.redirect('/?wh=C820_R');
});
fastify.get('/GRV', async (request, reply) => {
  reply.redirect('/?wh=C820_G');
});

fastify.get('/MX/aging.html', async (request, reply) => {
  reply.redirect('/aging.html?wh=C820_L');
});
fastify.get('/CE/aging.html', async (request, reply) => {
  reply.redirect('/aging.html?wh=C820_J');
});
fastify.get('/REC/aging.html', async (request, reply) => {
  reply.redirect('/aging.html?wh=C820_R');
});
fastify.get('/GRV/aging.html', async (request, reply) => {
  reply.redirect('/aging.html?wh=C820_G');
});

// Inicializando o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 9000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();