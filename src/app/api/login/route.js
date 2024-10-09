import { auth } from '../../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../../lib/firebase'; // Adjust the import path as needed

export async function POST(req) {
  const { email, password } = await req.json(); 

  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;

    // Fetch user details from Firestore
    const userDoc = doc(firestore, 'users', uid); // Adjust the collection name as needed
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }

    const userData = docSnap.data();
    const { firstName, lastName, agencyName, userType } = userData;

    return new Response(
      JSON.stringify({
        message: 'Login successful!',
        user: {
          uid,
          email,
          userType,
          firstName,
          lastName,
          agencyName,
        },
      }), { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    return new Response(JSON.stringify({ error: 'Login failed, please try again' }), { status: 400 });
  }
}
