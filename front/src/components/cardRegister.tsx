import Link from 'next/link';
import { Inputs } from "./inputs"



const CardRegister = () =>{

    return(
        <div className=" w-360px py-8p mx-auto">
            <div className="rounded-md bg-white max-w-360px mx-auto mb-100px p-45 text-center shadow-md">
                <form className="flex flex-col items-center justify-around w-96 h-80 ">
                <Inputs className="outline-none bg-f2f2f2 w-64 border-0 mb-15px p-15 box-border text-14px " type="text" placeholder="Nome Completo"/>
                <Inputs className="outline-none bg-f2f2f2 w-64 border-0 mb-15px p-15 box-border text-14px " type="text" placeholder="Email"/>
                <Inputs className="outline-none bg-f2f2f2 w-64 border-0 mb-15px p-15 box-border text-14px" type="password" placeholder="Senha"/>
                <Inputs className="outline-none bg-f2f2f2 w-64 border-0 mb-15px p-15 box-border text-14px " type="text" placeholder="Telefone"/>
                <button className="uppercase outline-none bg-green-500 hover:bg-green-600 w-40 p-2 rounded-md border-0 p-15 text-white text-14px cursor-pointer">Criar conta</button>
                <Link href="/login">
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