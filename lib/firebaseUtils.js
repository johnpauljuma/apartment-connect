// firebaseUtils.js
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const saveUserTypeData = async (uid, userTypeData) => {
  try {
    if (userTypeData.userType === 'tenant') {
      await setDoc(doc(db, "tenants", uid), userTypeData);
    } else if (userTypeData.userType === 'owner') {
      await setDoc(doc(db, "owners", uid), userTypeData);
    } else if (userTypeData.userType === 'agency') {
      await setDoc(doc(db, "agencies", uid), userTypeData);
    }
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

export { saveUserTypeData };
