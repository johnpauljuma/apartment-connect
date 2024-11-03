import { useState } from 'react';
import MessageList from './MessageList';
import MessageDetailView from './MessageDetailView';

const messagesData = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hello, I just wanted to ask about the apartment...',
    time: '2:30 PM',
    unread: true,
    profilePic: '/path/to/profile1.jpg', // Add actual path for profile pic
  },
  {
    id: 2,
    sender: 'Jane Smith',
    message: 'I’ve updated the listing as you requested.',
    time: '1:15 PM',
    unread: false,
    profilePic: '/path/to/profile2.jpg',
  },
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hello, I just wanted to ask about the apartment...',
    time: '2:30 PM',
    unread: true,
    profilePic: '/path/to/profile1.jpg', // Add actual path for profile pic
  },
  {
    id: 2,
    sender: 'Jane Smith',
    message: 'I’ve updated the listing as you requested.',
    time: '1:15 PM',
    unread: false,
    profilePic: '/path/to/profile2.jpg',
  },
  // Add more messages here
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null); // State to toggle between list and detail view

  const handleOpenMessage = (messageId) => {
    const message = messagesData.find(msg => msg.id === messageId);
    setSelectedMessage(message); // Open message detail view
  };

  return (
    <div>
      {!selectedMessage ? (
        <MessageList messagesData={messagesData} handleOpenMessage={handleOpenMessage} />
      ) : (
        <MessageDetailView message={selectedMessage} setSelectedMessage={setSelectedMessage} />
      )}
    </div>
  );
};

export default Messages;
