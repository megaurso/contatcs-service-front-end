import api from "./api";

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

export const deleteContacts = async (accessToken: string, idContacts: string) => {
  try {
    await api.delete(`/contacts/${idContacts}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
