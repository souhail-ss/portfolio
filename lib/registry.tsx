'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { ChatProvider, useChat } from '@/context/ChatContext';
import { ChatWidget } from '@/components/ChatWidget';
import { ChatModal } from '@/components/Hero/ChatModal';

// Global chat components that persist across pages
const GlobalChat: React.FC = () => {
  const { chatState } = useChat();
  return (
    <>
      <ChatWidget />
      {chatState === 'expanded' && <ChatModal />}
    </>
  );
};

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={theme}>
        <ChatProvider>
          <GlobalStyles />
          {children}
          <GlobalChat />
        </ChatProvider>
      </ThemeProvider>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <ChatProvider>
          <GlobalStyles />
          {children}
          <GlobalChat />
        </ChatProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
