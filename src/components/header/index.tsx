import imgBot from '@/assets/chatbot.png'
import Container from '../container';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"
import { useContext } from 'react';
import { LogOut } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  return (
    <header className="w-full py-6 px-2  bg-white" >
      <Container>
        <div className="w-full flex flex-row items-center justify-between "  >
          <div className='flex flex-row items-center cursor-pointer ' onClick={() => navigate('/home')} >
            <img src={imgBot} alt="logo-bot" className="w-11" />
            <h1 className="text-xl font-bold" >Web-Chatbot</h1>
          </div>
          <LogOut className='text-red-500 cursor-pointer' onClick={() => logoutUser()} />
        </div>
      </Container>
    </header>
  )
}

export default Header;