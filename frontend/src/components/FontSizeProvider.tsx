import { createContext, useContext, useEffect, useState } from 'react';

type FontSize = '14' | '16' | '18';

type FontSizeProviderState = {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
};

const initialState: FontSizeProviderState = {
  fontSize: '16',
  setFontSize: () => null
};

const FontSizeProviderContext =
  createContext<FontSizeProviderState>(initialState);

type FontSizeProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
  defaultSize?: FontSize;
};

export function FontSizeProvider({
  children,
  storageKey = 'vite-ui-font-size',
  defaultSize = '16',
  ...props
}: FontSizeProviderProps) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window === 'undefined') return defaultSize;
    try {
      const stored = localStorage.getItem(storageKey);
      return (stored as FontSize) || defaultSize;
    } catch {
      return defaultSize;
    }
  });

  const applyFontSize = (size: FontSize) => {
    const sizeInPx = size + 'px';

    // Apply to main document
    document.documentElement.style.setProperty('--app-font-size', sizeInPx);

    // Apply to shadow root if it exists (for copilot)
    if (window.cl_shadowRootElement) {
      window.cl_shadowRootElement.style.setProperty(
        '--app-font-size',
        sizeInPx
      );
    }
  };

  const setFontSize = (fontSize: FontSize) => {
    setFontSizeState(fontSize);

    try {
      localStorage.setItem(storageKey, fontSize);
    } catch {
      // Handle localStorage not being available
    }

    applyFontSize(fontSize);
  };

  useEffect(() => {
    // Apply initial font size
    applyFontSize(fontSize);

    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const newSize = e.newValue as FontSize;
        if (['14', '16', '18'].includes(newSize)) {
          setFontSizeState(newSize);
          applyFontSize(newSize);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fontSize, storageKey]);

  const value = {
    fontSize,
    setFontSize
  };

  return (
    <FontSizeProviderContext.Provider {...props} value={value}>
      {children}
    </FontSizeProviderContext.Provider>
  );
}

export const useFontSize = () => {
  const context = useContext(FontSizeProviderContext);

  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }

  return context;
};
