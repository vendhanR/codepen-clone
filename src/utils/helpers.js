import { GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCred => {
        window.location.reload();
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider).then(userCred => {
        window.location.reload()
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
    })
}

export { signInWithGoogle, signInWithGithub };