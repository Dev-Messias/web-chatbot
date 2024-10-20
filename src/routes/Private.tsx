import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type AuthProviderProps = {
    children: ReactNode;
}

function Private({ children }: AuthProviderProps) {
    const apikey = localStorage.getItem('blipApiKey');


    //se não estiver logado
    if (!apikey) {
        return <Navigate to="/" />
    }

    return children
}

export default Private;