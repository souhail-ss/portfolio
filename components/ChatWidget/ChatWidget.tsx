'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { MiniChat } from './MiniChat';
import * as S from './ChatWidget.styles';

export const ChatWidget: React.FC = () => {
  const { chatState, openChat } = useChat();

  // Don't render anything when expanded (ChatModal handles that state)
  if (chatState === 'expanded') return null;

  return (
    <AnimatePresence mode="wait">
      {chatState === 'closed' && (
        <S.FloatingButton
          key="floating-button"
          onClick={openChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <S.Pulse />
          <MessageCircle />
        </S.FloatingButton>
      )}

      {chatState === 'minimized' && (
        <MiniChat key="mini-chat" />
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
