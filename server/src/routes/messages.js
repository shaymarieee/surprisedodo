const mongoose = require('mongoose');

// Message schema
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    dateSent: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

// Message model
const Message = mongoose.model('Message', messageSchema);

// Send a message
async function sendMessage(senderId, recipientId, content) {
    const message = new Message({ sender: senderId, recipient: recipientId, content });
    await message.save();
    return message;
}

// Get messages between two users
async function getMessages(userId1, userId2) {
    return await Message.find({
        $or: [
            { sender: userId1, recipient: userId2 },
            { sender: userId2, recipient: userId1 }
        ]
    }).sort({ dateSent: 1 });
}

module.exports = {
    sendMessage,
    getMessages,
    Message
};