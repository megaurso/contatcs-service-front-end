import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginData, loginSchema } from '@/schemas/user.schemas';
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from '@/contexts/authContext';


const CardLogin = () =>{

    const {register , handleSubmit} = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })
    
    const {login} = useAuth()

    const onFormSubmit = (formData: LoginData)=>{
        login(formData)
    }

    return(
        <div className=" w-360px py-8p mx-auto">
            <div className="box">
                <form className="form-login" onSubmit={handleSubmit(onFormSubmit)}>
                <input className="inputs" type="email" placeholder="Email" {...register("email")}/>
                <input className="inputs" type="password" placeholder="Senha" {...register("password")}/>
                <button className="button" type='submit'>login</button>
                <Link href={"/register"}>
                    <p className="mt-15 text-gray-400 text-xs">
                        Não é registrado? <span className="text-green-500 no-underline">Crie uma conta agora!</span>
                    </p>
                </Link>
                </form>
            </div>
        </div>
    )
}

export default CardLogin