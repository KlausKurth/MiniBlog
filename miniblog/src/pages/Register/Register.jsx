/*Register.jsx
↓
handleSubmit()
↓
createUser(user)  ← (importado do useAuthentication)
↓
  → Firebase Auth: cria o usuário
  → Firebase Profile: define o nome público
↓
Retorna o usuário criado
↓
Você pode redirecionar ou mostrar mensagem, se quiser*/


import styles from './Register.module.css'

import {useState, useEffect} from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmePassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  // "error: authError" é o erro do register, como já temos "error" que trata em outro estado deste script 
  // useAuthentication() é um custom hook e precisa ser executado como uma função para retornar os valores.
  //Quando você chama useAuthentication(), ela executa o hook e retorna um objeto com propriedades (funções e estados) relacionadas à autenticação do usuário.

  /*Você desestrutura esse objeto para acessar diretamente:
  createUser → função que provavelmente cria o usuário no Firebase.
  authError → um alias para a propriedade error retornada pelo hook (porque no componente você já usa outro error para validação de formulário).
  loading → estado booleano que indica se está processando algo (por exemplo, criando o usuário).*/

  const { createUser, error: authError, loading } = useAuthentication();

  // O useEffect escuta mudanças em authError e, quando ocorre um erro, seta uma mensagem legível para o usuário via setError.
  //Erro de e-mail já cadastrado: esse erro vem depois de uma chamada assíncrona para o Firebase (createUser). Ou seja, ele só aparece depois que o Firebase retorna o erro.
  useEffect(() => {
    if (authError) {
      if (authError.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso. Tente fazer login.");
      } else if (authError.code === "auth/weak-password") {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        setError("Ocorreu um erro: " + authError.message);
      }
    }
  }, [authError]);

  // adiciona o método async na função para poder usar o método await na chamada creatUser
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    };

    // trata a confimação de senha
    if(password !== confirmePassword) {
      setError("As senhas precisam ser iguais!")
      return
    }
    // trata o minimo de caracteres que precisa ser utilizado na senha
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }    


    // passa as informações do submit form para objeto user ser usado como argumento da função createUser
    // Aqui, createUser é a função importada do hook e passada para Register via useAuthentication.
    const res = await createUser(user);

    //Debugger
    console.log(user);

  };

  return (
    <div className={styles.register}>
        <h2>Cadastre-se para postar</h2>
        <p>Crie seu usúario e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
            type="text" 
            name="displayName"
            required
            placeholder='Nome do usúario'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input 
            type="email" 
            name="email"
            required
            placeholder='E-mail do usúario'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input 
            type="password" 
            name="password"
            required
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input 
            type="confirmePassword" 
            name="confirmePassword"
            required
            placeholder='Confirme a sua senha'
            value={confirmePassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button className='btn'>Cadastrar</button>
          {/* Habilitar o print do erro na interface do usúario */}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register