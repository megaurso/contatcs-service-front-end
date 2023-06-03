import { LoginData, UserData } from "@/schemas/user.schemas";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode,createContext, useContext } from "react"
import  Toast  from "../components/toast";



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
        api
        .post("/users", userData)
        .then(()=>{
            Toast({message: "Usuario cadastrado!", isSucess:true})
            router.push("/login")
        })
        .catch((err)=>{
            console.log(err)
            Toast({message:'Criação invalida tente novamente mais tarde ou utilize outro email', isSucess:false})
        });
    }

    const login =(loginData:LoginData)=>{
        api
        .post("/login",loginData)
        .then((response)=>{
            setCookie(null,"contacts.token",response.data.token,{
                maxAge:60 * 60,
                path: "/"
            })
        })
        .then(()=>{
            Toast({message:'Seja bem vindo!',isSucess:true})
            router.push("/")
        })
        .catch((err)=>{
            console.log(err)
            Toast({message:"Email ou senha incorretas tente novamente!", isSucess:false})
        });
    }
    return <AuthContext.Provider value={{register,login}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)