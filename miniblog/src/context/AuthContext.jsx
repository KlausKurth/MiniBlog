import { useContext, createContext } from "react";

//Cria um contexto React, chamado AuthContext. Ele permite compartilhar dados (como o usuário autenticado) entre componentes, sem precisar passar props manualmente.
const AuthContext = createContext()

//É um componente que recebe o value (ex: usuário logado) e envolve os filhos (children) para fornecer esse valor a todos os componentes descendentes.

/* value: é o valor que você quer disponibilizar para todo mundo que usar o useAuthentication() (ex: user, createUser, logout, etc).
children: são todos os componentes filhos que estão dentro do AuthProvider, como seu <BrowserRouter>, <NavBar>, <Routes>, etc.*/

//Um Provider é um componente especial que disponibiliza dados (contexto) 

/*Imagine que o Provider é uma caixa de energia elétrica, e os children (componentes filhos) são lâmpadas ligadas nessa caixa.
Se a caixa (Provider) fornece energia (value), todas as lâmpadas que estiverem conectadas (children) podem acender e usar essa energia, sem precisar cada uma trazer sua bateria.*/

export function AuthProvider({children, value}) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//É um custom hook para acessar o valor do contexto em qualquer componente (ex: const user = useAuthentication() retorna o usuário atual).
export function useAuthentication() {
    return useContext(AuthContext)
}

