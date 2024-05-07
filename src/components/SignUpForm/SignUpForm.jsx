import React, { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'Volunteer',
    error: ''
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password, role } = this.state;
      const formData = { name, email, password, role };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="flex-auto p-8 m-2 border border-gray-300 rounded-lg shadow-lg" style={{ maxWidth: '500px', minWidth: '300px' }}>
      <h1 className="text-xl font-bold mb-4">Log In</h1>  
          <form autoComplete="off" onSubmit={this.handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-lg">Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold text-lg">Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold text-lg">Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold text-lg">Confirm Password</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex justify-start space-x-4 mt-4">
              <label className="flex items-center">
                <input type="radio" name="role" value="Volunteer" checked={this.state.role === 'Volunteer'} onChange={this.handleChange} className="mr-2" />
                Volunteer
              </label>
              <label className="flex items-center">
                <input type="radio" name="role" value="Organization" checked={this.state.role === 'Organization'} onChange={this.handleChange} className="mr-2" />
                Organization
              </label>
            </div>
            <button type="submit" disabled={disable} className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300">SIGN UP</button>
          </form>
          <p className="error-message text-red-500 text-center mt-4">{this.state.error}</p>
        </div>
    );
  }
}
