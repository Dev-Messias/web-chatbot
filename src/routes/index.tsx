import { Routes, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import DetailContact from '@/pages/detailContact';
import Private from './Private';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />

            {/** Rota Privada */}
            <Route path='/home' element={<Private><Home /></Private>} />
            <Route path='/contact/:id' element={<Private><DetailContact /></Private>} />
        </Routes>
    )
}

export default RoutesApp;

