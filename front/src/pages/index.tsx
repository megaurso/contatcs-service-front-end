import ProtectedRoute from "@/components/protectedRoute"
import { ContactData,contactSchemas } from "@/schemas/contacts.schema"
import {  getUser } from "@/services/api.requisitions";
import {  NextPage } from "next"
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {UserInfoType } from "../schemas/user.schemas"


const Home:NextPage = () => {
  const [user, setUser] = useState<UserInfoType | undefined>();
  const cookies = parseCookies();
  const accessToken = cookies["contacts.token"];
  const tokenData = jwt.decode(accessToken);
  const userId = typeof tokenData?.sub === 'string' ? tokenData.sub : undefined;
  
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUser(accessToken,userId);
        setUser(userData);
      }
    };

    fetchData();
  }, [accessToken,userId]);

  return (
    <ProtectedRoute>
      <main>
        {user && (
          <>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.telephone}</h1>
            <h1>{user.date}</h1>
            <h2>Contatos</h2>
              <ol>
                {user.contacts.map((contact)=>(
                  <li key={contact.id}>
                    <h3>Nome:{contact.name}</h3>
                    <h3>Email:{contact.email}</h3>
                    <h3>Telefone:{contact.telephone}</h3>
                    <h3>Adicionado em {contact.date}</h3>
                  </li>
                ))}
              </ol>
          </>
        )}
      </main>
    </ProtectedRoute>
  )
}

export default Home
