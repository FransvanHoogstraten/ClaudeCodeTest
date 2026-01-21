// ENGI finance JavaScript - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarToggle();
    initializeTabs();
    initializeSubTabs();
    initializeFilters();
    initializeApprovalButtons();
    initializeProcessExpand();
    initializeMatrixCells();
    initializeCashFlowDiagram();
    initializeAlternativesToggle();
});

// Sidebar Toggle Functionality
function initializeSidebarToggle() {
    const toggleButton = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar-navigation');

    // Check localStorage for saved state
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    if (sidebarState === 'true') {
        sidebar.classList.add('collapsed');
        toggleButton.classList.add('active');
    }

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        toggleButton.classList.toggle('active');

        // Save state to localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
}

// Sidebar Navigation System
function initializeTabs() {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Check URL hash for active tab on page load
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash) {
        const hashButton = document.querySelector(`.sidebar-button[data-tab="${hash}"]`);
        if (hashButton) {
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            hashButton.classList.add('active');
            document.getElementById(hash).classList.add('active');
        }
    }

    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Update URL hash
            window.location.hash = targetTab;

            // Scroll to top of page
            window.scrollTo(0, 0);
            const mainContent = document.querySelector('.main-content');
            if (mainContent) mainContent.scrollTop = 0;
        });
    });

    // Listen for hash changes (browser back/forward buttons)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const hashButton = document.querySelector(`.sidebar-button[data-tab="${hash}"]`);
            if (hashButton) {
                sidebarButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                hashButton.classList.add('active');
                document.getElementById(hash).classList.add('active');

                // Scroll to top of page
                window.scrollTo(0, 0);
                const mainContent = document.querySelector('.main-content');
                if (mainContent) mainContent.scrollTop = 0;
            }
        }
    });
}

// Sub-tab Navigation System
function initializeSubTabs() {
    const subTabButtons = document.querySelectorAll('.sub-tab');
    const subTabContents = document.querySelectorAll('.sub-tab-content');

    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSubTab = button.getAttribute('data-subtab');

            // Remove active class from all sub-tab buttons and contents
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            subTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetSubTab).classList.add('active');
        });
    });
}

// Task Checkbox Functionality
function initializeTaskCheckboxes() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');

            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }

            // Update progress bar and counts
            updateMonthlyCloseProgress();
        });
    });
}

