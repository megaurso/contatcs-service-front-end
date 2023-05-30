export interface iInputsProps{
    placeholder: string,
    type: string,
    className:string
}

export const Inputs = ({placeholder,type,className}: iInputsProps) =>{
    return (
        <input placeholder={placeholder} type={type} className={className}/>
    )
}