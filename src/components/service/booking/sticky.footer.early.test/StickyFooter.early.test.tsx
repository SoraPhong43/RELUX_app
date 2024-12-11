// Unit tests for: StickyFooter

import StickyFooter from "@/components/service/booking/sticky.footer";
import { fireEvent, render, screen } from "@testing-library/react";
import { router } from "expo-router";
import React from "react";

// Mocking the necessary dependencies
interface MockIProps {
  service: MockService | null;
}

class MockService {
  public id: string = "service1";
}

const MockcurrencyFormatter = jest
  .fn()
  .mockImplementation((value: number) => `Formatted: ${value}`) as any;

const MockuseCurrentApp = jest.fn().mockReturnValue({
  cart: {
    service1: { sum: 100, quantity: 2 },
  },
  setCart: jest.fn(),
}) as any;

jest.mock("@/app/utils/API", () => ({
  currencyFormatter: MockcurrencyFormatter,
}));

jest.mock("@/context/app.context", () => ({
  useCurrentApp: MockuseCurrentApp,
}));

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe("StickyFooter() StickyFooter method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should render the footer with correct sum and quantity when service is in cart", () => {
      // Arrange
      const mockProps: MockIProps = { service: new MockService() as any };

      // Act
      render(<StickyFooter {...(mockProps as any)} />);

      // Assert
      expect(screen.getByText("Formatted: 100")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it('should navigate to booking page when "Make an appointment now" is clicked', () => {
      // Arrange
      const mockProps: MockIProps = { service: new MockService() as any };

      // Act
      render(<StickyFooter {...(mockProps as any)} />);
      fireEvent.click(screen.getByText("Make an apoinment now"));

      // Assert
      expect(router.navigate).toHaveBeenCalledWith("/product/booking");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should not render the footer when service is null", () => {
      // Arrange
      const mockProps: MockIProps = { service: null };

      // Act
      render(<StickyFooter {...(mockProps as any)} />);

      // Assert
      expect(
        screen.queryByText("Make an apoinment now")
      ).not.toBeInTheDocument();
    });

    it("should not render the footer when cart sum is zero", () => {
      // Arrange
      MockuseCurrentApp.mockReturnValueOnce({
        cart: {
          service1: { sum: 0, quantity: 0 },
        },
        setCart: jest.fn(),
      } as any);
      const mockProps: MockIProps = { service: new MockService() as any };

      // Act
      render(<StickyFooter {...(mockProps as any)} />);

      // Assert
      expect(
        screen.queryByText("Make an apoinment now")
      ).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: StickyFooter
