import {  deleteContacts, getUser } from "@/services/api.requisitions";
import {  GetServerSideProps, NextPage } from "next"
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {UserInfoType } from "../schemas/user.schemas"
import nookies from "nookies"
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';
import { IoPersonAdd } from "react-icons/io5"
import { BiTrash } from "react-icons/bi"
import { ModalCreateContacts,ModalContacts,ModalProfile } from "@/components/modal";
import { ContactData } from "@/schemas/contacts.schema";



const Home:NextPage = () => {
  const [user, setUser] = useState<UserInfoType | undefined>();
  const [contactsUser, setContactsUser] = useState<ContactData[]>([]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isContactsModalOpen, setContactsModalOpen] = useState(false);
  const [isCreateContactsModalOpen, setCreateContactsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({} as ContactData);
  const cookies = parseCookies();
  const accessToken = cookies["contacts.token"];
  const tokenData = jwt.decode(accessToken);
  const userId = typeof tokenData?.sub === 'string' ? tokenData.sub : undefined;

  const handleDeleteContact = async (contactId:string) => {
    try {
      await deleteContacts(accessToken, contactId);
      const updatedContacts = contactsUser.filter(contact => contact.id !== contactId);
      setContactsUser(updatedContacts);
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUser(accessToken,userId);
        setUser(userData);
        setContactsUser(userData.contacts)
      }
    };
    
    fetchData();
  }, [accessToken,userId,contactsUser]);
  
  const handleCreateContactModalOpen = () => {
    setCreateContactsModalOpen(true);
  };

  const handleCreateContactModalClose = () => {
    setCreateContactsModalOpen(false);
  };

  const handleProfileModalOpen = () => {
    setProfileModalOpen(true);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  const handleContactsModalOpen = (contact:ContactData) => {
    setContactsModalOpen(true);
    setCurrentContact(contact)
  };

  const handleContactsModalClose = () => {
    setContactsModalOpen(false);
  };

  
  return (
    <main className="flex flex-col justify-center items-center w-full">
        <header className="flex items-center justify-around w-full h-20 border-gray-400 border-b-2">
            <div className="flex items-center gap-2.5">
                <h2 className="text-black font-bold uppercase text-xl">Agenda online!</h2>
            </div>
            <Link className="border-black border p-2 uppercase rounded-sm w-20 flex justify-center items-center text-base" href={"/login"}>
              Sair
            </Link>
        </header>
        {user && (
          <>
          <section className="mt-8 h-24 flex items-center p-4 justify-around w-2/3 border bg-gray-300 border-gray-400 mb-10">
            <h1>Nome: {user.name}</h1>
            <h1>Seu email: {user.email}</h1>
            <h1>Telefone: {user.telephone}</h1>
            <h1>Data de cadastro: {user.date}</h1>
            <button onClick={handleProfileModalOpen}><FaPencilAlt title="Editar perfil"/></button>
          </section>
            <h2 className="text-6xl text-gray-700">Seus Contatos!</h2>
            <ol className="mt-10 flex items-baseline flex-wrap pt-5 w-2/3 gap-1 justify-around h-96 border bg-gray-300 overflow-y-auto border-gray-400 max-w-7xl">
              {contactsUser && contactsUser.length > 0 ? (
                contactsUser.map((contact) => (
                  <li className="bg-white flex items-baseline justify-center flex-col capitalize border p-2 gap-2 w-72 h-48 flex-wrap" key={contact.id}>
                    <h3>Nome: {contact.name}</h3>
                    <h3>Email: {contact.email}</h3>
                    <h3>Telefone: {contact.telephone}</h3>
                    <h3>Adicionado em {contact.date}</h3>
                    <div className="flex gap-5">
                    <button><FaPencilAlt onClick={()=>handleContactsModalOpen(contact)} title="Editar contato" /></button>
                    <button onClick={()=> handleDeleteContact(contact.id)}><BiTrash title="Excluir contato"/></button>
                    </div>
                  </li>
                ))
              ) : (
                <h1 className="pt-36 text-6xl text-red-600">Você não possui nenhum contato!</h1>
              )}
            </ol>
            <button onClick={handleCreateContactModalOpen} className="m-5 mr-auto pl-80"><IoPersonAdd size={30} title="Adicionar contato"/></button>
          </>
        )}
      <ModalProfile isOpen={isProfileModalOpen} onClose={handleProfileModalClose} user={user} setUser={setUser}/>
      <ModalContacts isOpen={isContactsModalOpen} onClose={handleContactsModalClose} contact={currentContact} contactsUser={contactsUser} setContactsUser={setContactsUser}/>
      <ModalCreateContacts isOpen={isCreateContactsModalOpen} onClose={handleCreateContactModalClose} contactsUser={contactsUser} setContactsUser={setContactsUser}/>
      </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  if(!cookies["contacts.token"]){
    return {
      redirect:{
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props:{}
  }

}

export default Home
