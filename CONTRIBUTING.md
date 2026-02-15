# Contributing to FastFitHub AI

Thank you for your interest in contributing to FastFitHub AI! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/FastFitHubAi.git
   cd FastFitHubAi
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/drawotphub/FastFitHubAi.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Before You Start

- Check existing issues and pull requests to avoid duplicates
- Open an issue to discuss major changes before implementing
- Ensure your local branch is up to date with upstream

### Making Changes

1. **Write clean, maintainable code**
   - Follow the existing code style
   - Use TypeScript for all new code
   - Add comments for complex logic
   - Keep functions small and focused

2. **Test your changes**
   ```bash
   npm start
   ```

3. **Commit with clear messages**
   ```bash
   git commit -m "feat: add workout timer feature"
   ```

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code restructuring
- `test:` for tests
- `chore:` for maintenance

### Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what was changed and why
   - Reference to related issues (e.g., "Fixes #123")
   - Screenshots for UI changes

3. **Respond to feedback** promptly and professionally

4. **Keep your PR focused** on a single feature or fix

## Code Style Guide

### TypeScript

- Use strict mode: `"strict": true` in tsconfig.json
- Prefer interfaces over types for object shapes
- Use meaningful variable names
- Avoid `any` type; use generics instead

Example:
```typescript
interface Workout {
  id: string;
  name: string;
  duration: number;
  calories: number;
}

export async function addWorkout(workout: Workout): Promise<void> {
  // Implementation
}
```

### React Native Components

- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for prop types
- Name components with PascalCase

Example:
```typescript
interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
}

export function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* Component content */}
    </TouchableOpacity>
  );
}
```

### Styling

- Use StyleSheet.create() for better performance
- Follow the existing color scheme
- Maintain responsive design principles
- Use consistent spacing and sizing

## File Organization

```
src/
├── screens/          # Screen components
├── components/       # Reusable components
├── services/         # API and external services
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── hooks/            # Custom React hooks
```

## Documentation

### README Updates

- Update README.md for significant features
- Include examples and usage instructions
- Keep documentation current with code changes

### Code Comments

- Add JSDoc comments for public functions
- Explain complex algorithms
- Document edge cases and limitations

Example:
```typescript
/**
 * Calculate total calories burned from workouts
 * @param workouts - Array of workout objects
 * @returns Total calories burned
 */
export function calculateTotalCalories(workouts: Workout[]): number {
  // Implementation
}
```

## Firebase Integration

### Adding New Collections

1. Define TypeScript interfaces for your data
2. Add functions to `src/services/firebase.ts`
3. Update Firestore security rules
4. Document the data structure

### Best Practices

- Use subcollections for related data
- Index frequently queried fields
- Implement proper error handling
- Use transactions for multi-document updates

## Common Issues

### Build Errors

- Clear cache: `npm install --force`
- Restart Metro bundler: `npm start`
- Check TypeScript: `npm run lint`

### Firebase Errors

- Verify Firebase credentials in `.env`
- Check Firestore security rules
- Ensure collections exist in Firebase
- Review Firebase console for errors

### Navigation Issues

- Ensure all screens are registered in navigation
- Check screen names match exactly
- Verify navigation parameters are passed correctly

## Testing

### Manual Testing

- Test on both iOS and Android
- Test on physical devices if possible
- Test with different screen sizes
- Test with slow network connections

### Best Practices

- Test all user flows end-to-end
- Test error scenarios
- Test with different data states
- Document any known issues

## Performance Guidelines

- Minimize re-renders using React.memo
- Use FlatList for long lists
- Optimize images and assets
- Lazy load heavy modules
- Profile performance with React DevTools

## Security Guidelines

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before storage
- Follow OWASP security guidelines

## Review Process

- Maintainers will review your PR within 3-5 days
- Feedback will be constructive and specific
- Multiple reviewers may provide input
- Approval requires at least one maintainer review
- CI/CD checks must pass before merging

## Getting Help

- **Questions:** Open a discussion on GitHub
- **Bugs:** Open an issue with detailed reproduction steps
- **Features:** Discuss in issues before implementing
- **Chat:** Join our community (link in README)

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to FastFitHub AI! 🙏
