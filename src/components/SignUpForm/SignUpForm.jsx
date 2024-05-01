import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    organization: false,
    error: ''
  };

  handleChange = (evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password, organization } = this.state;
      const formData = { name, email, password, organization };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <label>Organization</label>
            <input type="checkbox" name="organization" checked={this.state.organization} onChange={this.handleChange} />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

// TODO: NEW FORM
// import { Component } from 'react';
// import { signUp } from '../../utilities/users-service';

// export default class SignUpForm extends Component {
//   state = {
//     name: '',
//     email: '',
//     password: '',
//     confirm: '',
//     role: 'Volunteer', // Default to 'Volunteer'
//     error: ''
//   };

//   handleChange = (evt) => {
//     const { name, value } = evt.target;
//     this.setState({
//       [name]: value,
//       error: ''
//     });
//   };

//   handleSubmit = async (evt) => {
//     evt.preventDefault();
//     if (this.state.password !== this.state.confirm) {
//       this.setState({ error: 'Passwords do not match' });
//       return;
//     }
//     try {
//       const { name, email, password, role } = this.state;
//       const formData = { name, email, password, role };
//       const user = await signUp(formData);
//       this.props.setUser(user);
//     } catch {
//       this.setState({ error: 'Sign Up Failed - Try Again' });
//     }
//   };

//   render() {
//     return (
//       <div className="form-container">
//         <form autoComplete="off" onSubmit={this.handleSubmit}>
//           <label>Name</label>
//           <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
//           <label>Email</label>
//           <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
//           <label>Password</label>
//           <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
//           <label>Confirm Password</label>
//           <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
//           <label>Role</label>
//           <select name="role" value={this.state.role} onChange={this.handleChange}>
//             <option value="Volunteer">Volunteer</option>
//             <option value="Organization">Organization</option>
//           </select>
//           <button type="submit">SIGN UP</button>
//         </form>
//         <p className="error-message">&nbsp;{this.state.error}</p>
//       </div>
//     );
//   }
// }
