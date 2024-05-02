import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import OrganizationPage from '../OrganizationPage/OrganizationPage';
import InitiativesPage from '../InitiativesPage/InitiativesPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/organizations" element={<OrganizationPage />} />
            <Route path="/" element={<Navigate to="/organizations" />} />
            <Route path="/initiatives" element={<InitiativesPage />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path="*" element={<AuthPage setUser={setUser} />} />
        </Routes>
      }
    </main>
  );
}
