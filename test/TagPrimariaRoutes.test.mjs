import { expect } from 'chai';
import axios from 'axios';
import { beforeEach, afterEach, describe, it } from 'mocha';

const BASE_URL = 'http://localhost:3000/ondetem';

describe('Teste para as rotas de Tag Primária', () => {

    let nomeTag1;
    let nomeTag2;
    let nomeTag3;

    beforeEach(async function () {
        const createTagPrimaria1 = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Restaurante'
        });
        nomeTag1 = createTagPrimaria1.data.nomeTag;
    });

    beforeEach(async function () {
        const createTagPrimaria2 = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Academia'
        });
        nomeTag2 = createTagPrimaria2.data.nomeTag;
    });

    beforeEach(async function () {
        const createTagPrimaria3 = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Loja de roupas'
        });
        nomeTag3 = createTagPrimaria3.data.nomeTag;
    });

    afterEach(async function () {
        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${nomeTag1}`);
        } catch (error) {}

        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${nomeTag2}`);
        } catch (error) {}

        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${nomeTag3}`);
        } catch (error) {}
    });

    it('Deve criar uma nova Tag Primária', async () => {
        const res = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Café',
        });

        expect(res.status).to.equal(201);
        expect(res.data).to.have.property('nomeTag', 'Café');

        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${res.data.nomeTag}`);
        } catch (error) {}
    });

    it('Deve retornar erro ao criar Tag Primária sem dados', async () => {
        try {
            await axios.post(`${BASE_URL}/tags_primarias`, {});
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao criar Tag Primária.");
        }
    });

    it('Deve obter uma Tag Primária por nome', async () => {
        const res = await axios.get(`${BASE_URL}/tags_primarias/${nomeTag1}`);
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('nomeTag', nomeTag1);
    });

    it('Deve retornar erro ao buscar uma Tag Primária não encontrada', async () => {
        try {
            await axios.get(`${BASE_URL}/tags_primarias/TagInexistente`);
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.error).to.equal("Tag Primária não encontrada.");
        }
    });

    it('Deve obter todas as Tags Primárias', async () => {
        const res = await axios.get(`${BASE_URL}/tags_primarias`);
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
    });

    it('Deve deletar uma Tag Primária', async () => {
        const res = await axios.delete(`${BASE_URL}/tags_primarias/${nomeTag}`);
        expect(res.status).to.equal(204);
    });

    it('Deve retornar erro ao deletar uma Tag Primária não encontrada', async () => {
        try {
            await axios.delete(`${BASE_URL}/tags_primarias/TagInexistente`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao deletar Tag Primária.");
        }
    });

});
