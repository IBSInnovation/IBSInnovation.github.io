import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getUnixOfToday } from "@/service/calculators/UnixCalculator";

const db = getFirestore();

export async function createFysio(name, email, uid) {
  try {
    const fysioRef = collection(db, "fysio");

    await setDoc(doc(fysioRef, uid), {
      userID: uid,
      name: name,
      email: email,
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

export async function addPatient(
  name,
  weight,
  dateOfBirth,
  heightInM,
  email,
  gender,
  fysiotherapeutNummer
) {
  try {
    const colRef = collection(db, "patienten");
    setDoc(doc(colRef), {
      name: name,
      weight: weight,
      dateOfBirth: dateOfBirth,
      heightInM: heightInM,
      email: email,
      gender: gender,
      fysiotherapeutNummer: fysiotherapeutNummer,
    });
  } catch (error) {
    console.error("Error creating patient", error);
  }
}

export async function editPatient(
  docKey,
  name,
  weight,
  dateOfBirth,
  heightInM,
  email,
  gender
) {
  const docRef = doc(db, "patienten", docKey);
  await updateDoc(docRef, {
    name: name,
    weight: weight,
    dateOfBirth: dateOfBirth,
    heightInM: heightInM,
    email: email,
    gender: gender,
  });
}

export async function getSinglePatient(docKey) {
  const docRef = doc(db, "patienten", docKey);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function deletePatient(docKey) {
  const docRef = doc(db, "patienten", docKey);
  await deleteDoc(docRef);
}

export async function addCategorie(docIdPatient, type) {
  const docRef = doc(db, "patienten", docIdPatient);
  const colRef = collection(docRef, "excersizeCategory");
  setDoc(
    doc(colRef, type),
    {
      name: type,
    },
    { merge: true }
  );
}

export async function addResultToCategory(docIdPatient, type, metingen) {
  const docRef = doc(db, "patienten", docIdPatient);
  const colRef = collection(docRef, "excersizeCategory");
  const docRef2 = doc(colRef, type);
  console.log("in de addresulttocategory");
  await updateDoc(docRef2, {
    results: arrayUnion({ date: getUnixOfToday(), metingen }),
  });
}

export async function getCategories(docIdPatient) {
  try {
    let map = new Map();
    const docRef = doc(db, "patienten", docIdPatient);
    const colRef = collection(docRef, "excersizeCategory");
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      map.set(doc.data().name, doc.data().results);
    });
    return map;
  } catch (error) {
    console.error("Error getting categories", error);
  }
}

export async function getCategoryResults(docIdPatient, excersizeCategory) {
  const docRef = doc(db, "patienten", docIdPatient);
  const colRef = collection(docRef, "excersizeCategory");
  const docRef2 = doc(colRef, excersizeCategory);

  const docSnap = await getDoc(docRef2);
  return docSnap.data();
}

export async function deleteCategory(docIdPatient, excersizeCategory) {
  const docRef = doc(db, "patienten", docIdPatient);
  const colRef = collection(docRef, "excersizeCategory");
  const docRef2 = doc(colRef, excersizeCategory);
  await deleteDoc(docRef2);
}

export async function createExercise(name, amountSensor, description, steps) {
  try {
    const exRef = collection(db, "exercises");

    await setDoc(doc(exRef), {
      name: name,
      amountSensor: amountSensor,
      description: description,
      steps: steps
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

export async function getPatients(uid) {
  const map = new Map();
  try {
    const colRef = collection(db, "patienten");
    const q = query(colRef, where("fysiotherapeutNummer", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      map.set(doc.id, doc.data());
    });
    return map;
  } catch (error) {
    console.error("Error getting objects from Firebase Database", error);
  }
}

export async function getSingleFysio(docKey) {
  const docRef = doc(db, "fysio", docKey);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getAllFysio() {
  const map = new Map();
  try {
    const q = query(collection(db, "fysio"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      map.set(doc.id, doc.data())
    });
    return map;
  } catch (error) {
    console.error("Error getting fysios from Firebase Database", error);
  }
}

export async function deleteFysio(docKey) {
  const docRef = doc(db, "fysio", docKey);
  await deleteDoc(docRef);
}

export async function makeAdmin(docKey) {
  return console.log("User has been made an admin")
}
