import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[40vh] bg-neutral">
      <div className="form-container w-full max-w-xs p-8 border border-gray-300 rounded-lg shadow-lg">
        <h1>Log In</h1>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-lg">Email</label>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block font-semibold text-lg">Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300">LOG IN</button>
        </form>
        <p className="error-message text-red-500 text-center mt-4">{error}</p>
      </div>
    </div>
  );
}