import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuth } from "@/hooks/auth/useAuth";
import { createTestStore } from "@/test-utils";
import { mockAuthResponse } from "@/test-utils/mockData";

describe("useAuth Hook", () => {
  it("should return initial unauthenticated state", () => {
    const store = createTestStore({
      user: {
        user: null,
        isLoading: false,
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user.user).toBeNull();
  });

  it("should return authenticated state when user is logged in", () => {
    const store = createTestStore({
      user: {
        user: mockAuthResponse,
        isLoading: false,
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user.user).toEqual(mockAuthResponse);
  });

  it("should return user data correctly", () => {
    const store = createTestStore({
      user: {
        user: mockAuthResponse,
        isLoading: false,
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.user.user?.user.username).toBe("testuser");
    expect(result.current.user.user?.user.role).toBe("user");
    expect(result.current.user.user?.user.highScore).toBe(100);
  });
});
