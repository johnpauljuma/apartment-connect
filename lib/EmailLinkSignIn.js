// EmailLinkSignIn.js
import { auth } from '../src/app/lib/firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

const EmailLinkSignIn = () => {
  const sendLink = async (email) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/finishSignUp',  // Redirect URL after sign-in
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      console.log('Sign-in link sent!');
    } catch (error) {
      console.error('Error sending email link', error);
    }
  };

  const completeSignIn = async (email) => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        console.log("User signed in: ", result.user);
      } catch (error) {
        console.error("Error during email link sign-in", error);
      }
    }
  };

  return (
    <div>
      {/* Form and logic for email input to send/receive the sign-in link */}
    </div>
  );
};
