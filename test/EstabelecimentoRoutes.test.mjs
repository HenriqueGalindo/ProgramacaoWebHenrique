import { expect } from 'chai';
import axios from 'axios';
import { beforeEach, afterEach, describe, it } from 'mocha';

const BASE_URL = 'http://localhost:3000/ondetem';

describe('Teste para as rotas de Estabelecimento', () => {

    let estabelecimentoId;
    let tagPrimaria;

    beforeEach(async function () {
        const createTagPrimaria = await axios.post(`${BASE_URL}/tags_primarias`, {
            nomeTag: 'Restaurante'
        });
        tagPrimaria = createTagPrimaria.data.nomeTag;

        const createEstabelecimento = await axios.post(`${BASE_URL}/estabelecimentos`, {
            nome: 'testEstabelecimento',
            cidade: 'Campina Grande',
            bairro: 'A',
            rua: 'B',
            numero: '12A',
            descricao: 'descrição teste',
            imagens: ['imagem1', 'imagem2'],
            tagP: tagPrimaria,
        });
        estabelecimentoId = createEstabelecimento.data.id;
    });

    afterEach(async function () {
        try {
            await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}`);
        } catch (error) {}

        try {
            await axios.delete(`${BASE_URL}/tags_primarias/${tagPrimaria}`);
        } catch (error) {}
    });

    it('Deve criar um novo estabelecimento', async () => {
        const res = await axios.post(`${BASE_URL}/estabelecimentos`, {
            nome: 'Novo Estabelecimento',
            cidade: 'João Pessoa',
            bairro: 'Bairro B',
            rua: 'Rua B',
            numero: '45C',
            descricao: 'Estabelecimento teste',
            imagens: ['imagem1', 'imagem2'],
            tagP: 'Restaurante',
        });

        expect(res.status).to.equal(201);
        expect(res.data).to.have.property('nome', 'Novo Estabelecimento');

        try {
            await axios.delete(`${BASE_URL}/estabelecimentos/${res.data.id}`);
        } catch (error) {}
    });

    it('Deve retornar erro ao criar estabelecimento sem dados', async () => {
        try {
            await axios.post(`${BASE_URL}/estabelecimentos`, {});
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao criar estabelecimento.");
        }
    });

    it('Deve retornar um estabelecimento por ID', async () => {
        const res = await axios.get(`${BASE_URL}/estabelecimentos/${estabelecimentoId}`);
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('id', estabelecimentoId);
    });

    it('Deve retornar erro ao buscar um estabelecimento não encontrado', async () => {
        try {
            await axios.get(`${BASE_URL}/estabelecimentos/99999`); // ID que não existe
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.error).to.equal("Estabelecimento não encontrado.");
        }
    });

    it('Deve atualizar um estabelecimento', async () => {
        const res = await axios.patch(`${BASE_URL}/estabelecimentos/${estabelecimentoId}`, {
            nome: 'Estabelecimento Atualizado',
            cidade: 'Nova Cidade'
        });
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('nome', 'Estabelecimento Atualizado');
        expect(res.data).to.have.property('cidade', 'Nova Cidade');
    });

    it('Deve retornar erro ao atualizar um estabelecimento não encontrado', async () => {
        try {
            await axios.patch(`${BASE_URL}/estabelecimentos/99999`, {
                nome: 'Nome Inexistente'
            });
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.error).to.equal("Estabelecimento não encontrado.");
        }
    });

    it('Deve deletar um estabelecimento', async () => {
        const res = await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}`);
        expect(res.status).to.equal(204);
    });

    it('Deve retornar erro ao deletar um estabelecimento não encontrado', async () => {
        try {
            await axios.delete(`${BASE_URL}/estabelecimentos/99999`);
        } catch (error) {
            expect(error.response.status).to.equal(500);
            expect(error.response.data.error).to.equal("Erro ao deletar estabelecimento.");
        }
    });

    it('Deve associar uma tag secundária a um estabelecimento', async () => {
        await axios.post(`${BASE_URL}/tags_secundarias`, { nomeTag: 'Lanchonete', tagP: 'Restaurante' });

        const res = await axios.post(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Lanchonete`);
        expect(res.status).to.equal(201);
        expect(res.data).to.have.property('estabId', estabelecimentoId);
        expect(res.data).to.have.property('tagS', 'Lanchonete');

        try {
            await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Lanchonete`);
            await axios.delete(`${BASE_URL}/tags_secundarias/Lanchonete`);
        } catch (error) {}
    });

    it('Deve remover a associação de uma tag secundária de um estabelecimento', async () => {
        await axios.post(`${BASE_URL}/tags_secundarias`, { nomeTag: 'Café', tagP: 'Restaurante' });
        await axios.post(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Café`);

        const res = await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Café`);
        expect(res.status).to.equal(204);

        try {
            await axios.delete(`${BASE_URL}/tags_secundarias/Café`);
        } catch (error) {}
    });

    it('Deve buscar estabelecimentos por cidade e tags secundárias', async () => {
        await axios.post(`${BASE_URL}/tags_secundarias`, { nomeTag: 'Pizza', tagP: 'Restaurante' });
        await axios.post(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Pizza`);

        const res = await axios.get(`${BASE_URL}/estabelecimentos/busca`, {
            params: { cidade: 'Campina Grande', tagsSecundarias: ['Pizza'] }
        });
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');

        try {
            await axios.delete(`${BASE_URL}/estabelecimentos/${estabelecimentoId}/tags/Pizza`);
            await axios.delete(`${BASE_URL}/tags_secundarias/Pizza`);
        } catch (error) {}
    });
});
