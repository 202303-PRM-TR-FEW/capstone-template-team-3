"use client"

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../lib/features/userSlice';
import {
    auth, onAuthStateChanged, createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from '../firebase/firebase'
import Button from '../components/Button/Button';
import NavLink from '../components/NavLink/NavLink';

function SignIn() {
    const user = useSelector(selectUser);
    // use state constants for the the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                // user is logged in, send the user's details to redux, store the current user in the state
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,

                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, []);

    const loginToApp = (e) => {
        e.preventDefault();

        // Sign in an existing user with Firebase
        signInWithEmailAndPassword(auth, email, password)
            // returns  an auth object after a successful authentication
            // userAuth.user contains all our user details
            .then((userAuth) => {
                // store the user's information in the redux state
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,

                    })
                );
            })
            // display the error if any
            .catch((err) => {
                alert(err);
            });

    };

    // A quick check on the name field to make it mandatory
    // const register = () => {
    //     // if (!name) {
    //     //     return alert('Please enter a full name');
    //     // }

    //     // Create a new user with Firebase
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userAuth) => {
    //             // Update the newly created user with a display name and a picture
    //             updateProfile(userAuth.user, {
    //                 // displayName: name,

    //             })
    //                 .then(
    //                     // Dispatch the user information for persistence in the redux state
    //                     dispatch(
    //                         login({
    //                             email: userAuth.user.email,
    //                             uid: userAuth.user.uid,
    //                             displayName: name,

    //                         })
    //                     )
    //                 )
    //                 .catch((error) => {
    //                     console.log('user not updated');
    //                 });
    //         })
    //         .catch((err) => {
    //             alert(err);
    //         });
    // };

    return (
        <div className='flex justify-center mt-20'>
            {!user ? (<div className='login'>
                <form className='flex flex-col'>
                    {/* <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full name (required for registering)'
                        type='text'
                    /> */}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        type='email'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        type='password'
                        className='mt-2'
                    />
                    <Button type='submit' style="navbar-button mt-5" clickAction={loginToApp}>
                        Sign In
                    </Button>
                </form>
                <p className='pt-5 pb-1 text-center'>
                    Not a member?{' '}
                </p>
                <NavLink to="#" name={"Sign Up"} style="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-5 py-2 text-center flex items-center justify-center h-11" />
            </div>) : (<div>
                <p className='text-center'>Signed in succesfully</p>
                <Button type='button' style="navbar-button mt-5 mx-auto" clickAction={logout}>
                    Sign Out
                </Button>
            </div>)}
        </div>
    );
}

export default SignIn;
