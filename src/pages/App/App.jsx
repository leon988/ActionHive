import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getAllOrganizations } from '../../utilities/organizations-api';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage';
import AllOrgPage from '../AllOrgPage/AllOrgPage';
import InitiativesPage from '../InitiativesPage/InitiativesPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import OrganizationPage from '../OrganizationPage/OrganizationPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const organizationsData = await getAllOrganizations();
        setOrganizations(organizationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <main className="App">
      {user ? (
        <>
          {/* Routes for organizations or volunteers */}
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Check if the user is an organization */}
            {user.role === 'Organization' && (
              <>
                <Route path="/organizations" element={<OrganizationPage user={user} organization={organization} />} />
                <Route path="/organizations/index" element={<AllOrgPage organization={organization} loading={loading}/>} />
                <Route path="/initiatives" element={<InitiativesPage />} />
              </>
            )}
            {/* Check if the user is a volunteer */}
            {user.role === 'Volunteer' && (
              <Route path="/initiatives" element={<InitiativesPage />} />
            )}
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<AuthPage setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}
