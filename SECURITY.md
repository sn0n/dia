# Security Policy

## Known Vulnerabilities

This document tracks known security vulnerabilities in project dependencies.

### Current Status (Last Updated: 2026-01-30)

**12 moderate severity vulnerabilities** identified in development dependencies:

#### Affected Packages

1. **hono** (<=4.11.6) - via Prisma dependencies
   - XSS vulnerability through ErrorBoundary component
   - Arbitrary Key Read in Serve static Middleware
   - Cache middleware ignores "Cache-Control: private"
   - IPv4 address validation bypass in IP Restriction Middleware
   - **Impact**: Low - Hono is only used indirectly through Prisma dev tools
   - **Status**: Awaiting upstream Prisma update

2. **lodash** (4.0.0 - 4.17.21) - via chevrotain/langium/mermaid chain
   - Prototype Pollution in `_.unset` and `_.omit` functions
   - **Impact**: Low - Used in diagram parsing (mermaid.js) only
   - **Status**: Awaiting upstream mermaid.js update

3. **lodash-es** (4.0.0 - 4.17.22) - via langium
   - Prototype Pollution in `_.unset` and `_.omit` functions
   - **Impact**: Low - Used in diagram parsing only
   - **Status**: Awaiting upstream langium update

### Risk Assessment

All identified vulnerabilities are in **development and build-time dependencies** used for:
- Database tooling (Prisma - legacy, not actively used)
- Diagram parsing and rendering (Mermaid.js)
- Development tooling

**Runtime Risk: MINIMAL** - The application is a static site with no user input processing for the affected components.

### Mitigation Strategy

1. ✅ **Static Site Architecture**: The app generates static files with no backend
2. ✅ **No User Input**: Diagrams are pre-defined, not user-generated
3. ✅ **Offline First**: No external API calls that could be exploited
4. ✅ **CSP Ready**: Content Security Policy can be applied at hosting level
5. ⏳ **Monitoring**: Track upstream package updates for fixes
6. ⏳ **Regular Audits**: Run `npm audit` with each dependency update

### Recommended Actions

```bash
# Check for updates periodically
npm audit

# For breaking changes (use with caution)
# npm audit fix --force
```

**Note**: Running `npm audit fix --force` would install Prisma 6.19.2 (breaking change from 7.3.0). Since Prisma is legacy and not actively used in the current static site implementation, we're deferring this change.

### Reporting Security Issues

If you discover a security vulnerability in this project, please email the maintainer or open a GitHub Security Advisory.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Best Practices for Users

When deploying this static site:

1. **Enable HTTPS**: Always serve over HTTPS
2. **Set CSP Headers**: Configure Content-Security-Policy headers
3. **Enable CORS appropriately**: If using the API, set proper CORS headers
4. **Keep dependencies updated**: Regularly run `npm audit` and update packages
5. **Review hosting security**: Use reputable static hosting with DDoS protection

## Update History

- **2026-01-30**: Initial security audit completed
  - 12 moderate vulnerabilities identified
  - All in dev dependencies with minimal runtime risk
  - Documented mitigation strategy
