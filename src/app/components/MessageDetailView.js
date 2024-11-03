import { Avatar, Input, Button } from 'antd';
import { EllipsisOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TextArea } = Input;

const MessageDetailView = ({ message, setSelectedMessage }) => {
  const [reply, setReply] = useState('');

  const handleBack = () => {
    setSelectedMessage(null); // Go back to message list
  };

  const handleMoreOptions = () => {
    console.log('More options for this message');
  };

  const handleSendReply = () => {
    if (reply.trim()) {
      console.log('Reply sent:', reply);
      setReply('');
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names[0]?.[0]?.toUpperCase() + names[1]?.[0]?.toUpperCase();
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header with Back Button, Profile, and Options */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowLeftOutlined onClick={handleBack} style={{ fontSize: '24px', cursor: 'pointer', marginRight: '15px' }} />
          <Avatar style={{ backgroundColor: '#f56a00' }}>{getInitials(message.sender)}</Avatar>
          <strong style={{ marginLeft: '15px', fontSize: '18px' }}>{message.sender}</strong>
        </div>
        <EllipsisOutlined onClick={handleMoreOptions} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </div>

      {/* Message Body */}
      <div style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '8px', marginBottom: '20px', width:'80%' }}>
        <p>{message.message}</p>
        <p><small>{message.time}</small></p>
      </div>

      {/* Reply Text Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width:'80%', float:'right'}}>
        <TextArea
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply here..."
        />
        <Button type="primary" onClick={handleSendReply} style={{width:'20%', float:'right'}}>
          Send 
        </Button>
      </div>
    </div>
  );
};

export default MessageDetailView;
