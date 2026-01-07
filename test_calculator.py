"""
Unit tests for the calculator module.
"""

import pytest
from calculator import Calculator


@pytest.fixture
def calc():
    """Fixture to create a Calculator instance."""
    return Calculator()


class TestCalculator:
    """Test cases for Calculator class."""

    def test_add(self, calc):
        """Test addition operation."""
        assert calc.add(2, 3) == 5
        assert calc.add(-1, 1) == 0
        assert calc.add(0, 0) == 0
        assert calc.add(1.5, 2.5) == 4.0

    def test_subtract(self, calc):
        """Test subtraction operation."""
        assert calc.subtract(5, 3) == 2
        assert calc.subtract(0, 5) == -5
        assert calc.subtract(10, 10) == 0
        assert calc.subtract(5.5, 2.5) == 3.0

    def test_multiply(self, calc):
        """Test multiplication operation."""
        assert calc.multiply(2, 3) == 6
        assert calc.multiply(-2, 3) == -6
        assert calc.multiply(0, 5) == 0
        assert calc.multiply(2.5, 4) == 10.0

    def test_divide(self, calc):
        """Test division operation."""
        assert calc.divide(6, 3) == 2
        assert calc.divide(5, 2) == 2.5
        assert calc.divide(-10, 2) == -5
        assert calc.divide(0, 5) == 0

    def test_divide_by_zero(self, calc):
        """Test that division by zero raises ValueError."""
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            calc.divide(5, 0)

    def test_power(self, calc):
        """Test power operation."""
        assert calc.power(2, 3) == 8
        assert calc.power(5, 2) == 25
        assert calc.power(10, 0) == 1
        assert calc.power(2, -1) == 0.5
