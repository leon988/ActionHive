import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import CreateInitiativePage from '../CreateInitiativePage/CreateInitiativePage';
import DetailInitiativePage from '../DetailInitiativePage/DetailInitiativePage';
import EditInitiativePage from '../EditInitiativePage/EditInitiativePage';
import VolunteerPage from '../VolunteerPage/VolunteerPage';

  export default function App() {
    const [user, setUser] = useState(getUser());
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentOrganizationId, setCurrentOrganizationId] = useState(null);
  
    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const organizationsData = await getAllOrganizations();
          setOrganizations(organizationsData);
          setLoading(false);
          // Set the current organization ID to the first organization's ID
          if (organizationsData.length > 0) {
            setCurrentOrganizationId(organizationsData[0]._id);
          }
        } catch (error) {
          console.error('Error fetching organizations:', error);
        }
      };
  
      fetchOrganizations();
    }, []);
  
    return (
      <main className="App">
        {/* change line */}
        {user ? (
          <>
            {/* Routes for organizations or volunteers */}
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/organizations/index" element={<AllOrgPage organizations={organizations} loading={loading}/>} />
              <Route path="/initiatives/:id" element={<DetailInitiativePage />} />
              {/* Check if the user is an organization */}
              {user.role === 'Organization' && (
                <>
                  <Route path="/organizations" element={<OrganizationPage user={user} organizations={organizations} />} />
                  <Route path="/initiatives/create" element={<CreateInitiativePage organizationId={currentOrganizationId} />} />
                  <Route path="/initiatives/:id/edit" element={<EditInitiativePage />} />
                  <Route path="/initiatives" element={<InitiativesPage />} />
                </>
              )}
              {/* Check if the user is a volunteer */}
              {user.role === 'Volunteer' && (
                <>
                  <Route path="/volunteer" element={<VolunteerPage user={user} />} />
                </>
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
