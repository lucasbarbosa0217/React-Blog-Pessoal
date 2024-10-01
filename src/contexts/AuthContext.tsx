import { createContext, ReactNode, useState } from "react"

import UserLogin from "../models/UserLogin"
import { login } from "../services/Service"
import { toastAlerta } from "../utils/toasAlerts"
// import { toastAlerta } from "../utils/toastAlerta"

interface AuthContextProps {
    usuario: UserLogin
    handleLogout(): void
    handleLogin(usuario: UserLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const savedValue = localStorage.getItem("user");
    const userLogado =  savedValue ? JSON.parse(savedValue) : "";


    const [usuario, setUsuario] = useState<UserLogin>(userLogado ? userLogado : {
        id: "",
        name: "",
        email: "",
        password: "",
        photo: "",
        token: ""
    })


    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true)
        try {
            let user = await login(`/usuarios/logar`, userLogin, setUsuario)
            toastAlerta('Usuário logado com sucesso', 'sucess')
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta('Dados do usuário inconsistentes', 'error')
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: "",
            name: "",
            email: "",
            password: "",
            photo: "",
            token: ""
        })

        localStorage.setItem("user", JSON.stringify({
            id: "",
            name: "",
            email: "",
            password: "",
            photo: "",
            token: ""
        }));
    }



    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
