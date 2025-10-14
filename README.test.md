# Testing Guide

This project uses **Jest** and **React Testing Library** for testing, following industry best practices.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Best Practices](#best-practices)
- [Testing Patterns](#testing-patterns)
- [Coverage](#coverage)

## 🚀 Getting Started

### Prerequisites

All testing dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests in CI mode
```bash
npm run test:ci
```

## 📁 Test Structure

```
src/
├── __mocks__/              # Global mocks
│   └── fileMock.ts
├── test-utils/             # Test utilities and helpers
│   ├── index.tsx           # Custom render with providers
│   └── mockData.ts         # Mock data for tests
├── setupTests.ts           # Test environment setup
└── components/
    └── ComponentName/
        ├── Component.tsx
        └── __tests__/
            └── Component.test.tsx
```

## ✅ Best Practices

### 1. **Test Organization**
- Place tests in `__tests__` folders next to the component
- Use descriptive test file names: `ComponentName.test.tsx`
- Group related tests using `describe` blocks

### 2. **AAA Pattern**
Always follow the **Arrange-Act-Assert** pattern:

```typescript
it('should do something', () => {
  // Arrange - Setup test data and environment
  const user = userEvent.setup();
  renderWithProviders(<Component />);

  // Act - Perform the action
  await user.click(screen.getByRole('button'));

  // Assert - Verify the outcome
  expect(screen.getByText('Result')).toBeInTheDocument();
});
```

### 3. **Query Priority**
Use queries in this order (as per Testing Library recommendations):
1. `getByRole` - Accessibility-focused
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Form inputs
4. `getByText` - Non-interactive elements
5. `getByTestId` - Last resort

```typescript
// ✅ Good
screen.getByRole('button', { name: /submit/i })

// ❌ Avoid
screen.getByTestId('submit-button')
```

### 4. **Testing User Interactions**
Always use `userEvent` over `fireEvent`:

```typescript
import userEvent from '@testing-library/user-event';

it('should handle click', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));
});
```

### 5. **Async Testing**
Use `waitFor` for async operations:

```typescript
it('should load data', async () => {
  renderWithProviders(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### 6. **Mocking**
Mock external dependencies, not internal logic:

```typescript
// Mock axios
jest.mock('axios');

// Mock custom hooks
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    isAuthenticated: true,
  }),
}));
```

## 🎯 Testing Patterns

### Testing Components

```typescript
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MyComponent />);
    
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Testing Hooks

```typescript
import { renderHook } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.count).toBe(0);
  });

  it('should update state', () => {
    const { result } = renderHook(() => useMyHook());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

### Testing Redux Connected Components

```typescript
import { renderWithProviders } from '@/test-utils';

it('should work with Redux state', () => {
  renderWithProviders(<Component />, {
    preloadedState: {
      user: {
        user: mockUser,
        isLoading: false,
      },
    },
  });
  
  expect(screen.getByText(mockUser.username)).toBeInTheDocument();
});
```

### Testing Routing

```typescript
it('should navigate correctly', async () => {
  const user = userEvent.setup();
  renderWithProviders(<Component />, { withRouter: true });
  
  await user.click(screen.getByRole('link', { name: /home/i }));
  expect(window.location.pathname).toBe('/');
});
```

## 📊 Coverage

### Coverage Thresholds

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
}
```

### View Coverage Report

After running `npm run test:coverage`, open:
```bash
open coverage/lcov-report/index.html
```

### Coverage Best Practices

1. **Focus on Critical Paths**
   - Test happy paths
   - Test error scenarios
   - Test edge cases

2. **Don't Chase 100% Coverage**
   - Focus on meaningful tests
   - Some code doesn't need testing (types, configs)

3. **Excluded from Coverage**
   - Type declarations (`.d.ts`)
   - Entry points (`main.tsx`)
   - Storybook files (`.stories.tsx`)
   - Test files themselves

## 🔍 Common Testing Scenarios

### Form Testing
```typescript
it('should validate form', async () => {
  const user = userEvent.setup();
  renderWithProviders(<FormComponent />);
  
  // Fill form
  await user.type(screen.getByLabelText(/username/i), 'testuser');
  await user.type(screen.getByLabelText(/password/i), 'Pass123!');
  
  // Submit
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check result
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

### API Mocking
```typescript
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('should fetch data', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });
  
  renderWithProviders(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Error Handling
```typescript
it('should display error message', async () => {
  mockedAxios.get.mockRejectedValue(new Error('API Error'));
  
  renderWithProviders(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## 🐛 Debugging Tests

### Debug Output
```typescript
import { screen } from '@testing-library/react';

// Print DOM tree
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));
```

### Logging
```typescript
it('should work', () => {
  const { container } = renderWithProviders(<Component />);
  console.log(container.innerHTML);
});
```

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 Contributing

When adding new features:
1. Write tests first (TDD)
2. Ensure all tests pass
3. Maintain coverage thresholds
4. Follow naming conventions
5. Document complex test scenarios

