import SignInInput from "./form-input/sign-in-form-input"
import Buttons from "../buttons/buttons";
import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utilities/firebase/firebase.utils";



const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

           setFormFields(defaultFormFields);
        } catch (error) {
            if(error.code === 'auth/wrong-password') {
                alert('Incorrect password, recheck and try again');
            } else if (error.code === 'auth/user-not-found') {
                alert('No account found for this email');
            } else {
                console.log(error);
            }
        }
    }

  return (
    <div className="sign-up-container"> 
        <form onSubmit={handleSubmit}>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <SignInInput label='Email' type='email' name='email' value={email} onChange={handleChange} required />
            <SignInInput label='Password' type='password' name='password' value={password} onChange={handleChange} required />
            <div className="buttons-container">
                <Buttons type='submit' value='Sign In'/>
                <Buttons type='button' value='Google Sign In' onClick={signInWithGoogle} btnType='googleBtn' /> 
            </div>
        </form>
    </div>
  )
}

export default SignInForm