# Python Calculator Project

A simple Python calculator application demonstrating basic arithmetic operations.

## Setup

Create a virtual environment and install dependencies:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Usage

Run the calculator:

```bash
python calculator.py
```

## Running Tests

```bash
pytest
```

Or with coverage:

```bash
pytest --cov=. --cov-report=html
```

## Project Structure

- `calculator.py` - Main calculator implementation
- `test_calculator.py` - Unit tests
- `requirements.txt` - Python dependencies
