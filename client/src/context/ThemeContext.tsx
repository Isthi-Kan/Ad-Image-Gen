import { createContext, useContext, type ReactNode } from 'react';

type ThemeMode = 'dark';

interface ThemeContextValue {
    theme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme: ThemeMode = 'dark';

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}