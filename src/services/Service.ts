import axios from "axios";
import { Comment } from "../models/Comment";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
    return resposta.data;
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
    if (resposta.data.text){
        return resposta.data.text;

    }
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header).then().catch(e => console.log(e))
    //setDados(resposta.data); 
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}

export const criarComentario = async (url: string, dados: Object, setDados: Function, listaComentario: Comment[] ,header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(
        [resposta.data, ...listaComentario]
    )
}


export const postarFoto = async (url: string, dados: FormData, header: Object, )  => {
    const resposta = await api.post(url, dados, header);
    return resposta.data
}

export const listar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.get(url, dados);

    setDados((prev) => {

        resposta.data
    })
}


export const paginar = async (url: string) => {
    let resposta =  await api.get(url);
    return resposta
}




