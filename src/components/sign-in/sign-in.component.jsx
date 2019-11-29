import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ email: '', password: ''})
    }

    handleChange = event => {
        event.preventDefault();
        // pull name and value of the target input field
        const { name, value} = event.target;
        // dynamically set state based on input fields
        this.setState({ [name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    type = "email" 
                    name="email" 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label="email" 
                    required 
                    />
                    <FormInput 
                    type = "password" 
                    name="password" 
                    value={this.state.password} 
                    handleChange={this.handleChange} 
                    label="password"
                    required />

                    <CustomButton type="submit">SIGN IN </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;