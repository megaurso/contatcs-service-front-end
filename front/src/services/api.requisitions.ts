import api from "./api";
import Toast from "../components/toast";

type Contact = {
  name: string;
  email: string;
  telephone: string;
};

export const getUser = async (accessToken: string, id: string) => {
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editUser = async (
  accessToken: string,
  contact: Contact,
  idUser: string
) => {
  try {
    const response = await api.patch(`/users/${idUser}`, contact, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Toast({ message: "Usuario editado", isSucess: true });
    return response.data;
  } catch (error) {
    console.log(error);
    Toast({
      message: "Email precisa ser valido ou email ja existe!",
      isSucess: false,
    });
    return error;
  }
};
export const deleteUser = async (accessToken: string, idUser: string) => {
  try {
    await api.delete(`/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Toast({ message: "Sua conta foi excluida!", isSucess: true });
  } catch (error) {
    return error;
  }
};

export const createContacts = async (accessToken: string, contact: Contact) => {
  try {
    const response = await api.post("/contacts/", contact, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Toast({ message: "Contato adicionado na sua lista", isSucess: true });
    return response.data;
  } catch (error) {
    Toast({
      message: "Email precisa ser valido ou email ja existe!",
      isSucess: false,
    });
    return error;
  }
};

export const editContacts = async (
  accessToken: string,
  contact: Contact,
  idContact: string
) => {
  try {
    const response = await api.patch(`/contacts/${idContact}/`, contact, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Toast({ message: "Contato editado", isSucess: true });
    return response.data;
  } catch (error) {
    Toast({
      message: "Email precisa ser valido ou email ja existe!",
      isSucess: false,
    });
    return error;
  }
};

export const deleteContacts = async (
  accessToken: string,
  idContacts: string
) => {
  try {
    await api.delete(`/contacts/${idContacts}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Toast({ message: "Contato deletado da sua lista", isSucess: true });
  } catch (error) {
    return error;
  }
};
