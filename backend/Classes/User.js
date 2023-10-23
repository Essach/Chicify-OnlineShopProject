const { v4: uuidv4 } = require('uuid');
class User {
    constructor(accessLevel, username = '', phoneNumber = '', emailAddress = '', password, orders, favorites) {
        this.accessLevel = accessLevel;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.password = password;
        this.orders = orders;
        this.favorites = favorites;
        this.conversations = [{
            recipientId: 1,
            messages: [
                {
                    type: 'sent',
                    content: 'lalala'
                },
                {
                    type: 'received',
                    content: 'what'
                },
            ]
        }
        ];
        this.userId = uuidv4();
    }

    becomeSeller() {
        this.accessLevel = 2;
    }

    changePassword(newPassword) {
        this.password = newPassword;
    }

    sendMessage(recipientId, content) {
        const conversation = this.conversations.find(conversation => conversation.recipientId === recipientId);
        if (conversation === undefined) {
            this.conversations.push({
                recipientId: recipientId,
                messages: [
                    {
                        type: 'sent',
                        content: toString(content)
                    }
                ]
            })
        } else {
            conversation.messages.push({
                type: 'sent',
                content: toString(content)
            });
            const i = this.conversations.indexOf(conversation);
            this.conversations.splice(i, 1);
            this.conversations.push(conversation);
        }
    }

    receiveMessage(senderId, content) {
        const conversation = this.conversations.find(conversation => conversation.recipientId === senderId);
        if (conversation === undefined) {
            this.conversations.push({
                recipientId: senderId,
                messages: [
                    {
                        type: 'received',
                        content: toString(content)
                    }
                ]
            })
        } else {
            conversation.messages.push({
                type: 'received',
                content: toString(content)
            });
            const i = this.conversations.indexOf(conversation);
            this.conversations.splice(i, 1);
            this.conversations.push(conversation);
        }
    }

}

module.exports = User

// conversations = [
//     {
//         recipientId: 123123,
//         messages: [
//             {
//                 type: 'sent',
//                 content: 'lalala'
//             },
//             {
//                 type: 'received',
//                 content: 'what'
//             },
//         ]
//     }
// ]