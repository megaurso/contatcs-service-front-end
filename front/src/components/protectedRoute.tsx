import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> =({children}) => {
    const router = useRouter()

    useEffect(()=>{
        const checkAuthentication = () => {
            const cookies = parseCookies();
            const token = cookies['contacts.token'];
      
            if (!token) {
              router.push('/login');
            }
          };
      
          checkAuthentication();
    },[router])

    return <>{children}</>
}

export default ProtectedRoute