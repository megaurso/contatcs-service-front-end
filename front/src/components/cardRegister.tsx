import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { UserData, userSchema } from '@/schemas/user.schemas';
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from '@/contexts/authContext';



const CardRegister = () =>{

    const {register , handleSubmit} = useForm<UserData>({
        resolver:zodResolver(userSchema)
    })
    
    const { register: registerUser} = useAuth()

    const onFormSubmit = (formData: UserData)=>{
       registerUser(formData)
    }

    return(
        <div className=" w-360px py-8p mx-auto">
            <div className="box">
                <form className="form-register" onSubmit={handleSubmit(onFormSubmit)}>
                <input className="inputs" type="text" placeholder="Nome Completo" {...register("name")}/>
                <input className="inputs" type="text" placeholder="Email" {...register("email")}/>
                <input className="inputs" type="password" placeholder="Senha" {...register("password")}/>
                <input className="inputs" type="text" placeholder="Telefone" {...register("telephone")}/>
                <button className="button" type='submit'>Criar conta</button>
                <Link href={"/login"}>
                    <p className="mt-15 text-gray-400 text-xs">
                        Ja é registrado? <span className="text-green-500 no-underline">Vá para area de login!</span>
                    </p>
                </Link>
                </form>
            </div>
        </div>
    )
}

export default CardRegister