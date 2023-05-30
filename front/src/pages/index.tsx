import { contactData } from "@/schemas/contacts.schema"
import api from "@/services/api"
import { GetServerSideProps, NextPage } from "next"

interface HomeProps {
  contacts: contactData[]
}

// export const getServerSideProps: GetServerSideProps =async () => {
//   const res = await api.get<contactData[]>("/contacts")

//   return {
//     props:{contacts: res.data}
//   }
// }

const Home:NextPage<HomeProps> = ({contacts}) => {
  console.log(contacts)
  return (
    <main>
      <h1>hi</h1>
    </main>
  )
}

export default Home
