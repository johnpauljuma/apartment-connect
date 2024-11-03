import { Avatar, Input, Dropdown, Menu, Badge } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const MessageList = ({ messagesData, handleOpenMessage }) => {
  const messageMenu = (messageId) => (
    <Menu>
      <Menu.Item key="1">Reply</Menu.Item>
      <Menu.Item key="2">Mark as Unread</Menu.Item>
      <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
  );

  const getInitials = (name) => {
    const names = name.split(' ');
    return names[0]?.[0]?.toUpperCase() + names[1]?.[0]?.toUpperCase();
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Message Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Messages</h2>
        <div>
          <span>Total Messages: {messagesData.length}</span> &nbsp; | &nbsp;
          <span>Unread: {messagesData.filter(msg => msg.unread).length}</span>
        </div>
        <Input.Search placeholder="Search messages..." style={{ width: '300px' }} />
      </div>

      {/* Message List */}
      {messagesData.map((message) => (
        <div
          key={message.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
            backgroundColor: message.unread ? '#f9f9f9' : '#fff',
            borderRadius: '8px',
            marginBottom: '10px'
          }}
          onClick={() => handleOpenMessage(message.id)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Badge dot={message.unread}>
              <Avatar style={{ backgroundColor: '#f56a00' }}>{getInitials(message.sender)}</Avatar>
            </Badge>
            <div style={{ marginLeft: '15px' }}>
              <strong style={{ fontSize: '16px' }}>{message.sender}</strong>
              <p style={{ margin: '0', color: '#999' }}>{message.message.slice(0, 30)}...</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0', color: '#999' }}>{message.time}</p>
            <Dropdown overlay={messageMenu(message.id)} trigger={['click']} placement="bottomRight">
              <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()} />
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
