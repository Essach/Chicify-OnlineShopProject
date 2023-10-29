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
            recipientId: "1",
            messages: [
                {
                    type: 'received',
                    content: 'Welcome to Chicify. Feel free to look around'
                },
            ]
        },{
            recipientId: "2",
            messages: [
                {
                    type: 'received',
                    content: 'Siema'
                },
                {
                    type: 'sent',
                    content: 'No elo'
                },
            ]
        },{
            recipientId: "3",
            messages: [
                {
                    type: 'sent',
                    content: 'halo'
                },
                {
                    type: 'received',
                    content: 'Estonia jest republiką parlamentarną. Szefem rządu jest premier, którego powołuje prezydent i zatwierdza parlament. Głównym organem wykonawczym polityki państwa jest rząd. Głową państwa jest prezydent wybierany przez parlament lub kolegium wyborcze na okres pięciu lat. W parlamencie zasiada 101 posłów wybieranych na czteroletnią kadencję. Estonia dzieli się na 15 prowincji i 79 gmin.'
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
        // console.log(content)
        const conversation = this.conversations.find(conversation => conversation.recipientId === recipientId);
        if (conversation === undefined) {
            this.conversations.push({
                recipientId: recipientId,
                messages: [
                    {
                        type: 'sent',
                        content: content
                    }
                ]
            })
        } else {
            conversation.messages.push({
                type: 'sent',
                content: content
            });
            const i = this.conversations.indexOf(conversation);
            this.conversations.splice(i, 1);
            this.conversations.push(conversation);
        }
        // console.log(this.conversations)
    }

    receiveMessage(senderId, content) {
        const conversation = this.conversations.find(conversation => conversation.recipientId === senderId);
        if (conversation === undefined) {
            this.conversations.push({
                recipientId: senderId,
                messages: [
                    {
                        type: 'received',
                        content: content
                    }
                ]
            })
        } else {
            conversation.messages.push({
                type: 'received',
                content: content
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