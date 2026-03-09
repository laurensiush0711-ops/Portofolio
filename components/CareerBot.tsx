import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { getCareerAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { CV_DATA, STORAGE_KEYS, CHAT_CONFIG } from '../constants';

// ==========================================
// CareerBot - IMPROVED VERSION
// Features:
// - localStorage persistence
// - Message cooldown/debounce
// - Escape key to close
// - Better accessibility (ARIA labels)
// - Auto-resizing textarea
// - Improved error handling
// ==========================================

const CareerBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Check if last access was within 24 hours
          const lastAccess = localStorage.getItem(STORAGE_KEYS.CHAT_LAST_ACCESS);
          const isRecent = lastAccess && (Date.now() - parseInt(lastAccess)) < 24 * 60 * 60 * 1000;
          
          if (isRecent && Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse chat history:', e);
        }
      }
    }
    // Default welcome message
    return [{
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `Hi! I'm ${CV_DATA.name.split(' ')[0]}'s AI Career Bot. Ask me how I translate QA precision into Data Analytics!`,
      timestamp: Date.now(),
    }];
  });
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      // Limit stored messages
      const toStore = messages.slice(-CHAT_CONFIG.MAX_MESSAGES_IN_STORAGE);
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(toStore));
      localStorage.setItem(STORAGE_KEYS.CHAT_LAST_ACCESS, Date.now().toString());
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Calculate cooldown remaining
  const cooldownRemaining = useMemo(() => {
    const elapsed = Date.now() - lastMessageTime;
    return Math.max(0, CHAT_CONFIG.MESSAGE_COOLDOWN_MS - elapsed);
  }, [lastMessageTime]);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      setCooldownActive(true);
      const timer = setTimeout(() => {
        setCooldownActive(false);
      }, cooldownRemaining);
      return () => clearTimeout(timer);
    } else {
      setCooldownActive(false);
    }
  }, [cooldownRemaining]);

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();
    
    // Validation checks
    if (!trimmedInput || loading || cooldownActive) return;
    
    if (trimmedInput.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Message too long. Please keep it under ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters.`,
        timestamp: Date.now(),
      }]);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: Date.now(),
    };

    // Clear input and add user message
    setInput('');
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setLastMessageTime(Date.now());

    try {
      const aiResponse = await getCareerAdvice(trimmedInput);
      
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      }]);
    } catch (err) {
      console.error('CareerBot error:', err);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "😕 Something went wrong. Please try again in a moment.",
        timestamp: Date.now(),
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, cooldownActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `Hi! I'm ${CV_DATA.name.split(' ')[0]}'s AI Career Bot. Ask me how I translate QA precision into Data Analytics!`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMsg]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 flex flex-col h-[70vh] md:h-[450px] w-[90vw] max-w-[350px] bg-[#112240] border border-[#233554] rounded-lg shadow-2xl overflow-hidden reveal"
          role="dialog"
          aria-label="Career Assistant Chat"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-[#112240] border-b border-[#233554] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#64ffda]/20 flex items-center justify-center text-[#64ffda]" aria-hidden="true">
                <i className="fas fa-terminal text-sm"></i>
              </div>
              <div>
                <span className="text-sm font-semibold text-[#ccd6f6] mono block">Career.AI</span>
                <span className="text-[10px] text-[#8892b0]">Powered by Gemini</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Clear chat button */}
              <button 
                onClick={clearChat}
                className="text-[#8892b0] hover:text-[#64ffda] p-2"
                aria-label="Clear chat history"
                title="Clear chat"
              >
                <i className="fas fa-trash-alt text-xs"></i>
              </button>
              {/* Close button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-[#8892b0] hover:text-[#64ffda] p-2"
                aria-label="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a192f]"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[90%] p-3 rounded-md text-[13px] leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/30' 
                      : 'bg-[#233554] text-[#ccd6f6]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#233554] p-3 rounded-md animate-pulse text-[#8892b0] text-[13px] mono">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-circle-notch fa-spin text-xs"></i>
                    analyzing query...
                  </span>
                </div>
              </div>
            )}
            
            {/* Invisible anchor for scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-[#233554] bg-[#112240]">
            <div className="flex gap-2 items-end">
              <textarea 
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={cooldownActive ? "Please wait..." : "Ask about my pivot..."}
                disabled={loading || cooldownActive}
                rows={1}
                className="flex-1 bg-[#0a192f] border border-[#233554] rounded px-3 py-2 text-xs text-[#ccd6f6] focus:outline-none focus:border-[#64ffda] resize-none min-h-[38px] max-h-[120px] disabled:opacity-50"
                aria-label="Type your message"
                maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
              />
              <button 
                onClick={handleSend}
                disabled={loading || cooldownActive || !input.trim()}
                className="text-[#64ffda] hover:bg-[#64ffda]/10 w-10 h-10 rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {cooldownActive ? (
                  <i className="fas fa-hourglass-half text-xs"></i>
                ) : (
                  <i className="fas fa-paper-plane text-sm"></i>
                )}
              </button>
            </div>
            
            {/* Character count / hint */}
            <div className="flex justify-between mt-1 px-1">
              <span className="text-[10px] text-[#8892b0] opacity-60">
                {input.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
              </span>
              <span className="text-[10px] text-[#8892b0] opacity-60">
                Press Enter to send
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-lg md:text-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-[#112240] text-[#64ffda] rotate-90 shadow-[0_0_15px_rgba(100,255,218,0.2)]' 
            : 'bg-[#64ffda] text-[#0a192f] hover:-translate-y-1'
        }`}
        aria-label={isOpen ? "Close career assistant" : "Open career assistant"}
        aria-expanded={isOpen}
      >
        <i className={isOpen ? 'fas fa-times' : 'fas fa-terminal'} aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default CareerBot;
