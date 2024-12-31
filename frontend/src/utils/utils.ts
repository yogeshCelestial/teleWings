import { setErrorMsgType} from "../screens/SignUp.tsx";

export const signUpValidator = (data: FormData, setError: setErrorMsgType) => {
    let errorMsg = { type: '', message: '' };
    if(!data.get('username')) {
        errorMsg = {
            type: 'username',
            message: 'Username is required',
        }
    } else if (!data.get('email')) {
        errorMsg = {
            type: 'email',
            message: 'Email is required',
        }
    } else if (!data.get('password')) {
        errorMsg = {
            type: 'password',
            message: 'Password is required',
        }
    } else if (!data.get('confirmPassword')) {
        errorMsg = {
            type: 'confirmPassword',
            message: 'Confirm Password is required',
        }
    }
    if (errorMsg.type && errorMsg.message) {
        setError(errorMsg);
        return false;
    } else return true;
}

export const signInValidator = (data: FormData, setError: setErrorMsgType) => {
    let errorMsg = { type: '', message: '' };
    if (!data.get('email')) {
        errorMsg = {
            type: 'email',
            message: 'Email is required',
        }
    } else if (!data.get('password')) {
        errorMsg = {
            type: 'password',
            message: 'Password is required',
        }
    }
    if (errorMsg.type && errorMsg.message) {
        setError(errorMsg);
        return false;
    } else return true;
}
