# Contributing to Dia

Thank you for your interest in contributing to Dia! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Issues

- Check existing issues before creating a new one
- Provide clear description and reproduction steps
- Include relevant error messages and screenshots
- Mention your environment (browser, OS, Node version)

### Suggesting Enhancements

- Describe the enhancement clearly
- Explain the use case and benefits
- Consider backwards compatibility

### Adding Workflows/Diagrams

1. **Linear or Non-Linear Workflows**: Edit `src/data/workflows.ts`
   ```typescript
   "Workflow Name|Step 1 → Step 2 → Step 3|Category"
   ```

2. **AI Workflows**: Edit `src/data/ai-workflows.ts`
   ```typescript
   "AI Workflow Name|Step 1 → Step 2|Category"
   ```

3. **Advanced Diagrams**: Add to `complexWorkflows` or `aiComplexWorkflows`
   ```typescript
   "Workflow Name": {
     code: `graph TD\n  A --> B`,
     source: "mermaid" // or "graphviz", "plantuml", etc.
   }
   ```

4. **Regenerate API**:
   ```bash
   npm run generate:api
   ```

### Pull Request Process

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/dia.git
   cd dia
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Keep changes focused and minimal
   - Test your changes locally
   - Update documentation if needed

4. **Test Locally**
   ```bash
   npm run dev        # Test in development
   npm run build      # Verify production build
   npm run preview    # Test production build
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: brief description of changes"
   ```

   Use conventional commit messages:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` formatting, missing semicolons, etc.
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance tasks

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

7. **PR Description**
   - Describe what changes you made
   - Explain why the changes are needed
   - Reference related issues (e.g., "Fixes #123")
   - Include screenshots for UI changes

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate API endpoints
npm run generate:api
```

### Project Structure

```
dia/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── data/          # Workflow definitions
│   ├── App.tsx        # Main app with routing
│   └── main.tsx       # Entry point
├── scripts/
│   └── generate-api.js # API generator
├── public/
│   └── v1/            # Generated API files
└── dist/              # Production build
```

### Coding Standards

- **TypeScript**: Use TypeScript with strict mode
- **Formatting**: 2-space indentation
- **React**: Use functional components with hooks
- **Naming**: Use descriptive names (camelCase for variables, PascalCase for components)
- **Comments**: Add comments for complex logic only
- **Imports**: Group imports (React, libraries, local)

### Testing

```bash
# Run diagram rendering tests
npm run test:diagrams
```

- Test new workflows render correctly
- Verify all diagram types work (Mermaid, Graphviz, etc.)
- Check responsive design on different screen sizes
- Test offline functionality

### Building

```bash
# Production build
npm run build

# Check build output
ls -lh dist/
```

The build should:
- Generate optimized static files in `dist/`
- Include all assets and API endpoints
- Be ready for deployment

## What to Contribute

### High Priority

- 🐛 Bug fixes
- 📝 Documentation improvements
- ♿ Accessibility enhancements
- 🔍 Search functionality improvements
- 📱 Mobile responsiveness fixes

### Medium Priority

- ➕ New workflows/diagrams (with proper documentation)
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Additional tests

### Ideas for Contributions

1. **Add New Workflows**: Science, Health, Finance, Education domains
2. **Improve Search**: Add fuzzy search, filters, autocomplete
3. **Enhance Rendering**: Support more diagram types
4. **Optimize Performance**: Code splitting, lazy loading
5. **Improve Accessibility**: ARIA labels, keyboard navigation
6. **Add Themes**: More color schemes and themes
7. **Export Features**: PDF, PNG, SVG export for diagrams
8. **Analytics**: Usage stats, popular workflows

## Security

Please see [SECURITY.md](SECURITY.md) for:
- Reporting security vulnerabilities
- Known security issues
- Security best practices

## Questions?

- 📖 Check existing documentation
- 🐛 Search existing issues
- 💬 Open a discussion on GitHub
- 📧 Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for contributing to Dia! 🎉**
