import React, {useState} from 'react';
import {useDispatch} from "react-redux";  
import {auth} from "./firebase";
import {login} from "./features/userSlice";
import "./Login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const dispatch = useDispatch();

	const loginToApp = async(e) => {
		e.preventDefault();
		try {
		  const userAuth = await auth.signInWithEmailAndPassword(email, password);
		  dispatch(
			login({
			  email: userAuth.user.email,
			  uid: userAuth.user.uid,
			  displayName: userAuth.user.displayName,
			  photoUrl: userAuth.user.photoURL,
			})
		  );
		} catch (error) {
		  alert(error);
		}
	  };

	const register = async() => {
		if (!name) {
		  return alert("Please enter a full name!");
		}
		try {
		  const userAuth = await auth.createUserWithEmailAndPassword(
			email,
			password
		  );
	
		  await userAuth.user.updateProfile({
			displayName: name,
			photoUrl: profilePic,
		  });
	
		  dispatch(
			login({
			  email: userAuth.user.email,
			  uid: userAuth.user.uid,
			  displayName: name,
			  photoUrl: profilePic,
			})
		  );
		} catch (error) {
		  console.log(error);
		  alert(error);
		}
	  };

	return (
		<div className="login">
			<img
				src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo.png"
				alt="linkedin_logo"
			/>

			<form>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full name(required if registering) "
					type="text" />

				<input
					value={profilePic}
					onChange={(e) => setProfilePic(e.target.value)}
					placeholder="Profile Pic URL (optional)" 
					type="text" />

				<input 
					value={email} 
					onChange={(e) => setEmail(e.target.value)} 
					placeholder="Email" 
					type="email" />

				<input 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password" 
					type="password" />

				<button type="submit" onClick={loginToApp}>
					 Sign In
				</button>
			</form>

			<p>
				Not a member? {" "}
				<span className="login__register" onClick={register}>
					Register Now
				</span>
			</p>
		</div>
	);  
}

export default Login;