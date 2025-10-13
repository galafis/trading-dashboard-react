# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[galafis@github.com]**. You will receive a response from us within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

### What to Include in Your Report

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Security Best Practices

When using this dashboard in production:

1. **API Security**: Always use HTTPS for API communications
2. **Authentication**: Implement proper authentication and authorization
3. **WebSocket Security**: Use WSS (WebSocket Secure) instead of WS
4. **Environment Variables**: Never commit sensitive data like API keys
5. **CORS**: Configure CORS properly on your backend
6. **Content Security Policy**: Implement CSP headers
7. **Regular Updates**: Keep dependencies up to date
8. **Input Validation**: Validate all user inputs
9. **Rate Limiting**: Implement rate limiting on your API endpoints
10. **Monitoring**: Monitor for suspicious activities

### Dependencies

We regularly update dependencies to address security vulnerabilities. Run `npm audit` to check for known vulnerabilities in dependencies and `npm audit fix` to automatically install compatible updates.

### Secure Configuration Example

```typescript
// Example secure WebSocket connection
const wsUrl = process.env.REACT_APP_WS_URL || 'wss://secure-api.example.com/ws';

// Example with authentication token
const ws = new WebSocket(wsUrl, {
  headers: {
    'Authorization': `Bearer ${authToken}`
  }
});
```

## Disclosure Policy

We follow a coordinated disclosure policy:
1. Report is received and assigned a primary handler
2. Problem is confirmed and affected versions are determined
3. Code is audited to find any similar problems
4. Fixes are prepared for all supported releases
5. On the disclosure date, changes are pushed and announcements are made
