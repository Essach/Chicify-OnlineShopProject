import { signOut } from 'firebase/auth';

export let auth;

export const setAuth = (newAuth) => {
    auth = newAuth;
}

export const logoutAuth = async () => {
    if (auth !== undefined) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error)
        }
    }
}