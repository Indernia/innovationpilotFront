import { type FormEvent, useState } from 'react';

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
      text: "👋 Hi! Ask me anything about water towers in Sierra Leone - I'll use our WhatsApp integration to help.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastSteps, setLastSteps] = useState<string[] | null>(null);
  const [isStepsOpen, setIsStepsOpen] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: messageIdCounter++,
      from: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const result = await sendWaterTowerQuestion(trimmed);

      const helperMessage: ChatMessage = {
        id: messageIdCounter++,
        from: 'helper',
        text: result.reply,
      };

      setMessages((prev) => [...prev, helperMessage]);
      setLastSteps(result.steps ?? []); // only tool steps from API
      setIsStepsOpen(true);             // open accordion on new answer
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
          {/* ---------- TOOL STEPS ACCORDION ABOVE CHAT ---------- */}
          {lastSteps && lastSteps.length > 0 && (
            <div
              style={{
                marginBottom: '1rem',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                background: 'rgba(255,255,255,0.85)',
              }}
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => setIsStepsOpen((prev) => !prev)}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                <span>AI tool steps</span>
                <span>{isStepsOpen ? '▴' : '▾'}</span>
              </button>

              {/* Body */}
              {isStepsOpen && (
                <div
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    padding: '0.7rem 1rem',
                  }}
                >
                  <ol style={{ margin: 0, paddingLeft: '1.1rem' }}>
                    {lastSteps.map((step, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem' }}>
                        <pre
                          style={{
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit',
                            fontSize: '0.82rem',
                          }}
                        >
                          {step}
                        </pre>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* ---------- CHAT BUBBLES BELOW THE ACCORDION ---------- */}
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
