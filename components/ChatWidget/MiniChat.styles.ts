import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const typing = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

export const Container = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: 2rem;
  width: 350px;
  height: 450px;
  background: #1a1a1a;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;

  @media (max-width: 768px) {
    right: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    border-radius: 16px 16px 0 0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 12px 16px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Avatar = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #111;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OnlineDot = styled.span`
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const HeaderStatus = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ControlButton = styled.button<{ $variant?: 'close' }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ $variant }) => $variant === 'close' ? '#ff5f57' : '#fff'};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

export const EmptyTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px;
`;

export const EmptyText = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 16px;
  line-height: 1.4;
`;

export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const SuggestionButton = styled(motion.button)`
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const MessageGroup = styled.div<{ $role: 'user' | 'assistant' }>`
  display: flex;
  gap: 8px;
  justify-content: ${({ $role }) => $role === 'user' ? 'flex-end' : 'flex-start'};
`;

export const MessageAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #111;
  overflow: hidden;
  flex-shrink: 0;
  align-self: flex-end;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessageBubble = styled.div<{ $role: 'user' | 'assistant' }>`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  ${({ $role }) =>
    $role === 'user'
      ? `
          background: #FF6B00;
          color: #fff;
          border-bottom-right-radius: 4px;
        `
      : `
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-bottom-left-radius: 4px;
        `}
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
`;

export const TypingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  animation: ${typing} 1s ease-in-out infinite;
`;

export const InputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

export const TextInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 10px 16px;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  transition: all 0.15s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #FF6B00;
    background: rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SendButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #FF6B00;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #e65c00;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
