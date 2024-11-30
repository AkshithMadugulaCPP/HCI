class ChatWidget {
    constructor() {
        this.initialized = false;
        this.messages = [];
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        // Create and inject chat icon
        const chatIcon = document.createElement('div');
        chatIcon.id = 'chatIcon';
        chatIcon.innerHTML = `<img src="assets/chat-icon.png" alt="Chat Icon">`;

        // Create chat window container
        const chatWindowContainer = document.createElement('div');
        chatWindowContainer.id = 'chatWindowContainer';
        chatWindowContainer.className = 'hidden';
        chatWindowContainer.innerHTML = `
            <div id="chatContent" class="w-full bg-white rounded-lg shadow-md border border-gray-200">
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                    <button id="closeChatButton" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                    <span class="font-medium text-gray-900">CHAT</span>
                    <button id="closeHeaderButton" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M15 10a.75.75 0 01-.75.75H5.56l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 111.06 1.06L5.56 9.25h8.69A.75.75 0 0115 10z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <!-- Chat Section -->
                <div id="chatMessages" class="p-4 space-y-4 flex flex-col overflow-y-auto">
                    <!-- Example Assistant Message -->
                    <div class="text-gray-600">
                        <span class="block text-center text-sm text-gray-500">Today</span>
                        <div class="bg-gray-100 p-3 rounded-md shadow-sm text-sm text-gray-800 relative">
                            <p>Hello, I'm the Virtual Assistant with generative AI from Zara. How can I help you?</p>
                            <span class="absolute bottom-1 right-2 text-xs text-gray-400">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <!-- Info Section -->
                    <div class="text-center text-sm text-gray-300">
                        If you want to learn more about the interaction with a generative AI, please <a href="#" class="text-gray-300 hover:underline">click here</a>.<br>
                        <br>
                        Have you asked for help with <strong class="text-gray-200">Product</strong><br>
                        <br>
                        <br>
                        By joining the Zara chat, you accept our <a href="#" class="text-gray-300 hover:underline">privacy policy</a>.
                    </div>
                </div>
                <!-- Input Section -->
                <div class="border-t border-gray-200 p-3 flex items-center bg-white">
                    <button id="attachButton" class="text-gray-500 hover:text-gray-700 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                    </button>
                    <input type="text" id="messageInput" class="w-full text-sm bg-gray-100 text-gray-800 rounded-lg p-2" placeholder="Type a message...">
                    <button id="sendMessageButton" class="text-gray-600 hover:text-gray-800 ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Modal -->
            <div id="closeModal" class="bg-white">
                <div class="modal-content">
                    <p class="font-medium text-lg">ARE YOU SURE YOU WANT TO CLOSE THE CHAT?</p>
                    <p class="text-sm text-gray-600 mt-1">You will lose this conversation.</p>
                    <div class="buttons">
                        <button id="cancelButton">NO</button>
                        <button id="confirmCloseButton">YES</button>
                    </div>
                </div>
            </div>
        `;

        // Append elements to body
        document.body.appendChild(chatIcon);
        document.body.appendChild(chatWindowContainer);

        // Initialize event listeners
        this.initializeEventListeners();
    }

    clearChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        // Keep only the first message (welcome message)
        while (chatMessages.children.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
        this.messages = [];
    }

    initializeEventListeners() {
        const chatIcon = document.getElementById('chatIcon');
        const chatWindowContainer = document.getElementById('chatWindowContainer');
        const closeChatButton = document.getElementById('closeChatButton');
        const closeHeaderButton = document.getElementById('closeHeaderButton');
        const closeModal = document.getElementById('closeModal');
        const cancelButton = document.getElementById('cancelButton');
        const confirmCloseButton = document.getElementById('confirmCloseButton');
        const chatContent = document.getElementById('chatContent');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendMessageButton = document.getElementById('sendMessageButton');

        // Open chat window
        chatIcon.addEventListener('click', () => {
            chatWindowContainer.classList.remove('hidden');
            chatIcon.style.display = 'none';
        });

        // Close chat modal
        closeChatButton.addEventListener('click', () => {
            closeModal.style.display = 'flex';
        });

        // Cancel modal action
        cancelButton.addEventListener('click', () => {
            closeModal.style.display = 'none';
        });

        // Confirm close
        confirmCloseButton.addEventListener('click', () => {
            closeModal.style.display = 'none';
            chatWindowContainer.classList.add('hidden');
            chatIcon.style.display = 'flex';
            this.clearChatHistory();
        });

        // Close chat window
        closeHeaderButton.addEventListener('click', () => {
            chatWindowContainer.classList.add('hidden');
            chatIcon.style.display = 'flex';
        });

        // Send message
        const sendMessage = () => {
            const messageText = messageInput.value.trim();
            if (messageText === '') return;

            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const messageElement = document.createElement('div');
            messageElement.classList.add('user-message');
            messageElement.innerHTML = `
                <div class="user-message-text">
                    ${messageText}
                    <span class="block text-right text-xs text-gray-400 mt-1">${currentTime}</span>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            this.messages.push(messageText);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        sendMessageButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Initialize chat widget
window.chatWidget = new ChatWidget();

export default ChatWidget;