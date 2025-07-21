//1. Componente monta → hook é inicializado.
//2. Usuário chama createUser(data) com e-mail, senha e nome.
//3. Verifica se componente ainda está ativo.
//4. Ativa estado de loading.
//5. Cria usuário via Firebase Auth.
//6. Atualiza o nome do usuário.
//7. Retorna o objeto usuário.
//8. Se der erro, mostra no console.
//9. Quando componente desmonta, ativa `cancelled` para evitar atualizações futuras.

/* O problema do memory leak:

Imagine que você tem um componente de cadastro, e ao clicar em "Criar Conta", ele faz uma chamada ao Firebase (que é assíncrona) para criar o usuário.

Mas o usuário fecha a página ou navega para outra rota antes que a resposta do Firebase volte.

Quando a resposta finalmente chega, o React tenta atualizar o estado (ex: setLoading(false) ou setError(...)) — mas o componente já foi desmontado!
Isso gera um aviso como: Warning: Can't perform a React state update on an unmounted component.

Esse é o memory leak: tentar atualizar o estado de um componente que já saiu da tela.

Como prevenir?
Você adiciona um sinalizador (cancelled) para interromper a atualização do estado se o componente foi desmontado:*/

// Analogia simples:

//Imagine que você pediu uma pizza (requisição assíncrona), mas saiu de casa (componente desmontado).
//Quando o entregador chega (resposta da requisição), ele tenta te entregar a pizza (atualizar o estado), mas você não está mais lá — é tarde demais.
//A função de limpeza do useEffect é tipo um aviso na porta: "Não estamos mais aqui, não insista"


import {
    getAuth,
    //Criar usuário Firebase
    createUserWithEmailAndPassword,
    //Fazer login Firebase
    signInWithEmailAndPassword,
    //Atualizar o perfil do usuário Firebase
    updateProfile,
    //Fazer logout Firebase
    signOut
} from 'firebase/auth'

//importar as configurações de firebase
import { app } from '../firebase/config.jsx';

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    //Armazena mensagens de erro caso algo dê errado no login/cadastro
    const [error, setError] = useState(null)

    //Indica se algo está carregando (útil para mostrar spinner, por exemplo)
    const [loading, setLoading] = useState(null)

    //Cleanup
    //Deal with memory leak
    //Serve para prevenir vazamento de memória, evitando atualizações de estado em componentes desmontados.
    const [cancelled, setCancelled] = useState(false)

    //Isso inicializa o serviço de autenticação do Firebase instanciando a app que traz as configs do firebase
    const auth = getAuth(app)

    function checkIfIsCancelled() {
        if (cancelled){
            return;    
        }        
    }
    
    //Essa função recebe um objeto data
    // "async" Esse modificador transforma a função em assíncrona, permitindo o uso de await dentro dela. Isso é necessário quando usamos APIs ou bibliotecas que retornam Promises, como é o caso do Firebase.
    const createUser = async (data) => {

        //Evita continuar o processo se o componente já foi desmontado da tela (previne erro ou memory leak).
        checkIfIsCancelled()

        //Inicia carregamento
        setLoading(true)

        try {

            //Usa Firebase para criar um novo usuário com e-mail e senha.
            //Esse método retorna uma Promise que, quando resolvida, entrega o objeto user.
            //O await faz o código esperar a resposta antes de continuar.
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            //Depois de criar o usuário, você atualiza seu nome visível (displayName) no perfil Firebase.
            //Também é uma Promise, por isso o await.
            await updateProfile(user, {
                displayName: data.displayName
            })

            // user é o objeto de usuário retornado.
            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)
        }

        setLoading(false)
    }

    // Isso previne atualização de estado em um componente que não está mais visível, evitando leaks de memória.
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    };

};