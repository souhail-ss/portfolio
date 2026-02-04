import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

// Floating Icon Button (closed state)
export const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
  z-index: 1000;
  color: white;

  &:hover {
    box-shadow: 0 6px 30px rgba(255, 107, 0, 0.6);
  }

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const Pulse = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 107, 0, 0.4);
  animation: ${pulse} 2s ease-out infinite;
`;

// Minimized Bar (minimized state)
export const MinimizedBar = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 320px;
  height: 52px;
  background: #1a1a1a;
  border-radius: 12px 12px 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    left: 1.5rem;
    width: auto;
  }
`;

export const BarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;

  &:hover {
    opacity: 0.9;
  }
`;

export const BarAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const BarTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarControls = styled.div`
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
