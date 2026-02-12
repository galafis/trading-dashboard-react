# Contributing to Trading Strategy Dashboard

Thank you for your interest in contributing to the Trading Strategy Dashboard! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/trading-dashboard-react.git
   cd trading-dashboard-react
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Avoid using `any` type; use proper type definitions
- Document complex types and interfaces

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Keep components small and focused
- Use meaningful component and prop names
- Add proper TypeScript types for all props

### File Organization

- Place components in `src/components/`
- Place hooks in `src/hooks/`
- Place utilities in `src/utils/`
- Place types in `src/types/`
- Colocate test files with the code they test (e.g., `Component.tsx` and `Component.test.tsx`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Component Example

```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  value: number;
  onUpdate: (newValue: number) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  value, 
  onUpdate 
}) => {
  return (
    <div className="my-component">
      <h3>{title}</h3>
      <p>{value}</p>
      <button onClick={() => onUpdate(value + 1)}>
        Increment
      </button>
    </div>
  );
};
```

## Testing Guidelines

### Writing Tests

- Write tests for all new features
- Maintain minimum 80% code coverage
- Test both success and error cases
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

### Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render with correct title', () => {
    render(<MyComponent title="Test" value={5} onUpdate={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call onUpdate when button is clicked', () => {
    const mockUpdate = jest.fn();
    render(<MyComponent title="Test" value={5} onUpdate={mockUpdate} />);
    
    fireEvent.click(screen.getByText('Increment'));
    expect(mockUpdate).toHaveBeenCalledWith(6);
  });
});
```

## Pull Request Process

1. **Update your fork** with the latest changes from the main repository:
   ```bash
   git remote add upstream https://github.com/galafis/trading-dashboard-react.git
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and ensure they pass**:
   ```bash
   npm test
   ```

3. **Build the project** to ensure no build errors:
   ```bash
   npm run build
   ```

4. **Commit your changes** with a clear commit message:
   ```bash
   git commit -m "feat: add new feature description"
   ```
   
   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `test:` for test additions/changes
   - `refactor:` for code refactoring
   - `style:` for code style changes
   - `chore:` for maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## Reporting Bugs

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)
- **Error messages** or console logs

Use the GitHub issue template for bug reports.

## Suggesting Features

When suggesting features, please include:

- **Clear description** of the feature
- **Use case** explaining why it's needed
- **Proposed implementation** if you have ideas
- **Examples** or mockups if applicable

Use the GitHub issue template for feature requests.

## Questions?

If you have questions about contributing, feel free to:
- Open a GitHub discussion
- Contact the maintainers
- Check existing issues and pull requests

Thank you for contributing to the Trading Strategy Dashboard!
