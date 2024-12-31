import { Box, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { ChatData, ChatUserID } from "../screens/Home";
import httpHelper from "../utils/httpHelper";
import { useEffect, useState } from "react";

const getRooms = async () => {
    const httpObj = {
        endpoint: '/chat/rooms',
        method: 'GET',
    }
    const result = await httpHelper(httpObj)
    return result;
}

const getUsernameWithId = async (id: string) => {
    const httpObj = {
        endpoint: `/user/info/${id}`,
        method: 'GET',
    }
    const result = await httpHelper(httpObj)
    return result;
}

interface ChatsProps {
    loggedInUser: string,
    chats: ChatData[],
    setChats: (chats: ChatData[]) => void,
    setOpen: (user: ChatUserID) => void
}

interface userWithIdAndName {
    id: string,
    username: string,
}

const ChatsAndSearch = (props: ChatsProps) => {
    const { loggedInUser, chats, setChats, setOpen } = props;
    const [chatNames, setChatNames] = useState<userWithIdAndName[]>();

    useEffect(() => {
        async function fetchData() {
            const result = await getRooms();
            if (result.data) {
                setChats(result.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (chats.length) {
            const chatUsersArr: object[] = [];
            console.log(chats);
            chats.forEach(async (c) => {
                const receiver = loggedInUser === `${c.user_one}` ? `${c.user_two}` : `${c.user_one}`;
                const userInfo = await getUsernameWithId(receiver);
                console.log(userInfo);
                chatUsersArr.push({
                    id: receiver,
                    username: userInfo.username,
                });
            });
            setChatNames(chatUsersArr);
        }
    }, [chats]);

    // useEffect(() => {
    //     if (chats.length) {
    //         const receiver = loggedInUser === `${chats[0].user_one}` ? `${chats[0].user_two}` : `${chats[0].user_one}`;
    //         setOpen(receiver);
    //     }
    // }, [chats]);

    const chatClickHandler = (receiver: string) => {
        setOpen(receiver);
    }
    console.log(chatNames);

    return (
        <Box>
            <Box>
                <TextField id="standard-basic" label="type username" variant="standard" />
            </Box>
            <Box>
                <List>
                    {chatNames?.map((c) => (
                        <ListItem disablePadding key={c.id}>
                            <ListItemButton onClick={() => chatClickHandler(c.id)}>
                                <ListItemText primary={c.username} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default ChatsAndSearch;