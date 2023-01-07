import { initializeApp } from "firebase/app";
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg5WrTakEr3LYlIX-9XByjiKvNe3D897U",
  authDomain: "silver-springs-reser.firebaseapp.com",
  projectId: "silver-springs-reser",
  storageBucket: "silver-springs-reser.appspot.com",
  messagingSenderId: "193810657209",
  appId: "1:193810657209:web:f12a529390870696eb5068",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:5173/",
  // This must be true.
  handleCodeInApp: true,
};

export const sendSignInLink = (email: string) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};

export const isRedirectedFromEmailLink = () =>
  isSignInWithEmailLink(auth, window.location.href);

export const handleEmailLinkRedirect = () => {
  let email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Please re-enter your email for confirmation") ?? "";
  }

  // The client SDK will parse the code from the link for you.
  return signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      console.log({ result });
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .finally(() => {
      // remove query params from url
      window.history.replaceState({}, document.title, "/");
    });
};

export const logout = () => auth.signOut();
