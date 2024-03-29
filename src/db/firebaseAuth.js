import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import store from "../store/userStore.js";
import router from "../router/index.js";
import { createFysio, getSingleFysio } from "./fdb";

export async function registerWithEmail(value) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      let user = userCredential.user;
      store.commit("setUser", user);
      createFysio(value.displayName, user.email, user.uid);
      router.push({ path: "/patients" });
    })
    .catch((error) => {
      return error.code;
    });
}

export async function login(value) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      store.commit("setUser", user);
      router.push({ path: "/patients" });
      return { succes: true, errorMessage: "" };
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          throw { succes: false, error: "Invalid email" };
        case "auth/user-not-found":
          throw {
            succes: false,
            error: "No account with that email was found",
          };
        case "auth/wrong-password":
          throw { succes: false, error: "Incorrect password" };
        default:
          throw {
            succes: false,
            error: "Email or password was incorrect",
          };
      }
    });
}

export async function RegisterWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const uCheck = await getSingleFysio(user.uid)

      if ( uCheck == undefined) { 
        const newUser = {}
        createFysio(newUser.displayName, newUser.email, newUser.uid).then(
          result => console.log(result)
        )
        console.log("New User: " + newUser)
        store.commit("setUser", newUser ) } 

      else store.commit("setUser", uCheck);

      router.push({ path: "/patients" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function logOut() {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      store.dispatch("logOutUser");
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log(error);
    });
}
