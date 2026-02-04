'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, Minus, X, Send } from 'lucide-react';
import { useChat, Message } from '@/context/ChatContext';
import { profile } from '@/data/portfolio.data';
import * as S from './MiniChat.styles';

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): React.ReactNode => {
  const elements: React.ReactNode[] = [];
  let key = 0;
  const markdownRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_([^_]+)_)/g;
  let lastIndex = 0;
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    if (match[2] && match[3]) {
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
      elements.push(<code key={key++} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>{match[6]}</code>);
    } else if (match[7]) {
      elements.push(<em key={key++}>{match[7]}</em>);
    } else if (match[8]) {
      elements.push(<em key={key++}>{match[8]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    elements.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return elements.length > 0 ? elements : text;
};

// Typed message component with word-by-word animation
const TypedMessage: React.FC<{
  content: string;
  onComplete: () => void;
  scrollToBottom: () => void;
}> = ({ content, onComplete, scrollToBottom }) => {
  const [displayedWords, setDisplayedWords] = useState(0);
  const words = content.split(' ');
  const WORD_DELAY = 30;

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

export const MiniChat: React.FC = () => {
  const {
    messages,
    isLoading,
    pendingQuestion,
    sendMessage,
    markMessageComplete,
    clearPendingQuestion,
    expandChat,
    minimizeToIcon,
    closeChat
  } = useChat();

  const [inputValue, setInputValue] = useState('');
  const [hasSentPending, setHasSentPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle pending question from WelcomeModal or Hero input
  useEffect(() => {
    if (pendingQuestion && !hasSentPending) {
      setHasSentPending(true);
      clearPendingQuestion();
      sendMessage(pendingQuestion);
    }
  }, [pendingQuestion, hasSentPending, sendMessage, clearPendingQuestion]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const suggestions = [
    "Parle-moi de ton parcours",
    "Quelle est ta stack technique ?",
    "Qu'as-tu construit chez Weneeds ?",
  ];

  const isAnyMessageTyping = messages.some(m => m.isTyping);

  return (
    <S.Container
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <S.Header>
        <S.HeaderLeft onClick={expandChat}>
          <S.Avatar>
            <img src={profile.profileImage} alt={profile.fullName} />
            <S.OnlineDot />
          </S.Avatar>
          <S.HeaderInfo>
            <S.HeaderTitle>Souhail AI</S.HeaderTitle>
            <S.HeaderStatus>En ligne</S.HeaderStatus>
          </S.HeaderInfo>
        </S.HeaderLeft>
        <S.HeaderControls>
          <S.ControlButton onClick={expandChat} title="Agrandir">
            <Maximize2 />
          </S.ControlButton>
          <S.ControlButton onClick={minimizeToIcon} title="Reduire">
            <Minus />
          </S.ControlButton>
          <S.ControlButton onClick={closeChat} $variant="close" title="Fermer">
            <X />
          </S.ControlButton>
        </S.HeaderControls>
      </S.Header>

      <S.MessagesContainer>
        {messages.length === 0 && !isLoading && (
          <S.EmptyState>
            <S.EmptyTitle>Clone IA de Souhail</S.EmptyTitle>
            <S.EmptyText>
              Posez-moi vos questions sur mon parcours ou mes competences !
            </S.EmptyText>
            <S.SuggestionsWrapper>
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
            </S.SuggestionsWrapper>
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
        <S.TextInput
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ecrivez un message..."
          disabled={isLoading || isAnyMessageTyping}
        />
        <S.SendButton
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading || isAnyMessageTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send />
        </S.SendButton>
      </S.InputSection>
    </S.Container>
  );
};

export default MiniChat;
