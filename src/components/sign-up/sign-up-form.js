import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils";
import FormInput from "./form-input/form-input";
import './sign-up-form.scss'
import Buttons from "../buttons/buttons";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};




const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormFields({...formFields, [name]: value});
    }

    // console.log(formFields);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('passwords are different');
            return;
        }
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password); //authenticates

            // to store in firestore we need to create the doc
            createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormFields);
        } catch(error) {
            error.code === 'auth/email-already-in-use' ? alert('Cannot create user. Email is already in use') : console.log(error);
        }

    };

  return (
    <div className="sign-up-container">
        <h2>Dont have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type='text' name='displayName' onChange={handleChange} value={displayName} required />
            <FormInput label='Email' type='email' name='email' value={email} onChange={handleChange} required />
            <FormInput label='Password' type='password' name='password' value={password} onChange={handleChange} required />
            <FormInput label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} required />

            <Buttons type='submit' value='Submit' />
        </form>
    </div>
  )
}

export default SignUpForm