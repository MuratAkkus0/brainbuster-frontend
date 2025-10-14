import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import questionsReducer from '@/store/slices/questionsSlice';
import appReducer from '@/store/slices/appSlice';

// Create a test store
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
      questions: questionsReducer,
      app: appReducer,
    },
    preloadedState,
  });
};

// Custom render with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: ReturnType<typeof createTestStore>;
  withRouter?: boolean;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    withRouter = true,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const content = <Provider store={store}>{children}</Provider>;
    
    if (withRouter) {
      return <BrowserRouter>{content}</BrowserRouter>;
    }
    
    return content;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

