import sendMessage from '../../../icons/sendMessage.svg';

const NewMessage = () => {
    return (
        <new-message-section>
            <textarea placeholder='Type your message...' />
            <send-message-btn>
                <img src={sendMessage} alt='send message'/>
            </send-message-btn>
        </new-message-section>
    );
}

export default NewMessage;