# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A simple Python calculator application demonstrating basic arithmetic operations with a test suite.

## Development Commands

### Setup
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application
```bash
python calculator.py
```

### Testing
```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=. --cov-report=html

# Run specific test
pytest test_calculator.py::TestCalculator::test_add

# Run tests in verbose mode
pytest -v
```

## Code Architecture

### Structure
- `calculator.py` - Contains the `Calculator` class with arithmetic operations (add, subtract, multiply, divide, power) and an interactive CLI in `main()`
- `test_calculator.py` - Pytest-based unit tests with fixtures and comprehensive test coverage

### Key Design Points
- Calculator class methods are pure functions that don't maintain state
- Division by zero raises a `ValueError` with descriptive message
- Interactive CLI handles user input validation and error cases
- Tests use pytest fixtures for Calculator instantiation
