document.addEventListener('DOMContentLoaded', async () => {
    try {
        const initialResponse = await axios.get('/getInitialResponse');
        const initialData = await initialResponse.data;

        const conversationContainer = document.getElementById('conversation');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'dr_container';
        const inialMessage = document.createElement('div');
        inialMessage.className = 'dr_message';
        inialMessage.appendChild(document.createTextNode(initialData.response));
        messageContainer.appendChild(inialMessage);
        conversationContainer.appendChild(messageContainer);
    } catch (error) {
        console.error('Error fetching initial response:', error);
    }
});

const sendMessage = async () => {
    try {
        const userMessage = document.getElementById('message').value;

        const conversationContainer = document.getElementById('conversation');

        const userContainer = document.createElement('div');
        userContainer.className = 'us_container';
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'us_message';
        userMessageDiv.appendChild(document.createTextNode(userMessage));
        userContainer.appendChild(userMessageDiv);
        conversationContainer.appendChild(userContainer);
        
        const response = await axios.post('/sendMessage', { message: userMessage });
        const responseData = await response.data;

        const assistantContainer = document.createElement('div');
        assistantContainer.className = 'dr_container';
        const assistantMessageDiv = document.createElement('div');
        assistantMessageDiv.className = 'dr_message';
        assistantMessageDiv.appendChild(document.createTextNode(responseData.response));
        assistantContainer.appendChild(assistantMessageDiv);
        conversationContainer.appendChild(assistantContainer);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

document.getElementById('send_btn').addEventListener('click', () => {sendMessage();});