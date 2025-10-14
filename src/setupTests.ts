import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Suppress console output during tests for cleaner test results
const originalError = console.error;
const originalLog = console.log;

beforeAll(() => {
  // Suppress console.error for known issues and test artifacts
  console.error = (...args: any[]) => {
    const errorString = String(args[0]);
    
    // Suppress known warnings and test-related errors
    if (
      errorString.includes('Warning: ReactDOM.render') ||
      errorString.includes('Not implemented: HTMLFormElement.prototype.submit') ||
      errorString.includes('Login error:') ||
      errorString.includes('type:')
    ) {
      return;
    }
    
    // Suppress Redux action logs
    if (typeof args[0] === 'object' && (args[0]?.type || args[0]?.response)) {
      return;
    }
    
    originalError.call(console, ...args);
  };

  // Suppress console.log for test artifacts (credentials, etc)
  console.log = (...args: any[]) => {
    // Suppress credential logging during tests
    if (args[0]?.username || args[0]?.password) {
      return;
    }
    originalLog.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.log = originalLog;
});

