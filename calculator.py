"""
A simple calculator module with basic arithmetic operations.
"""

class Calculator:
    """Calculator class supporting basic arithmetic operations."""

    def add(self, a, b):
        """Add two numbers."""
        return a + b

    def subtract(self, a, b):
        """Subtract b from a."""
        return a - b

    def multiply(self, a, b):
        """Multiply two numbers."""
        return a * b

    def divide(self, a, b):
        """Divide a by b."""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

    def power(self, base, exponent):
        """Raise base to the power of exponent."""
        return base ** exponent


def main():
    """Interactive calculator CLI."""
    calc = Calculator()

    print("=== Simple Calculator ===")
    print("Operations: add, subtract, multiply, divide, power, quit")

    while True:
        operation = input("\nEnter operation: ").strip().lower()

        if operation == "quit":
            print("Goodbye!")
            break

        if operation not in ["add", "subtract", "multiply", "divide", "power"]:
            print("Invalid operation. Please try again.")
            continue

        try:
            a = float(input("Enter first number: "))
            b = float(input("Enter second number: "))

            if operation == "add":
                result = calc.add(a, b)
            elif operation == "subtract":
                result = calc.subtract(a, b)
            elif operation == "multiply":
                result = calc.multiply(a, b)
            elif operation == "divide":
                result = calc.divide(a, b)
            elif operation == "power":
                result = calc.power(a, b)

            print(f"Result: {result}")

        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")


if __name__ == "__main__":
    main()
