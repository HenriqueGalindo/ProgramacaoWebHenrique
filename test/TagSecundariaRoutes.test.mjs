import { expect } from 'chai';
import axios from 'axios';
import { beforeEach, afterEach, describe, it } from 'mocha';

const BASE_URL = 'http://localhost:3000/ondetem';

describe('Teste para as rotas de Tag Secundária', () => {

    let nomeTagPrimaria;
    let nomeTagSecundaria;
    let nomeTagSecundaria2;

    beforeEach(async function () {
        const createTagPrimaria = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Restaurante'
        });
        nomeTagPrimaria = createTagPrimaria.data.nomeTag;

        const createTagSecundaria = await axios.post(`${BASE_URL}/tags_secundarias`, {
            nomeTag: 'Pizzaria',
            tagP: nomeTagPrimaria
        });
        nomeTagSecundaria = createTagSecundaria.data.nomeTag;

        const createTagSecundaria2 = await axios.post(`${BASE_URL}/tags_secundarias`, {
            nomeTag: 'Pastelaria',
            tagP: nomeTagPrimaria
        });
        nomeTagSecundaria2 = createTagSecundaria2.data.nomeTag;
    });

    afterEach(async function () {
        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${nomeTagPrimaria}`);
        } catch (error) {}

        try {
            await axios.delete(`${BASE_URL}/tags_secundarias/${nomeTagSecundaria}`);
        } catch (error) {}

        try {
            await axios.delete(`${BASE_URL}/tags_secundarias/${nomeTagSecundaria2}`);
        } catch (error) {}
    });

    it('Deve criar uma nova Tag Secundária', async () => {
        const res = await axios.post(`${BASE_URL}/tags_secundarias`, {
            nomeTag: 'Comida chinesa',
            tagPrimaria: nomeTagPrimaria
        });

        expect(res.status).to.equal(201);
        expect(res.data).to.have.property('nomeTag', 'Comida chinesa');
        expect(res.data).to.have.property('tagP', nomeTagPrimaria);

        try {
            await axios.delete(`${BASE_URL}/tags_secundarias/${res.data.nomeTag}`);
        } catch (error) {}
    });

    it('Deve retornar erro ao criar Tag Secundária sem dados', async () => {
        try {
            await axios.post(`${BASE_URL}/tags_secundarias`, {});
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao criar Tag Secundária.");
        }
    });

    it('Deve obter uma Tag Secundária por nome', async () => {
        const res = await axios.get(`${BASE_URL}/tags_secundarias/${nomeTagSecundaria}`);
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('nomeTag', nomeTagSecundaria);
    });

    it('Deve retornar erro ao buscar uma Tag Secundária não encontrada', async () => {
        try {
            await axios.get(`${BASE_URL}/tags_secundarias/TagInexistente`);
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.error).to.equal("Tag Secundária não encontrada.");
        }
    });

    it('Deve obter Tags Secundárias por Tag Primária', async () => {
        const res = await axios.get(`${BASE_URL}/tags_secundarias/${nomeTagPrimaria}`);
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array').that.is.not.empty;
    });

    it('Deve retornar erro ao buscar Tags Secundárias com tagP inválida', async () => {
        try {
            await axios.get(`${BASE_URL}/tags_secundarias/TagInvalida`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao obter Tags Secundárias.");
        }
    });

    it('Deve deletar uma Tag Secundária', async () => {
        const deleteRes = await axios.delete(`${BASE_URL}/tags_secundarias/${nomeTagSecundaria}`);
        expect(deleteRes.status).to.equal(204);
    });

    it('Deve retornar erro ao deletar uma Tag Secundária não encontrada', async () => {
        try {
            await axios.delete(`${BASE_URL}/tags_secundarias/TagInexistente`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao deletar Tag Secundária.");
        }
    });
});
