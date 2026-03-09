# Changelog - CVPORT Improvements

All notable changes from the original portfolio are documented here.

## [2.0.0] - 2026-02-20

### 🔴 Critical Fixes
- Fixed API env variable from `process.env.API_KEY` to `import.meta.env.VITE_API_KEY`
- Fixed Gemini model name from `gemini-3-flash-preview` to `gemini-1.5-flash`
- Fixed inconsistent bug count in experience (now consistently "120+ bugs")
- Fixed education date from October 2025 to October 2024

### 🛡️ Type Safety
- Added `id` fields to all data interfaces (Experience, Education, Project, Skill)
- Added `NavItem`, `SkillChartData`, `TooltipPayloadItem` types
- Added `ApiError` type for better error handling
- Removed all `any` types from components

### ⚡ Performance
- Added `useMemo` for chart data transformation
- Added `useMemo` for `mailtoLink` generation
- Added `useCallback` for `scrollToSection` handler
- Used `requestAnimationFrame` for smoother scrolling
- Made scroll listener passive for better performance

### ♿ Accessibility (A11y)
- Added ARIA labels to all icon-only buttons
- Added ARIA roles: `navigation`, `tablist`, `tabpanel`, `dialog`, `log`
- Added `aria-current` for active navigation items
- Added `aria-expanded` for toggle buttons
- Added `aria-live="polite"` for chat messages
- Added `aria-label` for project cards and social links
- Added `aria-modal` for modal dialog

### 💾 Data Persistence
- Added localStorage persistence for chat messages
- Chat history survives page refresh (within 24 hours)
- Added message timestamp tracking
- Limited stored messages to prevent storage bloat

### 🎯 User Experience
- Added message cooldown (1.5s between sends) to prevent spam
- Added Escape key support to close chat, modal, and mobile menu
- Added auto-resizing textarea for chat input
- Added character count indicator
- Added clear chat button with confirmation
- Added loading spinner animation
- Added empty state for skills chart

### 📁 Code Organization
- Extracted `NAV_ITEMS` array for DRY navigation
- Extracted `Z_INDEX` constants for maintainability
- Extracted `SCROLL_OFFSET` and `SCROLLspy_OFFSET` constants
- Added `STORAGE_KEYS` for localStorage key management
- Added `CHAT_CONFIG` for chat settings

### 🔧 Error Handling
- Added API timeout with `AbortController` (15 seconds)
- Added specific error messages for different failure types:
  - Timeout errors
  - API key errors
  - Rate limit errors
  - Network errors
- Added client-side message length validation

### 🎨 UI Enhancements
- Added legend to skills chart
- Added category-based color coding to chart
- Added clear chat button to CareerBot header
- Improved error message styling with emoji icons

### 📚 Documentation
- Created comprehensive README with migration notes
- Documented security considerations
- Added inline comments explaining improvements

---

## Original Project
- Initial portfolio for Game Tester to Data Analyst transition
- Built with React, Vite, TypeScript, Tailwind CSS
- Features: AI Career Bot, Interactive Skills Radar, Project Case Studies
