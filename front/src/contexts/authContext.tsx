import { LoginData, UserData } from "@/schemas/user.schemas";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode,createContext, useContext } from "react"
import { toast } from "react-toastify"


interface Props{
    children: ReactNode
}

interface authProviderData {
    register: (userData: UserData) => void;
    login: (loginData:LoginData) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData)

export const AuthProvider = ({children}: Props)=>{
    const router = useRouter()

    const register = (userData:UserData)=>{
        api.post("/users", userData)
        .then(()=>{
            toast.success('Usuario cadastrado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            router.push("/login")
        }).catch((err)=>{
            console.log(err)
            toast.error('Criação invalida tente novamente mais tarde ou utilize outro email', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

    const login =(loginData:LoginData)=>{
        api.post("/login",loginData)
        .then((response)=>{
            setCookie(null,"contacts.token",response.data.token,{
                maxAge:60 * 60,
                path: "/"
            })
        })
        .then(()=>{
            toast.success('Seja bem vindo!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            router.push("/")
        }).catch((err)=>{
            console.log(err)
            toast.error('Email ou senha incorretas tente novamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    })
    }
    return <AuthContext.Provider value={{register,login}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)