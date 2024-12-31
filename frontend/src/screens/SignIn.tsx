import { Card, Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {FormEvent, useState} from "react";
import { signInValidator } from "../utils/utils.ts";
import { NavLink } from "react-router";
import httpHelper from '../utils/httpHelper.ts';

const useStyles = makeStyles(() => ({
    formStyles: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    }
}));

type ErrorMsgType = {
    type: string,
    message: string,
}
export type setErrorMsgType = (msg: ErrorMsgType) => void;

const initialError = { type: '', message: '' };

const SingIn = () => {
    const classes = useStyles();
    const [error, setError] = useState<ErrorMsgType>(initialError);
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(initialError);
        const data = new FormData(e.currentTarget);
        const validationStatus = signInValidator(data, setError);
        if (validationStatus) {
            const email= data.get('email') || '';
            const password = data.get('password') || '';
            const httpObj = {
                email,
                password,
            }
            const loggedInUser = await httpHelper({
                body: httpObj,
                endpoint: '/auth/login',
                method: 'POST',
            });
            return loggedInUser;
        }
    }
    return (
        <Box>
            <Card>
                <Box
                    component="form"
                    onSubmit={submitHandler}
                    className={classes.formStyles}
                >
                    <TextField
                        type="text"
                        name="email"
                        label="Email"
                        variant="outlined"
                        helperText={error.type === 'email' ? error.message : ''}
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                        helperText={error.type === 'password' ? error.message : ''}
                    />
                    <Button type="submit" variant="contained" color="primary">SignIn</Button>
                </Box>
            </Card>
            <NavLink to='/signup' >SignUp</NavLink>
        </Box>
    )
}

export default SingIn;