import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider).then(userCred => {
        window.location.reload();
    }).catch(error => {
        console.log("signInWithGoogle --> ", error.message)
    })
}

export const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider).then(userCred => {
        window.location.reload();
    }).catch(error => {
        console.log("signInWithGithub --> ",error.message)
    })
}

export const signOutAction = async () => {
    // <Spinner/>
    await auth.signOut().then(()=>{
        window.location.reload();
        
    }).catch(err => console.log(err.message))
}

export const Menus= [
    {id:uuidv4(),name : 'saved', uri:'/home/saved   '},
]
