import { render } from '@testing-library/react';

import { UIProvider } from './contexts/UIContext';

const withProviders = ({ children }) => (
    <UIProvider>
        {children}
    </UIProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: withProviders, ...options })

export * from '@testing-library/react';

export { customRender as render };
