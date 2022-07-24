import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up/sign-up-form";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  }
   
  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign In</button>
        <SignUpForm />
    </div>
  )
}

export default SignIn