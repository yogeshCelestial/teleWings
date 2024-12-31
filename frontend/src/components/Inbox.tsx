import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ChatUserID } from "../screens/Home";
import { useState } from "react";
import httpHelper from "../utils/httpHelper";

interface InboxProps {
    loggedInUser: string,
    open: ChatUserID
}

type Msg = string;

const Inbox = (props: InboxProps) => {
    const { open } = props;
    const [message, setMessage] = useState<Msg>('');

    const sendMessage = async () => {
        console.log(message);
        const httpObj = {
            body: {
                message: message,
            },
            endpoint: `/message/send/${open}`,
            method: 'POST'
        }
        const result = await httpHelper(httpObj);
        console.log(result);
        setMessage('');
    };

    return (
        <Box>
            <Box>
                {open}
            </Box>
            <Box>
                <TextField id="standard-basic" label="type a message" variant="standard" value={message} onChange={(e) => setMessage(e.target.value)} />
                <IconButton aria-label="send" onClick={sendMessage}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Inbox;