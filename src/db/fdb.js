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
import {getUnixOfToday} from "@/service/calculators/UnixCalculator";

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

  //Dit kan verwijderd worden wanneer meerdere sensoren 1 meting terug geven.
  // Dit is een mock om de tabel op exerciseResults.vue nog goed in te laten laden
  // --------------------------------------------------------------------------------
  let docSnapData = docSnap.data().results;
  let dataList = [];
  for (let i = 0; i < docSnapData.length; i++) {
    if (docSnapData[i].hasOwnProperty("metingen")) {
      console.log("test")
      dataList.push({
        norm: docSnapData[i].metingen[0].norm.toString(),
        date: getUnixOfToday(),
        beweging: docSnapData[i].metingen[0].max_angle.toString(),
      });
    } else {
      dataList.push(docSnapData[i]);
    }
  }

  return { name: docSnap.data().name, results: dataList };
// --------------------------------------------------------------------------------

  // return docSnap.data();
}

export async function deleteCategory(docIdPatient, excersizeCategory) {
  const docRef = doc(db, "patienten", docIdPatient);
  const colRef = collection(docRef, "excersizeCategory");
  const docRef2 = doc(colRef, excersizeCategory);
  await deleteDoc(docRef2);
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
