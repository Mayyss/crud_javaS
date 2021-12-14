'use strict';

const url = 'http://10.107.142.2/produtos/';

const getProdutos = async () => {
    const response = await fetch(url);
    //console.log( await response.json());
    const {data} = await response.json();
    return data;
};

const postProduto = async (produto) => {
    const options ={
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-Type': 'application/json'
        }
    };

    await fetch(url, options);
};

const deletarProduto = async (id) =>{
    const options = {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        }
    };
    await fetch(`${url}${id}`, options);
};

const putProduto = async (produto) => {
    const options = {
        method : 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'content-Type': 'application/json'
        }
    };
    await fetch(`${url}${produto.id}`, options);
};

export{
    getProdutos, postProduto, deletarProduto, putProduto
};