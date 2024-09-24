import { expect } from 'chai';
import axios from 'axios';
import { beforeEach, afterEach, describe, it } from 'mocha';

const BASE_URL = 'http://localhost:3000/ondetem';

describe('Teste para as rotas de Usuário', () => {

    let usuario;

    beforeEach(async function () {
        const createUsuario = await axios.post(`${BASE_URL}/usuarios`, {
            username: 'usertest',
            senha: '1234',
        });
        usuario = createUsuario.data;
    });

    afterEach(async function () {
        try{
            await axios.delete(`${BASE_URL}/usuarios/${usuario.data.id}`);
        }catch(error){}
    });

    it('Deve criar um novo usuário', async () => {
        const res = await axios.post(`${BASE_URL}/usuarios`, {
            username: 'newuser@test.com',
            senha: 'NewUser123!',
          });
      
          expect(res.status).to.equal(201);
          expect(res.data).to.have.property('username', 'newuser@test.com');
        try{
            await axios.delete(`${BASE_URL}/usuarios/${res.data.id}`);
        }catch(error){}
    });

    it('Deve retornar erro ao criar um usuário sem dados', async () => {
        try {
            await axios.post(`${BASE_URL}/usuarios`, {});
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao criar usuário.");
        }
    });

    it('Deve retornar um usuário por ID', async () => {
        const res = await axios.get(`${BASE_URL}/usuarios/${usuario.data.id}`);
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('id', usuario.data.id);
    });

    it('Deve retornar erro ao buscar um usuário não encontrado', async () => {
        try {
            await axios.get(`${BASE_URL}/usuarios/99999`); // ID que não existe
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.error).to.equal("Usuário não encontrado.");
        }
    });

    it('Deve deletar um usuário', async () => {
        const res = await axios.delete(`${BASE_URL}/usuarios/${usuario.data.id}`);
        expect(res.status).to.equal(204);
    });

    it('Deve retornar erro ao deletar um usuário não encontrado', async () => {
        try {
            await axios.delete(`${BASE_URL}/usuarios/99999`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao deletar usuário.");
        }
    });

});

describe('Teste para as rotas envolvendo os favoritos de Usuário', () => {

    let usuarioFavId;
    let estabelecimentoId;

    beforeEach(async function () {
        const createUsuario = await axios.post(`${BASE_URL}/usuarios`, {
            username: 'userfav',
            senha: '4321',
        });
        usuarioFavId = createUsuario.data.id;

        await axios.post(`${BASE_URL}/tags_primarias`, {nomeTag: 'Restaurante'});
        const createEstabelecimento = await axios.post(`${BASE_URL}/estabelecimentos`, {
            nome: 'testfav',
            cidade: 'Campina Grande',
            bairro: 'A',
            rua: 'B',
            numero: '12A',
            descricao: 'teste',
            imagens: ['imagem1', 'imagem2'],
            tagP: 'Restaurante',
        });
        estabelecimentoId = createEstabelecimento.data.id;
        

    });

    afterEach(async function () {
        try{
            await axios.delete(`${BASE_URL}/usuarios/${usuarioFavId}`)
        }catch(error){}

        try{
            await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}`)
        }catch(error){}

        try{
            await axios.delete(`${BASE_URL}/tags_primarias/Restaurante`)
        }catch(error){}
    });

    it('Deve adicionar um estabelecimento aos favoritos de um usuário', async () => {
        const res = await axios.post(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/${estabelecimentoId}`);
        expect(res.status).to.equal(201);
        expect(res.data).to.have.property('usuarioId', usuarioFavId);
        expect(res.data).to.have.property('estabId', estabelecimentoId);
        try{
            await axios.delete(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/${estabelecimentoId}`);
        }catch(error){}
    });

    it('Deve retornar erro ao adicionar um favorito a um usuário não encontrado', async () => {
        try {
            await axios.post(`${BASE_URL}/usuarios/9999999999/favoritos/${estabelecimentoId}`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao adicionar favorito.");
        }
    });

    it('Deve retornar erro ao favoritar um estabelecimento não encontrado', async () => {
        try {
            await axios.post(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/999999999999`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao adicionar favorito.");
        }
    });

    it('Deve remover um estabelecimento dos favoritos de um usuário', async () => {
        await axios.post(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/${estabelecimentoId}`);
        const res = await axios.delete(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/${estabelecimentoId}`);
        expect(res.status).to.equal(204);
    });

    it('Deve retornar erro ao deletar um favorito que não existe', async () => {
        try {
            await axios.delete(`${BASE_URL}/usuarios/${usuarioFavId}/favoritos/999999999999`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao remover favorito.");
        }
    });

});