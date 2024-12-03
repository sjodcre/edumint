import React, { createContext, useState } from 'react';

type Screen = 'onboarding' | 'videofeed' | 'profile';

interface ScreenContextType {
  currentScreen: Screen;
  setCurrentScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export const ScreenContext = createContext<ScreenContextType>({
  currentScreen: 'onboarding',
  setCurrentScreen: () => {},
});

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};