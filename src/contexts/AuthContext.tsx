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

    const [usuario, setUsuario] = useState<UserLogin>({
        id: "0",
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
            await login(`/usuarios/logar`, userLogin, setUsuario)
            toastAlerta('Usuário logado com sucesso', 'sucess')

            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta('Dados do usuário inconsistentes', 'error')
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            name: "",
            email: "",
            password: "",
            photo: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}