// Update Monthly Close Progress
function updateMonthlyCloseProgress() {
    const allCheckboxes = document.querySelectorAll('#monthly-close .task-checkbox');
    const checkedCheckboxes = document.querySelectorAll('#monthly-close .task-checkbox:checked');

    const total = allCheckboxes.length;
    const completed = checkedCheckboxes.length;
    const percentage = Math.round((completed / total) * 100);

    // Update progress bar
    const progressFill = document.querySelector('#monthly-close .progress-fill');
    const progressText = document.querySelector('#monthly-close .progress-text');

    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${percentage}% Complete (${completed}/${total} tasks)`;
    }

    // Update task group counts
    const taskGroups = document.querySelectorAll('.task-group');
    taskGroups.forEach(group => {
        const groupCheckboxes = group.querySelectorAll('.task-checkbox');
        const groupChecked = group.querySelectorAll('.task-checkbox:checked');
        const groupCount = group.querySelector('.task-count');

        if (groupCount) {
            groupCount.textContent = `${groupChecked.length}/${groupCheckboxes.length} completed`;
        }
    });
}

// Filter Functionality for Issues Table
function initializeFilters() {
    initializeIssuesDropdowns();
    initializeIssuesSearch();
    initializeIssuesTableFiltering();
}

// Initialize dropdown toggle functionality
function initializeIssuesDropdowns() {
    const dropdownButtons = document.querySelectorAll('.issues-dropdown-btn');

    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.closest('.issues-dropdown');

            // Close other dropdowns
            document.querySelectorAll('.issues-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('open');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('open');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.issues-dropdown')) {
            document.querySelectorAll('.issues-dropdown').forEach(d => {
                d.classList.remove('open');
            });
        }
    });

    // Add change listeners to checkboxes for filtering
    const checkboxes = document.querySelectorAll('.issues-dropdown-menu input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterIssuesTable();
        });
    });
}

// Initialize search functionality
function initializeIssuesSearch() {
    const searchInput = document.getElementById('issuesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterIssuesTable();
        });
    }
}

// Initialize table filtering
function initializeIssuesTableFiltering() {
    // Initial filter application
    filterIssuesTable();
}

// Filter issues table based on current selections
function filterIssuesTable() {
    const tableRows = document.querySelectorAll('.issues-table tbody tr');
    const searchInput = document.getElementById('issuesSearchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    // Get selected filters
    const selectedStatuses = getSelectedValues('statusDropdown');
    const selectedPriorities = getSelectedValues('priorityDropdown');
    const selectedSystems = getSelectedValues('systemDropdown');

    let visibleCount = 0;

    tableRows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        const rowPriority = row.getAttribute('data-priority');
        const rowSystem = row.getAttribute('data-system');
        const rowText = row.textContent.toLowerCase();

        // Check if row matches all filters
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(rowStatus);
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(rowPriority);
        const matchesSystem = selectedSystems.length === 0 || selectedSystems.includes(rowSystem);
        const matchesSearch = searchTerm === '' || rowText.includes(searchTerm);

        if (matchesStatus && matchesPriority && matchesSystem && matchesSearch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // Update pagination info
    updatePaginationInfo(visibleCount);
}

// Get selected checkbox values from a dropdown
function getSelectedValues(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return [];

    const checkedBoxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkedBoxes).map(cb => cb.value);
}

// Update pagination info text
function updatePaginationInfo(count) {
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        if (count === 0) {
            paginationInfo.textContent = 'No issues found';
        } else if (count === 1) {
            paginationInfo.textContent = 'Showing 1 of 1 issue';
        } else {
            paginationInfo.textContent = `Showing 1-${count} of ${count} issues`;
        }
    }
}

// Approval Button Actions
function initializeApprovalButtons() {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');

    approveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const title = row.querySelector('.col-summary').textContent;

            if (confirm(`Are you sure you want to approve: ${title}?`)) {
                row.style.opacity = '0.5';
                row.style.pointerEvents = 'none';

                // Show success message
                showNotification('Approval submitted successfully', 'success');

                // Update badge count after animation
                setTimeout(() => {
                    updateApprovalBadge();
                    row.remove();
                }, 500);
            }
        });
    });

    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const title = row.querySelector('.col-summary').textContent;

            const reason = prompt('Please provide a reason for rejection:');
            if (reason) {
                row.style.opacity = '0.5';
                row.style.pointerEvents = 'none';

                showNotification('Rejection submitted', 'warning');

                setTimeout(() => {
                    updateApprovalBadge();
                    row.remove();
                }, 500);
            }
        });
    });
}

// Update Approval Badge Count
function updateApprovalBadge() {
    const remainingApprovals = document.querySelectorAll('.approvals-table tbody tr').length;
    const badge = document.querySelector('[data-tab="approvals"] .tab-badge');

    if (badge) {
        badge.textContent = remainingApprovals;

        // Hide badge if no approvals left
        if (remainingApprovals === 0) {
            badge.style.display = 'none';
        }
    }
}

// Process Box Expand/Collapse Functionality
function initializeProcessExpand() {
    const expandButtons = document.querySelectorAll('.process-expand');

    expandButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const processBox = this.closest('.process-box');
            const processDetails = processBox.querySelector('.process-details');

            // Close other expanded boxes first
            document.querySelectorAll('.process-box.expanded').forEach(box => {
                if (box !== processBox) {
                    box.classList.remove('expanded');
                    const details = box.querySelector('.process-details');
                    if (details) {
                        details.style.display = 'none';
                    }
                }
            });

            // Toggle current box
            if (processBox.classList.contains('expanded')) {
                processBox.classList.remove('expanded');
                if (processDetails) {
                    processDetails.style.display = 'none';
                }
                this.textContent = '+';
            } else {
                processBox.classList.add('expanded');
                if (processDetails) {
                    processDetails.style.display = 'block';
                }
                this.textContent = '−';
            }
        });
    });

    // Also allow clicking the whole box to expand (except when clicking the button)
    const processBoxes = document.querySelectorAll('.process-box');
    processBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Only trigger if not clicking the button itself
            if (!e.target.closest('.process-expand')) {
                const btn = this.querySelector('.process-expand');
                if (btn) {
                    btn.click();
                }
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#0066FF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Matrix Cell Click Functionality
function initializeMatrixCells() {
    const statusIndicators = document.querySelectorAll('.status-indicator');
    const modal = document.getElementById('taskModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Task data map
    const taskData = {
        'ap-review-invoices': {
            name: 'Review and approve all vendor invoices',
            owner: 'Finance Team',
            dueDay: 'Day 5',
            notes: 'Review all vendor invoices for accuracy and approval workflow completion.'
        },
        'ap-payment-runs': {
            name: 'Process payment runs',
            owner: 'Finance Team',
            dueDay: 'Day 10',
            notes: 'Execute payment batches for approved vendor invoices.'
        },
        'ap-aging': {
            name: 'Reconcile AP aging report',
            owner: 'Accounting Team',
            dueDay: 'Day 28',
            notes: 'Review AP aging report and reconcile discrepancies.'
        },
        'ar-invoices': {
            name: 'Generate and send invoices',
            owner: 'Collections Team',
            dueDay: 'Day 1',
            notes: 'Generate customer invoices and send for payment.'
        },
        'ar-payments': {
            name: 'Record customer payments',
            owner: 'Collections Team',
            dueDay: 'Day 26',
            notes: 'Record and apply all customer payments received.'
        },
        'ar-aging': {
            name: 'Review AR aging report',
            owner: 'Collections Team',
            dueDay: 'Day 30',
            notes: 'Analyze AR aging and identify collection risks.'
        },
        'gl-entries': {
            name: 'Post all journal entries',
            owner: 'Controller',
            dueDay: 'Day 27',
            notes: 'Post all journal entries for the month.'
        },
        'gl-accruals': {
            name: 'Record month-end accruals',
            owner: 'Controller',
            dueDay: 'Day 29',
            notes: 'Record accruals for prepaid expenses and deferred revenue.'
        },
        'gl-review': {
            name: 'Review GL account balances',
            owner: 'Controller',
            dueDay: 'Day 30',
            notes: 'Review GL for anomalies and unusual balances.'
        },
        'bank-download': {
            name: 'Download bank statements',
            owner: 'Accounting Team',
            dueDay: 'Day 27',
            notes: 'Download all bank statements for reconciliation.'
        },
        'bank-operating': {
            name: 'Reconcile operating account',
            owner: 'Accounting Team',
            dueDay: 'Day 29',
            notes: 'Reconcile main operating bank account.'
        },
        'report-pl': {
            name: 'Generate P&L',
            owner: 'CFO',
            dueDay: 'Day 28',
            notes: 'Generate preliminary profit & loss statement.'
        },
        'report-bs': {
            name: 'Generate Balance Sheet',
            owner: 'CFO',
            dueDay: 'Day 29',
            notes: 'Generate preliminary balance sheet.'
        },
        'report-cf': {
            name: 'Prepare cash flow statement',
            owner: 'CFO',
            dueDay: 'Day 30',
            notes: 'Prepare statement of cash flows.'
        },
        'report-mgmt': {
            name: 'Management reporting package',
            owner: 'CFO',
            dueDay: 'Day 31 + 3',
            notes: 'Prepare comprehensive management reporting package.'
        }
    };

    const monthNames = {
        'jan': 'January 2025',
        'feb': 'February 2025',
        'mar': 'March 2025',
        'apr': 'April 2025',
        'may': 'May 2025',
        'jun': 'June 2025',
        'jul': 'July 2025',
        'aug': 'August 2025',
        'sep': 'September 2025',
        'oct': 'October 2025',
        'nov': 'November 2025',
        'dec': 'December 2025'
    };

    statusIndicators.forEach(indicator => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();

            const taskId = this.getAttribute('data-task');
            const month = this.getAttribute('data-month');
            const status = this.classList.contains('complete') ? 'Complete' :
                          this.classList.contains('in-progress') ? 'In Progress' :
                          this.classList.contains('blocked') ? 'Blocked' :
                          'Not Started';

            const task = taskData[taskId];
            const monthName = monthNames[month];

            if (task) {
                modalTitle.textContent = task.name;

                let statusClass = status.toLowerCase().replace(' ', '-');
                let statusColor = status === 'Complete' ? '#10B981' :
                                 status === 'In Progress' ? '#F59E0B' :
                                 status === 'Blocked' ? '#EF4444' :
                                 '#9CA3AF';

                modalBody.innerHTML = `
                    <div class="modal-info-row">
                        <span class="modal-label">Month:</span>
                        <span class="modal-value">${monthName}</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-label">Status:</span>
                        <span class="modal-value modal-status">
                            <span style="width: 12px; height: 12px; border-radius: 50%; background: ${statusColor}; display: inline-block;"></span>
                            ${status}
                        </span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-label">Owner:</span>
                        <span class="modal-value">${task.owner}</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-label">Due:</span>
                        <span class="modal-value">${task.dueDay}</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-label">Notes:</span>
                        <span class="modal-value">${task.notes}</span>
                    </div>
                `;

                modal.classList.add('active');
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Cash Flow Diagram Functions
function initializeCashFlowDiagram() {
    // Generate SVG connections
    generateFlowConnections();

    // Initialize node interactions
    initializeFlowNodeInteractions();
}

function generateFlowConnections() {
    const svg = document.querySelector('.flow-connections');
    if (!svg) return;

    // Define connection paths with coordinates
    // Format: { from: [x, y], to: [x, y], type: 'cash-in' or 'cash-out' }
    const connections = [
        // Cash inflows (sources to bank)
        // Customer Payments (100+180=280, 80+35=115) to Bank (500, 220+60=280)
        { from: [280, 115], to: [500, 280], type: 'cash-in' },

        // New Revenue (280, 220+35=255) to Bank (500, 280)
        { from: [280, 255], to: [500, 280], type: 'cash-in' },

        // Other Income (280, 360+35=395) to Bank (500, 280)
        { from: [280, 395], to: [500, 280], type: 'cash-in' },

        // Cash outflows (bank to uses)
        // Bank (500+220=720, 220+25=245) to Vendor Payments (900, 60+35=95)
        { from: [720, 245], to: [900, 95], type: 'cash-out' },

        // Bank (720, 280) to Payroll (900, 180+35=215)
        { from: [720, 280], to: [900, 215], type: 'cash-out' },

        // Bank (720, 315) to Operating Expenses (900, 300+35=335)
        { from: [720, 315], to: [900, 335], type: 'cash-out' },

        // Bank (720, 350) to Capital Expenditures (900, 420+35=455)
        { from: [720, 350], to: [900, 455], type: 'cash-out' }
    ];

    // Create SVG path elements
    connections.forEach((conn, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Calculate control points for Bezier curve
        const x1 = conn.from[0];
        const y1 = conn.from[1];
        const x2 = conn.to[0];
        const y2 = conn.to[1];

        // Use horizontal control points for smooth curve
        const cx1 = x1 + (x2 - x1) * 0.5;
        const cy1 = y1;
        const cx2 = x1 + (x2 - x1) * 0.5;
        const cy2 = y2;

        // Create path with cubic Bezier curve
        const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

        path.setAttribute('d', d);
        path.setAttribute('class', `flow-path ${conn.type}`);

        svg.appendChild(path);
    });
}

function initializeFlowNodeInteractions() {
    const flowNodes = document.querySelectorAll('.flow-node');
    const modal = document.getElementById('taskModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modal) return;

    // Define detailed data for each node
    const nodeDetails = {
        'customer-payments': {
            title: 'Customer Payments',
            amount: '+$650K',
            breakdown: [
                { label: 'AR Collections', amount: '$420K' },
                { label: 'Credit Card Payments', amount: '$180K' },
                { label: 'Wire Transfers', amount: '$50K' }
            ],
            notes: 'Cash received from customers for outstanding invoices and new sales.'
        },
        'new-revenue': {
            title: 'New Revenue',
            amount: '+$320K',
            breakdown: [
                { label: 'Subscription Revenue', amount: '$180K' },
                { label: 'Service Revenue', amount: '$100K' },
                { label: 'Product Sales', amount: '$40K' }
            ],
            notes: 'New cash from current month sales and subscriptions.'
        },
        'other-income': {
            title: 'Other Income',
            amount: '+$150K',
            breakdown: [
                { label: 'Interest Income', amount: '$50K' },
                { label: 'Refunds & Rebates', amount: '$60K' },
                { label: 'Miscellaneous', amount: '$40K' }
            ],
            notes: 'Non-operating cash inflows including interest and refunds.'
        },
        'vendor-payments': {
            title: 'Vendor Payments',
            amount: '-$480K',
            breakdown: [
                { label: 'Supplier Invoices', amount: '$320K' },
                { label: 'Service Providers', amount: '$100K' },
                { label: 'Utilities', amount: '$60K' }
            ],
            notes: 'Payments to vendors for goods and services received.'
        },
        'payroll': {
            title: 'Payroll',
            amount: '-$320K',
            breakdown: [
                { label: 'Salaries & Wages', amount: '$250K' },
                { label: 'Benefits', amount: '$50K' },
                { label: 'Payroll Taxes', amount: '$20K' }
            ],
            notes: 'Employee compensation including salaries, benefits, and payroll taxes.'
        },
        'operating-expenses': {
            title: 'Operating Expenses',
            amount: '-$200K',
            breakdown: [
                { label: 'Rent', amount: '$80K' },
                { label: 'Software & Tools', amount: '$70K' },
                { label: 'Marketing', amount: '$50K' }
            ],
            notes: 'General operating expenses including rent, software, and marketing.'
        },
        'capital-expenditures': {
            title: 'Capital Expenditures',
            amount: '-$150K',
            breakdown: [
                { label: 'Equipment Purchases', amount: '$100K' },
                { label: 'Infrastructure', amount: '$50K' }
            ],
            notes: 'Investments in long-term assets and infrastructure.'
        },
        'bank-account': {
            title: 'Bank Account',
            amount: 'Net Change: -$30K',
            breakdown: [
                { label: 'Starting Balance', amount: '$2.1M' },
                { label: 'Total Cash In', amount: '+$1,120K' },
                { label: 'Total Cash Out', amount: '-$1,150K' },
                { label: 'Ending Balance', amount: '$2.07M' }
            ],
            notes: 'Main operating account showing cash flow for the month.'
        }
    };

    // Add click handlers to all flow nodes
    flowNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            const nodeId = this.getAttribute('data-node');
            const details = nodeDetails[nodeId];

            if (!details) return;

            // Set modal title
            modalTitle.textContent = details.title;

            // Build modal content
            let breakdownHTML = details.breakdown.map(item =>
                `<div class="modal-info-row">
                    <span class="modal-label">${item.label}:</span>
                    <span class="modal-value">${item.amount}</span>
                </div>`
            ).join('');

            modalBody.innerHTML = `
                <div class="modal-info-row">
                    <span class="modal-label">Amount:</span>
                    <span class="modal-value" style="font-weight: 700; font-size: 1.25rem;">${details.amount}</span>
                </div>
                <div style="margin: var(--spacing-md) 0; padding-top: var(--spacing-md); border-top: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-size-sm); font-weight: 600; margin-bottom: var(--spacing-sm); color: var(--text-primary);">Breakdown</h4>
                    ${breakdownHTML}
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Notes:</span>
                    <span class="modal-value">${details.notes}</span>
                </div>
            `;

            // Show modal
            modal.classList.add('active');
        });
    });
}

// Software Stack Alternatives Toggle
function initializeAlternativesToggle() {
    const toggleButtons = document.querySelectorAll('.show-alternatives-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.stack-category-card');
            const alternativesTbody = card.querySelector('.alternatives-tbody');

            if (alternativesTbody) {
                alternativesTbody.classList.toggle('visible');
                this.classList.toggle('expanded');

                // Update button text
                if (alternativesTbody.classList.contains('visible')) {
                    this.innerHTML = 'Hide alternatives <span class="arrow">▲</span>';
                } else {
                    this.innerHTML = 'Show alternatives <span class="arrow">▼</span>';
                }
            }
        });
    });
}

// Console welcome message
console.log('%c ENGI finance ', 'background: #0066FF; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;');
console.log('Interactive prototype loaded successfully!');
