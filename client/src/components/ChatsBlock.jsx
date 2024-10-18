import React, { useState } from 'react';

const ChatsBlock = () => {
  // Predefined messages list for demonstration
  const initialMessages = [
    {
      text: 'Hello! How are you?',
      sender: 'Friend',
      time: '10:00 AM',
    },
    {
      text: 'I am good! How about you?',
      sender: 'You',
      time: '10:01 AM',
    },
    {
      text: 'What are you up to today?',
      sender: 'Friend',
      time: '10:02 AM',
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');

  // Handle message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen  border rounded-lg shadow-lg">
      <div className="bg-blue-500 text-white text-center p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg ${
              msg.sender === 'You' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300'
            } max-w-xs`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-gray-500 text-right">{msg.time}</p>
          </div>
        ))}
      </div>
      <form className="flex p-4 bg-white border-t" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatsBlock;
