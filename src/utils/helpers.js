import { GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCred => {
        window.location.reload();
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

export const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider).then(userCred => {
        window.location.reload()
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
    })
}

export const signOutAction = async () => {
    await auth.signOut().then(()=>{
        window.location.reload();
    })
}

export const Menus= [
    {id:uuidv4(),name : 'Projects', uri:'/home/projects'},
    {id:uuidv4(),name : 'Collections', uri:'/home/collections'},
    {id:uuidv4(),name : 'Profile', uri:'/home/profile'}
]
