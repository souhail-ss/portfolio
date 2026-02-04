import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Minus, Square, X, Send } from 'lucide-react';
import { profile } from '../../data/portfolio.data';
import { useChat, Message } from '@/context/ChatContext';
import * as S from './ChatModal.styles';

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): React.ReactNode => {
  const elements: React.ReactNode[] = [];
  let key = 0;
  // Regex pour: liens [text](url), gras **text**, code `text`, italique *text*
  const markdownRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_([^_]+)_)/g;
  let lastIndex = 0;
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const fullMatch = match[0];
    if (match[2] && match[3]) {
      // Lien markdown [text](url)
      const isExternal = match[3].startsWith('http');
      elements.push(
        <a
          key={key++}
          href={match[3]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ color: '#FF6B00', textDecoration: 'underline' }}
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      elements.push(<strong key={key++}>{match[4]}</strong>);
    } else if (match[5]) {
      elements.push(<strong key={key++}>{match[5]}</strong>);
    } else if (match[6]) {
      elements.push(<code key={key++} style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>{match[6]}</code>);
    } else if (match[7]) {
      elements.push(<em key={key++}>{match[7]}</em>);
    } else if (match[8]) {
      elements.push(<em key={key++}>{match[8]}</em>);
    }
    lastIndex = match.index + fullMatch.length;
  }
  if (lastIndex < text.length) {
    elements.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return elements.length > 0 ? elements : text;
};

// Composant pour l'effet typing mot par mot
const TypedMessage: React.FC<{
  content: string;
  onComplete: () => void;
  scrollToBottom: () => void;
}> = ({ content, onComplete, scrollToBottom }) => {
  const [displayedWords, setDisplayedWords] = useState(0);
  const words = content.split(' ');
  const WORD_DELAY = 30; // ms entre chaque mot

  useEffect(() => {
    if (displayedWords < words.length) {
      const timer = setTimeout(() => {
        setDisplayedWords(prev => prev + 1);
        scrollToBottom();
      }, WORD_DELAY);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [displayedWords, words.length, onComplete, scrollToBottom]);

  const displayedText = words.slice(0, displayedWords).join(' ');

  return <>{parseMarkdown(displayedText)}</>;
};

// API is now on the same origin with Next.js

export const ChatModal: React.FC = () => {
  const {
    chatState,
    initialQuestion,
    messages,
    isLoading,
    sendMessage: sendMessageToContext,
    markMessageComplete,
    closeChat,
    minimizeToBar,
    minimizeToIcon,
    clearInitialQuestion
  } = useChat();

  const isOpen = chatState === 'expanded';
  const [inputValue, setInputValue] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (isOpen && initialQuestion && !hasInitialized) {
      setHasInitialized(true);
      clearInitialQuestion();
      setTimeout(() => {
        sendMessageToContext(initialQuestion);
      }, 300);
    }
  }, [isOpen, initialQuestion, hasInitialized, sendMessageToContext, clearInitialQuestion]);

  useEffect(() => {
    if (!isOpen) {
      setHasInitialized(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue.trim();
    setInputValue('');
    await sendMessageToContext(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessageToContext(question);
  };

  const suggestions = [
    "Parle-moi de ton parcours",
    "Quelle est ta stack technique ?",
    "Qu'as-tu construit chez Weneeds ?",
  ];

  const isAnyMessageTyping = messages.some(m => m.isTyping);

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeChat}
        >
          <S.ModalContainer
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.ModalHeader>
              <S.ControlsRow>
                <S.ControlButton onClick={minimizeToIcon} title="Reduire en icone">
                  <Minus />
                </S.ControlButton>
                <S.ControlButton onClick={minimizeToBar} title="Minimiser">
                  <Square />
                </S.ControlButton>
                <S.ControlButton onClick={closeChat} $variant="close" title="Fermer">
                  <X />
                </S.ControlButton>
              </S.ControlsRow>
            </S.ModalHeader>

            <S.MessagesContainer>
              {messages.length === 0 && !isLoading && (
                <S.EmptyState>
                  <S.EmptyTitle>Je suis le clone IA de Souhail</S.EmptyTitle>
                  <S.EmptyText>
                    Posez-moi vos questions sur mon parcours, mes experiences ou mes competences techniques !
                  </S.EmptyText>
                  <S.SuggestionsGrid>
                    {suggestions.map((suggestion, index) => (
                      <S.SuggestionButton
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {suggestion}
                      </S.SuggestionButton>
                    ))}
                  </S.SuggestionsGrid>
                </S.EmptyState>
              )}

              {messages.map((message) => (
                <S.MessageGroup key={message.id} $role={message.role}>
                  {message.role === 'assistant' && (
                    <S.MessageAvatar>
                      <img src={profile.profileImage} alt={profile.fullName} />
                    </S.MessageAvatar>
                  )}
                  <S.MessageBubble $role={message.role}>
                    {message.role === 'assistant' ? (
                      message.isTyping ? (
                        <TypedMessage
                          content={message.content}
                          onComplete={() => markMessageComplete(message.id)}
                          scrollToBottom={scrollToBottom}
                        />
                      ) : (
                        parseMarkdown(message.content)
                      )
                    ) : (
                      message.content
                    )}
                  </S.MessageBubble>
                </S.MessageGroup>
              ))}

              {isLoading && (
                <S.MessageGroup $role="assistant">
                  <S.MessageAvatar>
                    <img src={profile.profileImage} alt={profile.fullName} />
                  </S.MessageAvatar>
                  <S.MessageBubble $role="assistant">
                    <S.TypingIndicator>
                      <S.TypingDot style={{ animationDelay: '0ms' }} />
                      <S.TypingDot style={{ animationDelay: '150ms' }} />
                      <S.TypingDot style={{ animationDelay: '300ms' }} />
                    </S.TypingIndicator>
                  </S.MessageBubble>
                </S.MessageGroup>
              )}
              <div ref={messagesEndRef} />
            </S.MessagesContainer>

            <S.InputSection>
              <S.TextArea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ecrivez votre message..."
                disabled={isLoading || isAnyMessageTyping}
                rows={1}
              />
              <S.SendButton
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || isAnyMessageTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
                <span>Envoyer</span>
              </S.SendButton>
            </S.InputSection>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
