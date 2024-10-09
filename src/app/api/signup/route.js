// app/api/signup/route.js
import { auth, firestore } from '../../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req) {
  const { firstName, lastName, email, phone, password, userType, agencyName, location } = await req.json();

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Collect additional info based on the user type (tenant, apartment owner, agency)
    const userData = {
      userType,                // Either 'tenant', 'apartment owner', or 'agency'
      firstName,
      lastName,
      phone,
      agencyName: userType === 'agency' ? agencyName : '',   // Agency-specific data
      location: userType === 'agency' ? location : '',       // Agency-specific data
    };

    // Store this user data in Firestore under 'users' collection
    const userDocRef = doc(firestore, 'users', userCredential.user.uid);
    await setDoc(userDocRef, userData);
    
    // Success response
    return new Response(JSON.stringify({ message: 'User created successfully!' }), { status: 201 });
  } catch (error) {
    let errorMessage;

    // Handle specific Firebase error codes
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak. It should be at least 6 characters.';
        break;
      default:
        errorMessage = 'Sign-up failed, please try again.';
    }

    // Log the error and return response
    console.error("Error during signup: ", error.message);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
  }
}
