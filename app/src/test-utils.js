import { render } from '@testing-library/react';

import { UIProvider } from './contexts/UIContext';
import ChatClient from './lib/ChatClient';

const withProviders = ({ children }) => (
    <ChatClient>
        <UIProvider>
            {children}
        </UIProvider>
    </ChatClient>
);

const customRender = (ui, options) => render(ui, { wrapper: withProviders, ...options })

export * from '@testing-library/react';

export { customRender as render };
