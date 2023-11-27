

class BotUser {
    constructor(id, username = '', phoneNumber = '', emailAddress = '') {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
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
        this.userId = id;
        this.orders = [];
    }

    sendMessage(recipientId, content) {
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
    }

}

module.exports = BotUser