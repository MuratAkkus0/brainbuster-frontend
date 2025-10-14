/**
 * Test Helpers
 * Reusable helper functions for common test operations
 */

import { screen, waitFor } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

/**
 * Wait for an element to appear with a custom error message
 */
export const waitForElement = async (
  selector: () => HTMLElement,
  options?: {
    timeout?: number;
    errorMessage?: string;
  }
) => {
  const { timeout = 3000, errorMessage = 'Element not found' } = options || {};
  
  await waitFor(selector, {
    timeout,
    onTimeout: () => new Error(errorMessage),
  });
};

/**
 * Fill a form field by label
 */
export const fillFormField = async (
  user: any,
  label: RegExp | string,
  value: string,
  options?: { shouldValidate?: boolean }
) => {
  const { shouldValidate = true } = options || {};
  const input = screen.getByLabelText(label);
  
  await user.clear(input);
  await user.type(input, value);
  
  if (shouldValidate) {
    expect(input).toHaveValue(value);
  }
  
  return input;
};

/**
 * Click a button by label
 */
export const clickButton = async (
  user: any,
  label: RegExp | string,
  options?: { shouldExist?: boolean }
) => {
  const { shouldExist = true } = options || {};
  const button = screen.getByRole('button', { name: label });
  
  if (shouldExist) {
    expect(button).toBeInTheDocument();
  }
  
  await user.click(button);
  return button;
};

/**
 * Assert element visibility
 */
export const assertElementVisible = (
  label: RegExp | string,
  options?: { role?: string }
) => {
  const { role = 'button' } = options || {};
  const element = screen.getByRole(role as any, { name: label });
  
  expect(element).toBeInTheDocument();
  return element;
};

/**
 * Assert element not visible
 */
export const assertElementNotVisible = (
  label: RegExp | string,
  options?: { role?: string }
) => {
  const { role = 'button' } = options || {};
  const element = screen.queryByRole(role as any, { name: label });
  
  expect(element).not.toBeInTheDocument();
  return element;
};

/**
 * Wait for API call with assertion
 */
export const waitForApiCall = async (
  mockFn: jest.Mock,
  expectedArgs: any[],
  options?: {
    timeout?: number;
  }
) => {
  const { timeout = 3000 } = options || {};
  
  await waitFor(
    () => {
      expect(mockFn).toHaveBeenCalledWith(...expectedArgs);
    },
    { timeout }
  );
};

/**
 * Assert toast notification was called
 */
export const assertToastCalled = async (
  toastMock: jest.Mock,
  type: 'success' | 'error',
  options?: {
    timeout?: number;
    message?: RegExp | string;
  }
) => {
  const { timeout = 1000, message } = options || {};
  
  await waitFor(
    () => {
      expect(toastMock).toHaveBeenCalled();
      
      if (message) {
        expect(toastMock).toHaveBeenCalledWith(
          expect.stringMatching(message instanceof RegExp ? message : new RegExp(message))
        );
      }
    },
    { timeout }
  );
};

/**
 * Get form validation state
 */
export const getFormValidationState = () => {
  const inputs = screen.getAllByRole('textbox');
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  return {
    inputs,
    passwordInputs,
    hasErrors: inputs.some((input) => input.getAttribute('aria-invalid') === 'true'),
  };
};

/**
 * Simulate successful login flow
 */
export const simulateLoginFlow = async (
  user: any,
  credentials: { username: string; password: string }
) => {
  await fillFormField(user, /username/i, credentials.username);
  await fillFormField(user, /password/i, credentials.password);
  await clickButton(user, /login/i);
};

/**
 * Create test description with context
 */
export const describeWithContext = (description: string, testFn: () => void) => {
  describe(`[Functional Test] ${description}`, testFn);
};

