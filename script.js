// CFO Platform JavaScript - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSubTabs();
    initializeFilters();
    initializeApprovalButtons();
    initializeProcessExpand();
    initializeMatrixCells();
});

// Sidebar Navigation System
function initializeTabs() {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const tabContents = document.querySelectorAll('.tab-content');

    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
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

// Filter Functionality for Issues
function initializeFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const issueCards = document.querySelectorAll('.issue-card');

    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));

            // Add active class to clicked chip
            this.classList.add('active');

            // Get filter text
            const filterText = this.textContent.toLowerCase();

            // Filter issues
            issueCards.forEach(card => {
                if (filterText.includes('all')) {
                    card.style.display = 'block';
                } else if (filterText.includes('critical') && card.classList.contains('critical')) {
                    card.style.display = 'block';
                } else if (filterText.includes('high') && card.classList.contains('high')) {
                    card.style.display = 'block';
                } else if (filterText.includes('medium') && card.classList.contains('medium')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Approval Button Actions
function initializeApprovalButtons() {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    const reviewButtons = document.querySelectorAll('.review-btn');

    approveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.approval-card');
            const title = card.querySelector('.approval-title').textContent;

            if (confirm(`Are you sure you want to approve: ${title}?`)) {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';

                // Show success message
                showNotification('Approval submitted successfully', 'success');

                // Update badge count after animation
                setTimeout(() => {
                    updateApprovalBadge();
                    card.remove();
                }, 500);
            }
        });
    });

    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.approval-card');
            const title = card.querySelector('.approval-title').textContent;

            const reason = prompt('Please provide a reason for rejection:');
            if (reason) {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';

                showNotification('Rejection submitted', 'warning');

                setTimeout(() => {
                    updateApprovalBadge();
                    card.remove();
                }, 500);
            }
        });
    });

    reviewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.approval-card');
            const title = card.querySelector('.approval-title').textContent;
            const amount = card.querySelector('.approval-amount').textContent;
            const details = card.querySelector('.approval-details').textContent;

            alert(`Review Details:\n\n${title}\n\nAmount: ${amount}\n\n${details}\n\nClick Approve or Reject to proceed.`);
        });
    });
}

// Update Approval Badge Count
function updateApprovalBadge() {
    const remainingApprovals = document.querySelectorAll('.approval-card').length;
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

// Console welcome message
console.log('%c CFO Platform ', 'background: #0066FF; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;');
console.log('Interactive prototype loaded successfully!');
