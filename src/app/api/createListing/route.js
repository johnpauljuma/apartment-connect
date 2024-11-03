
import { auth, firestore } from '../../../../lib/firebase';
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const listingData = req.body; // Contains userId, createdBy, and other details

      const docRef = await addDoc(collection(auth, "listings"), listingData);

      res.status(200).json({ id: docRef.id, message: 'Listing created successfully!' });
    } catch (error) {
      console.error("Error adding document: ", error);
      res.status(500).json({ error: 'Failed to create listing' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
