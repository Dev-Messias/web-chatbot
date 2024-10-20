import { useState, createContext, ReactNode } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

interface AuthContextData {
    signIn: (credentials: SignInProps) => Promise<void>;
    fetchMessages: (credentials: IdContactProps) => Promise<void>;
    login: boolean;
    logoutUser: () => Promise<void>;
    fetchContacts: () => Promise<void>;
    contacts: contactProps[];
    messages: Message[];
}

interface SignInProps {
    apiKey: string;
}

interface IdContactProps {
    id: string | undefined ;
}

interface contactProps {
    identity: string;
    name: string;
    phoneNumber: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

interface Message {
    id: string;
    content: string;
    direction: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const apikey = localStorage.getItem('blipApiKey');
    const [login, setLogin] = useState(false);
    const [contacts, setContacts] = useState<contactProps[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);


    async function signIn({ apiKey }: SignInProps) {
        //requisição login
        try {

            const response = await fetch('https://http.msging.net/commands', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: "1", method: "get", uri: "/contacts" })
            });

            if (response.ok) {
                localStorage.setItem('blipApiKey', apiKey); // Persistindo a chave
                setLogin(true)
                toast.success("Sucesso ao fazer login.")
                navigate('/home')// Redireciona para a rota home

            } else {
                toast.error("Chave API inválida!")
                setLogin(false)
            }

        } catch (error) {
            toast.error("Erro tente novamente mais tarde!")
            setLogin(false)
        }
    }

    async function logoutUser() {
        localStorage.removeItem('blipApiKey');
        navigate('/')
    }

    async function fetchContacts() {
        try {
            const response = await fetch('https://http.msging.net/commands', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${apikey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: "1", method: "get", uri: "/contacts" })
            });
            const data = await response.json();
            setContacts(data.resource.items);
        } catch (error) {
            console.log('Erro ao buscar contatos')
        }
    }

    async function fetchMessages({ id }: IdContactProps){
        try {
            const response = await fetch('https://http.msging.net/commands', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${apikey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: "1", method: "get", uri: `/threads/${id}` })
            });
            const data = await response.json();
            setMessages(data.resource.items);
        } catch (error) {
            //console.error('Erro ao buscar mensagens', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                login,
                logoutUser,
                fetchContacts,
                fetchMessages,
                contacts,
                messages
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}