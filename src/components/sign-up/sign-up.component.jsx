import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        // get details to submit
        const { displayName, email, password, confirmPassword } = this.state;
        // if password and confirm password do not match
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
           // creating a new user account with an email address and password 
           // destructuring to get that user that has been created 
           const { user } = await auth.createUserWithEmailAndPassword(email,password);
           // store the new user in firestore database with the displayName and other data
           await createUserProfileDocument(user, { displayName });
           // await the above operation to finish, then set our state
           // emptying our input fields after values stored in the database
           this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''              
           })
        } catch(error) {
            console.error(error);
        }
    }

    // handleChange method
    handleChange = event => {
        event.preventDefault();
        const { name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign Up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display Name'
                    required
                    />
                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                    />
                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                    />
                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;