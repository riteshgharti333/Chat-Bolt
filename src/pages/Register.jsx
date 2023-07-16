import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      // const date = new Date().getTime();
      
      // const timestamp = new Date().getTime();

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db , "userChats" , user.uid) , {});
          navigate("/")
          }).catch((error) => {
            setErr(true);
            console.log(error)
          })
        }
      );
    } catch (error) {
      setErr(true);
      console.log(error)
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ROYAL CHAT</span>
        <span className="logo">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img
              src="https://cdn-icons-png.flaticon.com/512/262/262038.png"
              alt=""
            />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form> 
        <p>You do have an account? <Link to="/login">
        Login
        </Link> </p>
      </div>
    </div>
  );
};

export default Register;
