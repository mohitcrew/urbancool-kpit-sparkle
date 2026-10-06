import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { aiService } from '../../services/aiService';
import { useApp } from '../../context/AppContext';

export default function AIInsightsPage() {
  const { currentCity } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am **UrbanCool AI**, your urban climatology and heat mitigation decision assistant for **${currentCity?.name || 'Pune'}**.\n\nI can explain root causes of localized heat hotspots, simulate the impact of cooling interventions (cool roofs, urban tree canopies, green corridors), and optimize multi-objective municipal budgets.\n\nHow can I assist your climate planning today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const defaultPrompts = [
    'Why is Ward 17 high risk?',
    'What should we do with a ₹5 Cr budget?',
    'Compare Cool Roofs vs Green Roofs',
    'How does UrbanCool AI address water constraints during peak summer?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      const res = await aiService.ask(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.response,
        model: res.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const errorMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'I encountered an error accessing the urban thermal model. Please try again.',
        timestamp: 'Error'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const renderFormattedMarkdown = (text) => {
    // Basic Markdown formatting helper for bold, lists, and line breaks
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ color: '#ffffff', margin: '10px 0 4px', fontSize: '0.98rem' }}>{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} style={{ display: 'flex', gap: 6, margin: '3px 0', paddingLeft: 10 }}>
            <span style={{ color: 'var(--cyan-400)' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: line.replace(/^[-*] /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        );
      }
      if (line.startsWith('|')) {
        return <div key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{line}</div>;
      }
      return (
        <p
          key={idx}
          style={{ marginBottom: 6, lineHeight: 1.45 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      );
    });
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20, height: 'calc(100vh - 140px)' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <Bot size={16} color="var(--cyan-400)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              Conversational Thermal Intelligence
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', color: '#ffffff' }}>
            UrbanCool AI Assistant & Explainer
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(6, 182, 212, 0.12)',
              color: 'var(--cyan-400)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            Engine: Hybrid Physics-ML + LLM Reasoning
          </span>
        </div>
      </div>

      {/* Main Chat Interface Box */}
      <div
        className="card-glass"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-default)'
        }}
      >
        {/* Messages Scroll Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: 12,
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {m.sender === 'ai' && (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0
                  }}
                >
                  <Bot size={18} />
                </div>
              )}

              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-lg)',
                  background:
                    m.sender === 'user'
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.25) 100%)'
                      : 'rgba(15, 23, 42, 0.85)',
                  border:
                    m.sender === 'user'
                      ? '1px solid var(--border-active)'
                      : '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {renderFormattedMarkdown(m.text)}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 6,
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>{m.sender === 'ai' ? 'UrbanCool AI Reasoner' : 'Municipal Planner'}</span>
                  <span>{m.timestamp}</span>
                </div>
              </div>

              {m.sender === 'user' && (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0
                  }}
                >
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Bot size={18} />
              </div>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.82rem',
                  color: 'var(--cyan-400)'
                }}
              >
                <span className="pulse-dot" />
                Analyzing thermal satellite tensors and climatology parameters...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Recommendation Chips */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>
            <Lightbulb size={13} color="#fbbf24" /> Suggested:
          </div>
          {defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyan-400)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            padding: 16,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: 10,
            background: 'rgba(10, 15, 29, 0.95)'
          }}
        >
          <input
            type="text"
            placeholder="Ask anything (e.g. 'Why is Ward 17 high risk?', 'Optimize cooling under ₹5 Cr budget')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-secondary)',
              color: '#ffffff'
            }}
          />
          <Button
            variant="primary"
            icon={Send}
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
