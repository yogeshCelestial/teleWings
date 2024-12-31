import db from "../db/index.js";

const sendMessageController = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user.id;
        const { message } = req.body;

        // Get Chat-Room
        let rooms = await getRoom(senderId, receiverId);
        if (!rooms.length) {
            // Create Chat room when not exist
            await createRoom(senderId, receiverId);
            rooms = await getRoom(senderId, receiverId);
        }
        // insert a new message in the chats table
        const messageInsertQuery = `INSERT INTO chats (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING id`;
        const result = await db.query(messageInsertQuery, [senderId, receiverId, message]);
        if (result.rows?.[0]?.id) {
            // Insert the Sent message id to chat-room
            const msgId = await addMessageToRoom(rooms?.[0].id, result.rows?.[0]?.id);
            if (msgId) {
                res.status(200).json({ message: "Message sent" });
            }
        }
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}
// Function to find room, if both users already had a conversation
const getRoom = async (senderId, receiverId) => {
    const getRoomQuery = `SELECT * FROM rooms WHERE 
                            user_one IN ($1, $2) AND user_two IN ($1, $2);`;
    const room = await db.query(getRoomQuery, [senderId, receiverId]);
    return room.rows;
}

// Function to create a chat-room if both users haven't a conversation till now
const createRoom = async (senderId, receiverId) => {
    const insertInRoomQuery = `INSERT INTO rooms (user_one, user_two) VALUES ($1, $2) RETURNING id;`;
    await db.query(insertInRoomQuery, [senderId, receiverId]);
}

// Add new message id to chat-room of both participants
const addMessageToRoom = async (roomId, message) => {
    const addMessageQuery = `UPDATE rooms SET messages = array_append(messages, $1) WHERE id = $2 RETURNING id`;
    const result = await db.query(addMessageQuery, [message, roomId]);
    return result.rows?.[0].id || "";
}

export { sendMessageController };