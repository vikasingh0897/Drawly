import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';

interface ChatProps {
  roomId: string;
}

interface Message {
  id: number;
  type: 'chat' | 'system';
  sender?: string;
  text: string;
  color?: string;
}

export default function Chat({ roomId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChat = (data: { sender: string; text: string }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: 'chat', sender: data.sender, text: data.text },
      ]);
    };

    const handleSystem = (data: { text: string; color: string }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), type: 'system', text: data.text, color: data.color },
      ]);
    };

    socket.on('chat_message', handleChat);
    socket.on('system_message', handleSystem);

    return () => {
      socket.off('chat_message', handleChat);
      socket.off('system_message', handleSystem);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('send_message', { roomId, text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col flex-1 lg:flex-none lg:h-[600px] w-full lg:w-[300px] border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)] bg-[var(--color-surface-container-low)] shadow-sm order-3 lg:order-3 min-h-0 overflow-hidden">
      {/* Message History Scroller Area */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5 text-left text-xs sm:text-sm bg-[var(--color-surface-container-lowest)] min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              color: msg.type === 'system' ? msg.color : 'var(--color-on-surface)',
              fontWeight: msg.type === 'system' ? 'bold' : 'normal',
            }}
            className="break-all leading-tight"
          >
            {msg.type === 'chat' && (
              <strong className="text-[var(--color-primary)]">{msg.sender}: </strong>
            )}
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Box Pinned Constantly to Bottom boundary */}
      <form
        onSubmit={sendMessage}
        className="flex border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Guess the word..."
          className="flex-1 p-2.5 bg-transparent text-[var(--color-on-surface)] outline-none text-xs sm:text-sm placeholder:text-[var(--color-on-surface-variant)]"
        />
        <button
          type="submit"
          className="px-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}
