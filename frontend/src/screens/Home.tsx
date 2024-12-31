import { useState } from "react";
import ChatsAndSearch from "../components/ChatsAndSearch.tsx";
import Inbox from "../components/Inbox.tsx";
import { Box } from "@mui/material";

export type ChatUserID = string;

export interface ChatData {
    [key: string]: string | string[];
}

const Home = () => {
    const [chats, setChats] = useState<ChatData[]>([]);
    const [openInChat, setOpenInChat] = useState<ChatUserID>('');

    const userInfo = localStorage.getItem('userInfo') || '';
    const { id = '' } = JSON.parse(userInfo);

    return (
        <Box sx={{ width: '100%', display: 'flex' }}>
            <Box sx={{ flex: '2' }}>
                <ChatsAndSearch loggedInUser={id} chats={chats} setChats={setChats} setOpen={setOpenInChat} />
            </Box>
            <Box sx={{ flex: '3' }}>
                <Inbox loggedInUser={id} open={openInChat} />
            </Box>
        </Box>

    )
}

export default Home;