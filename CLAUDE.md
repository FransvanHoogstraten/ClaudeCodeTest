# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ENGI finance - A Finance Operations Dashboard for CFO-as-a-Service. This is a fully interactive HTML/CSS/JavaScript mockup that helps manage financial operations, track monthly close processes, monitor software stack status, and handle approvals.

## Running the Application

```bash
# Open in default browser
open index.html
```

Or simply drag `index.html` into your web browser.

## Code Architecture

### Structure
- `index.html` - Main HTML structure with dashboard layout, navigation, and all UI components
- `styles.css` - Modern minimal styling with CSS variables for theming, responsive design
- `script.js` - Interactive functionality (tab navigation, filters, approvals, cash flow diagram)

### Key Features
- **Structure Maps**: Cash flow and data flow visualizations
- **Software Stack Status**: Real-time operational status for financial tools (NetSuite, Bill.com, Stripe, etc.)
- **Monthly Close Checklist**: Interactive task tracking with progress indicators
- **Issues & Blockers**: Priority-based issue tracker
- **Pending Approvals**: Human-in-the-loop approval queue

### Design System
- Primary: Blue (#0066FF)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Danger: Red (#EF4444)
- CSS variables defined at top of `styles.css` for easy theming

### Key Design Points
- Static mockup with no backend - all data is in HTML
- Sidebar navigation with collapsible state persisted to localStorage
- Tab-based content switching via JavaScript
- Responsive layout for mobile, tablet, and desktop
