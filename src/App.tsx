
import { BrowserRouter } from "react-router-dom";

import RoutesApp from "./routes";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer className="px-7 pt-2 md:px-0 md:pt-0" autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
