'use strict';

import {openModal, closeModal} from './modal.js';

import {getProdutos, postProduto, deletarProduto} from './produtos.js';

import {imagemPreview} from './imagePreview.js';

//const { closeModal, openModal } = require("./modal");

const criarLinha = ({foto, nome, categoria, preco, id}) =>{
    //const foto = produto.foto;
    const linha = document.createElement('tr');
    linha.innerHTML = `
    <tr>
        <td>
            <img src="${foto}" class="produto-image" />
        </td>
        <td>${nome}</td>
        <td>${preco}</td>
        <td>${categoria}</td>
        <td>
            <button type="button" class="button green" data-idproduto=${id}>
                editar
            </button>
            <button type="button" class="button red" data-idproduto=${id}>
                excluir
            </button>
        </td>
    </tr>
    `;
    return linha;
};

const carregarProdutos = async () => {
    const container = document.querySelector('tbody');
    const produtos = await getProdutos();
    //console.log(produtos);
    const linhas = produtos.map(criarLinha);

    container.replaceChildren(...linhas);
}; 

const handlePreview = () => imagemPreview('inputFile','imagePreview');

const salvarProduto = async() => {
    const produto = {
        nome: document.getElementById('product').value,
        preco: document.getElementById('price').value,
        categoria: document.getElementById('category').value,
        foto: document.getElementById('imagePreview').src
    };
    //console.log(produto);

    await postProduto(produto);
    closeModal();
    carregarProdutos();
};

const handleClickTbody = async ({target}) =>{
    if(target.type === 'button'){
        const acao = target.textContent.trim();
        if(acao === 'excluir'){
            //console.log('excluir');
            await deletarProduto(target.dataset.idproduto);
            carregarProdutos();
        }
    }
} 

carregarProdutos();

// eventos

document
    .getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change',handlePreview);

document.getElementById('save').addEventListener('click', salvarProduto);

document.querySelector('tbody').addEventListener('click', handleClickTbody);