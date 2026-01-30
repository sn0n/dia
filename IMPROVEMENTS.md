# Future Improvements

This document tracks potential improvements and optimizations for the Dia project.

## High Priority

### Code Quality

- [ ] **Remove unused imports and variables** (TypeScript TS6133 warnings)
  - `Link` and `useParams` in `src/App.tsx`
  - Unused `title` parameters in various components
  - Remove unused `isLinear` in `src/pages/DiagramDetail.tsx`

- [ ] **Add TypeScript type declarations**
  - Add `@types/wavedrom` or create custom type declaration
  - Ensure all imports have proper types

### Security

- [ ] **Update dependencies with security patches**
  - Monitor for lodash updates (>4.17.21) that fix prototype pollution
  - Track Prisma updates that include hono fixes
  - Consider alternatives if upstream packages don't update
  - Run `npm audit` regularly

### Performance

- [ ] **Implement dynamic imports for diagram types**
  - Load Mermaid only when needed
  - Load Graphviz (viz.js) on-demand
  - Split by diagram type for smaller initial bundle

- [ ] **Further code splitting**
  - Split AI workflows from main bundle
  - Lazy load detail pages
  - Consider route-based code splitting

- [ ] **Optimize viz.js bundle** (currently 1.4MB)
  - Investigate lighter Graphviz alternatives
  - Consider using CDN for viz.js
  - Add option to disable Graphviz for smaller builds

## Medium Priority

### Features

- [ ] **Enhanced search functionality**
  - Fuzzy search for better matching
  - Search by tags and categories
  - Autocomplete suggestions
  - Search within diagram descriptions

- [ ] **Export capabilities**
  - Export diagrams as PNG
  - Export diagrams as SVG
  - Export diagrams as PDF
  - Batch export all diagrams

- [ ] **More themes**
  - Light mode variants
  - High contrast mode
  - Custom theme builder
  - User preference persistence

- [ ] **Filtering improvements**
  - Multi-select filters
  - Filter by complexity
  - Filter by diagram type (Mermaid, Graphviz, etc.)
  - Recently viewed diagrams

### Accessibility

- [ ] **Keyboard navigation**
  - Arrow key navigation for diagram grid
  - Tab navigation improvements
  - Keyboard shortcuts for common actions

- [ ] **ARIA improvements**
  - Add ARIA labels to all interactive elements
  - Improve screen reader support
  - Add skip navigation links
  - Semantic HTML improvements

- [ ] **Focus management**
  - Visible focus indicators
  - Focus trap in modals/dialrams
  - Return focus on dialog close

### Testing

- [ ] **Unit tests**
  - Test React components
  - Test data parsing functions
  - Test diagram rendering logic

- [ ] **Integration tests**
  - Test API endpoints
  - Test search functionality
  - Test routing and navigation

- [ ] **E2E tests**
  - Test full user workflows
  - Test on different browsers
  - Test responsive design

### Documentation

- [ ] **API usage examples**
  - JavaScript fetch examples
  - Python requests examples
  - cURL examples
  - Integration examples with popular frameworks

- [ ] **Video tutorials**
  - How to add workflows
  - How to customize themes
  - How to deploy

- [ ] **Architecture documentation**
  - Component hierarchy
  - Data flow diagrams
  - Build process documentation

## Low Priority

### Nice to Have

- [ ] **PWA support**
  - Service worker for true offline
  - Install as app
  - Offline caching strategy
  - Background sync

- [ ] **Social features**
  - Share diagrams via URL
  - Generate shareable images
  - Embed code for external sites

- [ ] **Analytics**
  - Popular diagrams tracking (privacy-friendly)
  - Usage statistics
  - Performance metrics

- [ ] **Internationalization**
  - Support for multiple languages
  - Translated diagram descriptions
  - RTL support

### Optimizations

- [ ] **Image optimization**
  - Optimize assets and icons
  - Use WebP format where supported
  - Lazy load images

- [ ] **Bundle size**
  - Remove unused CSS (PurgeCSS)
  - Tree-shake dependencies
  - Minify JSON data

- [ ] **Caching strategy**
  - Add cache headers documentation
  - Service worker for API responses
  - Local storage for preferences

## Technical Debt

### Cleanup

- [ ] **Remove legacy Prisma code**
  - Remove Prisma dependencies if not needed
  - Clean up database-related scripts
  - Remove unused database configuration

- [ ] **Consolidate documentation**
  - Merge overlapping docs
  - Remove outdated information
  - Standardize formatting

- [ ] **Improve file organization**
  - Better component structure
  - Separate utilities from components
  - Consistent naming conventions

### Refactoring

- [ ] **Extract common logic**
  - Shared diagram rendering logic
  - Common UI patterns
  - Reusable hooks

- [ ] **Improve type safety**
  - Stricter TypeScript config
  - Remove `any` types
  - Add runtime type validation

- [ ] **Better error handling**
  - Error boundaries
  - Better error messages
  - Fallback UI improvements

## Recently Completed ✅

- [x] Added `.gitignore` patterns for timestamp config files
- [x] Removed committed temporary files
- [x] Fixed TypeScript configuration (src vs app)
- [x] Added SECURITY.md documentation
- [x] Added CONTRIBUTING.md guidelines
- [x] Added MIT LICENSE file
- [x] Improved package.json metadata
- [x] Added build optimization with manual chunks
- [x] Updated README with links to new documentation

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to these improvements!

## Tracking

- Last Updated: 2026-01-30
- Priority levels: High (within 1-2 weeks), Medium (1-3 months), Low (future)
