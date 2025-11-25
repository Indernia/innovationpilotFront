import flag from '../assets/Innovationpilotflag.jpg';

function ChatPage() {
  return (
    <div>
      <h1>Chat</h1>
      <p>This is the chat page with your image:</p>

      <img
        src={flag}
        alt="Flag"
        style={{
          width: '250px',
          borderRadius: '10px',
          marginTop: '1rem',
          border: '1px solid #ddd',
        }}
      />
    </div>
  );
}

export default ChatPage;
