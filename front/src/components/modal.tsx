import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { createContacts, deleteUser, editContacts, editUser } from '@/services/api.requisitions';
import { parseCookies } from 'nookies';
import { UserInfoType } from '@/schemas/user.schemas';
import { ContactData } from '@/schemas/contacts.schema';
import { useRouter } from "next/router";
const cookies = parseCookies();
const accessToken = cookies["contacts.token"];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  contactsUser: ContactData[]
  setContactsUser:(value: ContactData[]) => void;
};

interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserInfoType | undefined;
    setUser:(value: UserInfoType) => void;
}

interface ModalContactProps {
    isOpen: boolean;
    onClose: () => void;
    contact: ContactData;
    contactsUser: ContactData[];
    setContactsUser:(value: ContactData[]) => void;
  }

export const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose,user, setUser }) => {
  const router = useRouter()
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        telephone: user?.telephone || "",
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
      };
    
      const handleSaveProfile = async () => {
        const res = await editUser(accessToken,profileData,user!.id);
        setUser(res)
        onClose();
      };

      
      const handleDeleteUser =async (userId:string) => {
        try {
          await deleteUser(accessToken,userId)
          router.push("/login")
        } catch (error) {
          console.log(error)
          return error
        }
      }
    
    return (
    <Dialog.Root  open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay onClick={onClose} className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Editar perfil
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Mude as informações do perfil aqui. Clique em salvar após alterar.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                Nome
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                name="name"
                placeholder="Escreva o novo nome aqui!"
                value={profileData.name}
                onChange={handleInputChange}
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                Email
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Escreva o novo email aqui!"
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="cellphone">
                Telefone
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="cellphone"
                name="telephone"
                value={profileData.telephone}
                onChange={handleInputChange}
                placeholder="Escreva o telefone aqui!"
            />
            </fieldset>
            <div className="mt-[25px] flex gap-3 justify-end">
                <button onClick={()=> handleDeleteUser(user!.id)} className='uppercase bg-red-100 text-red-600 hover:bg-red-400 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'>deletar conta</button>
            <Dialog.Close asChild>
                <button onClick={handleSaveProfile} className="uppercase bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Salvar
                </button>
            </Dialog.Close>
            </div>
            <Dialog.Close asChild>
            </Dialog.Close>
        </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  );
};


export const ModalContacts: React.FC<ModalContactProps> = ({ isOpen, onClose,contact:currentContact,contactsUser, setContactsUser }) => {
    const [profileData, setProfileData] = useState({
        name: currentContact?.name || "",
        email: currentContact?.email || "",
        telephone: currentContact?.telephone || "",
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
      };
    
      const handleSaveProfile = async () => {
        const res = await editContacts(accessToken,profileData,currentContact.id);
        const filterContacts = contactsUser.map((contact)=>{
            return contact.id === currentContact.id ? {...contact, ...res}: contact
        })
        setContactsUser(filterContacts)
        onClose();
      };
    return (
    <Dialog.Root  open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay onClick={onClose} className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Editar contatos
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Mude as informações do seus contatos aqui. Clique em salvar após alterar.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                Nome
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Escreva o novo nome aqui!"
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                Email
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Escreva o novo email aqui!"
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="cellphone">
                Telefone
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="cellphone"
                name="telephone"
                value={profileData.telephone}
                onChange={handleInputChange}
                placeholder="Escreva o telefone aqui!"
            />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
                <button onClick={handleSaveProfile} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Salvar
                </button>
            </Dialog.Close>
            </div>
            <Dialog.Close asChild>
            </Dialog.Close>
        </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  );
};

export const ModalCreateContacts: React.FC<ModalProps> = ({ isOpen, onClose,contactsUser, setContactsUser }) => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        telephone: '',
      });
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
      };
    
      const handleCreateContact = async () => {
            const res = await createContacts(accessToken, contactData);
            setContactsUser([...contactsUser,res])
            onClose();
      };
  return (
    <Dialog.Root  open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay onClick={onClose} className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Crie um novo contato para sua agenda
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Faça aqui novos contatos para implementar na sua agenda online.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                Nome
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                name="name"
                value={contactData.name}
                onChange={handleInputChange}
                placeholder="Escreva o novo nome aqui!"
                type="email"
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                Email
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="email"
                name='email'
                value={contactData.email}
                onChange={handleInputChange}
                placeholder="Escreva o novo email aqui!"
                type="email"
            />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="cellphone">
                Telefone
            </label>
            <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="cellphone"
                name='telephone'
                value={contactData.telephone}
                onChange={handleInputChange}
                placeholder="Escreva o telefone aqui!"
                type="email"
            />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
                <button onClick={handleCreateContact} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Criar contato!
                </button>
            </Dialog.Close>
            </div>
            <Dialog.Close asChild>
            </Dialog.Close>
        </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  );
};

