// ================= Firebase Imports =================
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ================= Global State =================
let isLoggedIn = false;
let currentUser = null;
let isRegisterMode = false;

// ================= Auth Functions =================
function showAuthModal(registerMode = false){
  isRegisterMode = registerMode;

  authTitle.innerText = registerMode ? "Register" : "Login";
  authSubmitBtn.innerText = registerMode ? "Register" : "Login";
  authSwitchBtn.innerText = registerMode
    ? "Already have account?"
    : "Create new account";

  confirmPasswordGroup.style.display = registerMode ? "block" : "none";

  usernameInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";

  authScreen.style.display = "flex";
}

// -------- LOGIN --------
async function handleLogin(){
  const email = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if(!email || !password){
    alert("Email आणि Password टाका");
    return;
  }

  try{
    const cred = await signInWithEmailAndPassword(auth, email, password);
    currentUser = cred.user;
    isLoggedIn = true;
    authScreen.style.display = "none";
  }catch(err){
    alert(err.message);
  }
}

// -------- REGISTER --------
async function handleRegister(){
  const email = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmPasswordInput.value.trim();

  if(password !== confirm){
    alert("Password जुळत नाही");
    return;
  }

  try{
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: email,
      role: "user",
      createdAt: serverTimestamp()
    });

    currentUser = cred.user;
    isLoggedIn = true;
    authScreen.style.display = "none";
    alert("Account created successfully");
  }catch(err){
    alert(err.message);
  }
}

// -------- LOGOUT --------
async function logout(){
  await signOut(auth);
  alert("Logged out successfully");
}

// ================= Auth State Listener =================
onAuthStateChanged(auth, async (user)=>{
  if(user){
    isLoggedIn = true;
    currentUser = user;

    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.data();

    userStatus.innerText = "Welcome " + data.email;
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    if(data.role === "admin"){
      addProductBtn.style.display = "inline-block";
    }
  }else{
    isLoggedIn = false;
    currentUser = null;
    userStatus.innerText = "Welcome Guest";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    addProductBtn.style.display = "none";
  }
});

// ================= DOM Ready =================
document.addEventListener("DOMContentLoaded", ()=>{

  // Elements
  authScreen = document.getElementById("authScreen");
  authTitle = document.getElementById("authTitle");
  authSubmitBtn = document.getElementById("authSubmitBtn");
  authSwitchBtn = document.getElementById("authSwitchBtn");
  authMessage = document.getElementById("authMessage");
  authHint = document.getElementById("authHint");

  usernameInput = document.getElementById("usernameInput");
  passwordInput = document.getElementById("passwordInput");
  confirmPasswordInput = document.getElementById("confirmPasswordInput");
  confirmPasswordGroup = document.getElementById("confirmPasswordGroup");

  loginBtn = document.getElementById("loginBtn");
  registerBtn = document.getElementById("registerBtn");
  logoutBtn = document.getElementById("logoutBtn");
  addProductBtn = document.getElementById("addProductBtn");
  userStatus = document.getElementById("userStatus");

  // Events
  loginBtn.addEventListener("click", ()=>showAuthModal(false));
  registerBtn.addEventListener("click", ()=>showAuthModal(true));

  authSubmitBtn.addEventListener("click", ()=>{
    isRegisterMode ? handleRegister() : handleLogin();
  });

  authSwitchBtn.addEventListener("click", ()=>{
    showAuthModal(!isRegisterMode);
  });

  logoutBtn.addEventListener("click", logout);
});

