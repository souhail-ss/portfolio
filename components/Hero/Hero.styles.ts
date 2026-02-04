import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

export const borderGradient = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const waveMove = keyframes`
  0% {
    background-position: 0% 50%, 50% 0%, 100% 50%;
  }
  50% {
    background-position: 100% 50%, 50% 100%, 0% 50%;
  }
  100% {
    background-position: 0% 50%, 50% 0%, 100% 50%;
  }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

export const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 107, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 0, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
  z-index: 0;
`;

export const GlowOrb = styled(motion.div)<{ color: string; size: number; top: string; left: string }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ color }) => color};
  filter: blur(80px);
  opacity: 0.3;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  animation: ${pulse} 8s ease-in-out infinite;
  z-index: 0;
`;

export const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background:
      radial-gradient(ellipse 80% 40% at 20% 30%, rgba(255, 107, 0, 0.3) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255, 140, 0, 0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 35% at 50% 80%, rgba(255, 165, 0, 0.2) 0%, transparent 50%);
    background-size: 200% 200%, 180% 180%, 160% 160%;
    animation: ${waveMove} 25s ease-in-out infinite;
    filter: blur(60px);
  }

  &::after {
    content: '';
    position: absolute;
    top: -30%;
    left: -30%;
    right: -30%;
    bottom: -30%;
    background:
      radial-gradient(ellipse 50% 60% at 70% 20%, rgba(255, 165, 0, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse 45% 45% at 30% 60%, rgba(255, 107, 0, 0.2) 0%, transparent 45%);
    background-size: 220% 220%, 200% 200%;
    animation: ${waveMove} 30s ease-in-out infinite reverse;
    filter: blur(80px);
  }
`;

export const SpotlightEffect = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
  }
`;
export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
  }
`;

export const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: #FFFFFF;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

export const ProfileImageWrapper = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #FF6B00, #FF8C00, #FFA500);
  box-shadow: 0 0 40px rgba(255, 107, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 120px;
    height: 120px;
  }
`;


// export const Name = styled(motion.h1)`
//   font-size: clamp(3rem, 8vw, 6rem);
//   font-weight: ${({ theme }) => theme.fontWeights.bold};
//   letter-spacing: -0.04em;
//   line-height: 1;
//   margin-bottom: ${({ theme }) => theme.spacing.lg};
//   background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 50%, #FF6B00 100%);
//   background-size: 200% 200%;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   animation: ${gradientMove} 8s ease infinite;
// `;

// export const Title = styled(motion.h2)`
//   font-size: clamp(1.25rem, 3vw, 1.75rem);
//   color: ${({ theme }) => theme.colors.textSecondary};
//   font-weight: ${({ theme }) => theme.fontWeights.regular};
//   margin-bottom: ${({ theme }) => theme.spacing.xl};
//   letter-spacing: -0.01em;
// `;
export const Title = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: -0.01em;
  text-align: left; // Add this

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

// export const StatsRow = styled(motion.div)`
//   display: flex;
//   justify-content: center;
//   gap: ${({ theme }) => theme.spacing['2xl']};
//   margin-bottom: ${({ theme }) => theme.spacing.xl};
//   flex-wrap: wrap;

//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     gap: ${({ theme }) => theme.spacing.xl};
//   }
// `;
// Update StatsRow to align left:
export const StatsRow = styled(motion.div)`
  display: flex;
  justify-content: flex-start; // Changed from center
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

// ChatInputSection stays the same but remove the max-width centering:
export const ChatInputSection = styled(motion.div)`
  width: 100%; // Changed from max-width
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatNumber = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// export const ChatInputSection = styled(motion.div)`
//   max-width: 560px;
//   margin: 0 auto ${({ theme }) => theme.spacing.xl};
// `;

export const ChatInputWrapper = styled.div`
  position: relative;
  padding: 2px;
  border-radius: 18px;
  background: linear-gradient(90deg, #FF6B00, #FF8C00, #FFA500, #FF6B00);
  background-size: 300% 300%;
  animation: ${borderGradient} 3s ease infinite;
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.2);
`;

export const ChatInputCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #141414;
  border-radius: 16px;
  padding: 8px 8px 8px 24px;
`;

export const ChatInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 14px 0;
  color: #FFFFFF;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 15px;
  letter-spacing: -0.01em;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    outline: none;
  }
`;

export const ChatSubmitButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #FF6B00;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #FF8533;
  }

  &:disabled {
    background: #2A2A2A;
    color: #666666;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

export const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.textMuted}, transparent);
`;

// About Card styles for Hero section
export const AboutCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 0, 0.15);
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 420px;
  width: 100%;
`;

export const AboutHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 107, 0, 0.5);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AboutLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: #FF6B00;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: #FF6B00;
  }
`;

export const AboutDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TechTag = styled.span`
  padding: 6px 12px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #FF6B00;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AboutActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SocialLink = styled(motion.a)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 0, 0.1);
    border-color: rgba(255, 107, 0, 0.3);
    color: #FF6B00;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CTAButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  border: 1px solid rgba(255, 107, 0, 0.5);
  border-radius: 10px;
  color: #FF6B00;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 0, 0.1);
    border-color: #FF6B00;
  }
`;

export const DownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #FF6B00;
  border-radius: 10px;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #FF8533;
  }
`;
