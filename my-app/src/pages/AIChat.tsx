import {type FormEvent, useState } from 'react';

import flag from '../assets/Innovationpilotflag.jpg';
import { sendWaterTowerQuestion } from '../api/Api';

type Sender = 'user' | 'helper';

interface ChatMessage {
  id: number;
  from: Sender;
  text: string;
}

let messageIdCounter = 1;

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: messageIdCounter++,
      from: 'helper',
      text: '👋 Hi! Ask me anything about water towers in Sierra Leone – I’ll use our WhatsApp integration to help.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: messageIdCounter++,
      from: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // 🔗 Call your backend API (which talks to WhatsApp)
      const result = await sendWaterTowerQuestion(trimmed);

      const helperMessage: ChatMessage = {
        id: messageIdCounter++,
        from: 'helper',
        text: result.reply,
      };

      setMessages((prev) => [...prev, helperMessage]);
    } catch (err) {
      console.error(err);
      setError(
        'Could not reach the water tower helper right now. Please try again in a moment. 💧'
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <h2 className="page-title">Water tower helper 💧</h2>
      <p className="page-subtitle">
        Ask a question and we’ll reach out through WhatsApp to get info from the
        field in Sierra Leone.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="chat-bubbles">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  'chat-bubble ' +
                  (m.from === 'user' ? 'chat-bubble-you' : 'chat-bubble-them')
                }
              >
                {m.text}
              </div>
            ))}

            {isSending && (
              <div className="chat-bubble chat-bubble-them">
                🌍 Checking with the team in Sierra Leone…
              </div>
            )}
          </div>
        </div>

        <div style={{ flexShrink: 0 }}>
          <img
            src={flag}
            alt="Flag"
            style={{
              width: '180px',
              borderRadius: '18px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            alignItems: 'center',
            marginBottom: '0.4rem',
          }}
        >
          <input
            type="text"
            placeholder="e.g. Which tower has the lowest water level today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: '999px',
              border: '1px solid rgba(0,0,0,0.12)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isSending}
            style={{
              borderRadius: '999px',
              padding: '0.6rem 1.1rem',
              border: 'none',
              cursor: isSending ? 'default' : 'pointer',
              background: isSending ? '#ccc' : '#ff7aa2',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            {isSending ? 'Sending…' : 'Send'}
          </button>
        </div>
        {error && (
          <div style={{ fontSize: '0.85rem', color: '#c0392b' }}>{error}</div>
        )}
        {!error && (
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Please do not send real personal data – this is a school project
            demo. 🌱
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatPage;
