import { Card, Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {FormEvent, useState} from "react";
import { signUpValidator } from "../utils/utils.ts";
import {NavLink} from "react-router";

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

const SignUp = () => {
    const classes = useStyles();
    const [error, setError] = useState<ErrorMsgType>(initialError);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(initialError);
        const data = new FormData(e.currentTarget);
        const validationStatus = signUpValidator(data, setError);
        if (validationStatus) {
            console.log('Submit this Form');
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
                        name="username"
                        label="Username"
                        variant="outlined"
                        helperText={error.type === 'username' ? error.message : ''}
                    />
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
                    <TextField
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        helperText={error.type === 'confirmPassword' ? error.message : ''}
                    />
                    <Button type="submit" variant="contained" color="primary">SignUp</Button>
                </Box>
            </Card>
            <NavLink to='/' >SignIn</NavLink>
        </Box>
    )
}

export default SignUp;