// Function to remove existing link and branch buttons
function removeExistingButtons() {
    // Remove existing buttons by looking for elements with specific characteristics
    const existingButtons = document.querySelectorAll('span[style*="cursor: pointer"][style*="margin-left"]');
    existingButtons.forEach(button => {
        // Check if it's one of our buttons by content
        if (button.textContent === '🔗' || button.textContent === '📦' || button.textContent === '✓') {
            button.remove();
        }
    });
    
    // Also remove any existing tooltips
    const existingTooltips = document.querySelectorAll('[id^="__bolt-tooltip-"], [id^="__bolt-branch-tooltip-"]');
    existingTooltips.forEach(tooltip => {
        tooltip.remove();
    });
    
    console.log('Removed existing buttons and tooltips');
}

function addButton() {
    // Remove any existing buttons first
    removeExistingButtons();
    
    // Find the target element within bolt-dialog-root
    const dialogRoot = document.querySelector('.bolt-dialog-root');
    let targetElement = null;
    
    if (dialogRoot) {
        targetElement = dialogRoot.querySelector('a.bolt-link.no-underline-link[href*="/_workitems/edit/"]');
    }
    
    // Fallback to current behavior if not found
    if (!targetElement) {
        targetElement = document.querySelector('a.bolt-link.no-underline-link[href*="/_workitems/edit/"]');
    }
    
    if (!targetElement) {
        console.log('Target element not found');
        return;
    }

    // bolt-dialog-root

    // Create the HTML span
    const htmlSpan = document.createElement('span');
    htmlSpan.textContent = '🔗';
    htmlSpan.style.marginLeft = '10px';
    htmlSpan.style.padding = '4px 8px';
    htmlSpan.style.height = '1.2em';
    htmlSpan.style.lineHeight = '1.2em';
    htmlSpan.style.display = 'inline-flex';
    htmlSpan.style.alignItems = 'center';
    htmlSpan.style.justifyContent = 'center';
    htmlSpan.style.borderRadius = '4px';
    htmlSpan.style.cursor = 'pointer';
    htmlSpan.style.transition = 'background-color 0.2s ease';
    htmlSpan.style.color = '#FFF';
    
    // Create tooltip using Azure DevOps native styling
    const tooltip = document.createElement('div');
    tooltip.className = 'bolt-tooltip bolt-callout bolt-callout--dismissable bolt-callout--dismissable--hover bolt-callout--dismissable--hover--below';
    tooltip.id = '__bolt-tooltip-' + Date.now();
    tooltip.role = 'tooltip';
    tooltip.tabIndex = -1;
    tooltip.style.display = 'none';
    
    // Create tooltip content
    const content = document.createElement('div');
    content.className = 'bolt-callout-content';
    content.role = 'tooltip';
    
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'bolt-tooltip-content body-m';
    tooltipContent.textContent = 'Link';
    
    content.appendChild(tooltipContent);
    tooltip.appendChild(content);
    
    // Add to body
    document.body.appendChild(tooltip);
    
    // Add hover effect
    htmlSpan.addEventListener('mouseenter', () => {
        // Get the link span's position using getBoundingClientRect()
        const linkRect = htmlSpan.getBoundingClientRect();
        
        // Debug logging
        console.log('Link position:', linkRect.left, linkRect.top);
        console.log('Tooltip position:', linkRect.left, linkRect.top - 20);
        
        tooltip.style.display = 'block';
        tooltip.style.position = 'fixed';
        tooltip.style.left = `${linkRect.left}px`;
        tooltip.style.top = `${linkRect.top - 40}px`;
        tooltip.style.zIndex = '9999';
    });
    
    htmlSpan.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    // Create branch tooltip using Azure DevOps native styling
    const branchTooltip = document.createElement('div');
    branchTooltip.className = 'bolt-tooltip bolt-callout bolt-callout--dismissable bolt-callout--dismissable--hover bolt-callout--dismissable--hover--below';
    branchTooltip.id = '__bolt-branch-tooltip-' + Date.now();
    branchTooltip.role = 'tooltip';
    branchTooltip.tabIndex = -1;
    branchTooltip.style.display = 'none';
    
    // Create branch tooltip content
    const branchContent = document.createElement('div');
    branchContent.className = 'bolt-callout-content';
    branchContent.role = 'tooltip';
    
    const branchTooltipContent = document.createElement('div');
    branchTooltipContent.className = 'bolt-tooltip-content body-m';
    branchTooltipContent.textContent = 'Branch Name';
    
    branchContent.appendChild(branchTooltipContent);
    branchTooltip.appendChild(branchContent);
    
    // Add to body
    document.body.appendChild(branchTooltip);
    
    // Create the branchname span
    const branchnameSpan = document.createElement('span');
    branchnameSpan.textContent = '📦';
    branchnameSpan.style.marginLeft = '0';
    branchnameSpan.style.padding = '4px 8px';
    branchnameSpan.style.height = '1.2em';
    branchnameSpan.style.lineHeight = '1.2em';
    branchnameSpan.style.display = 'inline-flex';
    branchnameSpan.style.alignItems = 'center';
    branchnameSpan.style.justifyContent = 'center';
    branchnameSpan.style.borderRadius = '4px';
    branchnameSpan.style.cursor = 'pointer';
    branchnameSpan.style.transition = 'background-color 0.2s ease';
    branchnameSpan.style.color = '#FFF';
    

    // Add hover effect for branch tooltip
    branchnameSpan.addEventListener('mouseenter', () => {
        // Get the branch span's position using getBoundingClientRect()
        const branchRect = branchnameSpan.getBoundingClientRect();
        
        // Debug logging
        console.log('Branch position:', branchRect.left, branchRect.top);
        console.log('Branch tooltip position:', branchRect.left, branchRect.top - 20);
        
        branchTooltip.style.display = 'block';
        branchTooltip.style.position = 'fixed';
        branchTooltip.style.left = `${branchRect.left}px`;
        branchTooltip.style.top = `${branchRect.top - 40}px`;
        branchTooltip.style.zIndex = '9999';
    });
    
    branchnameSpan.addEventListener('mouseleave', () => {
        branchTooltip.style.display = 'none';
    });


    // Add click handler for branchname span
    branchnameSpan.addEventListener('click', async () => {
        // Get the title from the input field
        const titleInput = document.querySelector('input[aria-label="Title field"]');
        const currentTitle = titleInput?.value || '';
        
        // Extract work item number from href
        const workItemNumber = targetElement.href.split('/').pop();
        
        // Create the full title with work item number
        const title = `${workItemNumber} - ${currentTitle}`.trim() || 'Untitled';
        
        // Determine prefix based on work item type within bolt-dialog-root
        let isDefect = false, isRegression = false, isSupport = false;
        
        if (dialogRoot) {
            isDefect = dialogRoot.querySelector('span[aria-label="Defect"]') !== null;
            isRegression = dialogRoot.querySelector('span[aria-label="Regression"]') !== null;
            isSupport = dialogRoot.querySelector('span[aria-label="Support"]') !== null;
        }
        
        // Fallback to current behavior if not found
        if (!isDefect && !isRegression && !isSupport) {
            isDefect = document.querySelector('span[aria-label="Defect"]') !== null;
            isRegression = document.querySelector('span[aria-label="Regression"]') !== null;
            isSupport = document.querySelector('span[aria-label="Support"]') !== null;
        }
        
        const prefix = isSupport ? 'hotfix' : (isDefect || isRegression) ? 'bugfix' : 'feature';
        
        // Get team name from the input field within bolt-dialog-root
        let teamInput = null;
        
        if (dialogRoot) {
            teamInput = dialogRoot.querySelector('input[aria-labelledby="__bolt--Area"]');
        }
        
        // Fallback to current behavior if not found
        if (!teamInput) {
            teamInput = document.querySelector('input[aria-labelledby="__bolt--Area"]');
        }
        const teamName = teamInput?.value || '';
        
        // Extract the last part of the path and remove 'Team'
        const teamPath = teamName.split('\\').pop(); // Split on backslash
        const teamPart = teamPath.replace('Team', '').trim();
        
        // Create branch name format
        const branchName = `${prefix}/${teamPart.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${workItemNumber}-${currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        try {
            // Create a ClipboardItem with both HTML and plain text formats
            const clipboardItem = new ClipboardItem({
                'text/plain': new Blob([branchName], { type: 'text/plain' })
            });
            
            // Copy to clipboard
            await navigator.clipboard.write([clipboardItem]);
            
            // Update span text and background to show success
            branchnameSpan.textContent = '✓';
            branchnameSpan.style.backgroundColor = '#4CAF50';
            branchnameSpan.style.color = '#fff';
            
            // Update tooltip text
            branchTooltipContent.textContent = 'Copied!';
            
            // Reset span text and background after 2 seconds
            setTimeout(() => {
                branchnameSpan.textContent = '📦';
                branchnameSpan.style.backgroundColor = 'transparent';
                branchnameSpan.style.color = '#FFF';
                branchTooltipContent.textContent = 'Branch Name';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy branch name to clipboard');
        }
    });


    // Add both spans after the target element
    targetElement.parentNode.insertBefore(htmlSpan, targetElement.nextSibling);
    targetElement.parentNode.insertBefore(branchnameSpan, htmlSpan.nextSibling);


    // Add click handler
    htmlSpan.addEventListener('click', async () => {
        // Get the title from the input field
        const titleInput = document.querySelector('input[aria-label="Title field"]');
        const currentTitle = titleInput?.value || '';
        
        // Extract work item number from href
        const workItemNumber = targetElement.href.split('/').pop();
        
        // Create the full title with work item number
        const title = `${workItemNumber} - ${currentTitle}`.trim() || 'Untitled';
        
        // Create the HTML code
        const html = `<a href="${targetElement.href}">${title}</a>`;
        
        try {
            // Create a ClipboardItem with both HTML and plain text formats
            const clipboardItem = new ClipboardItem({
                'text/html': new Blob([html], { type: 'text/html' }),
                'text/plain': new Blob([`[${title}](${targetElement.href})`], { type: 'text/plain' })
            });
            
            // Copy to clipboard
            await navigator.clipboard.write([clipboardItem]);
            
            // Update span text and background to show success
            htmlSpan.textContent = '✓';
            htmlSpan.style.backgroundColor = '#4CAF50';
            htmlSpan.style.color = '#fff';
            
            // Update tooltip text
            tooltipContent.textContent = 'Copied!';
            
            // Reset span text and background after 2 seconds
            setTimeout(() => {
                htmlSpan.textContent = '🔗';
                htmlSpan.style.backgroundColor = 'transparent';
                htmlSpan.style.color = '#FFF';
                tooltipContent.textContent = 'Link';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy HTML to clipboard');
        }
    });

    // Add both spans after the target element
    targetElement.parentNode.insertBefore(htmlSpan, targetElement.nextSibling);
    targetElement.parentNode.insertBefore(branchnameSpan, htmlSpan.nextSibling);
}

// Function to create link and branch buttons for a treegrid row
function createRowButtons(row) {
    // Check if buttons already exist for this row
    if (row.querySelector('.ado-link-button, .ado-branch-button')) {
        return;
    }
    
    // Find the work item link in the row
    const workItemLink = row.querySelector('a[href*="/_workitems/edit/"]');
    if (!workItemLink) {
        return;
    }
    
    // Extract work item number from href
    const href = workItemLink.href;
    const workItemMatch = href.match(/\/_workitems\/edit\/(\d+)/);
    if (!workItemMatch) {
        return;
    }
    
    const workItemNumber = workItemMatch[1];
    const currentTitle = workItemLink.textContent.trim();
    
    // Create container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'ado-button-container';
    buttonContainer.style.display = 'none';
    buttonContainer.style.marginLeft = '10px';
    buttonContainer.style.display = 'inline-flex';
    buttonContainer.style.gap = '5px';
    
    // Create HTML/Link button (same as original)
    const htmlSpan = document.createElement('span');
    htmlSpan.className = 'ado-link-button';
    htmlSpan.textContent = '🔗';
    htmlSpan.style.marginLeft = '10px';
    htmlSpan.style.padding = '4px 8px';
    htmlSpan.style.height = '1.2em';
    htmlSpan.style.lineHeight = '1.2em';
    htmlSpan.style.display = 'inline-flex';
    htmlSpan.style.alignItems = 'center';
    htmlSpan.style.justifyContent = 'center';
    htmlSpan.style.borderRadius = '4px';
    htmlSpan.style.cursor = 'pointer';
    htmlSpan.style.transition = 'background-color 0.2s ease';
    htmlSpan.style.color = '#FFF';
    htmlSpan.style.visibility = 'hidden';
    htmlSpan.style.opacity = '0';
    
    // Create Branch button (same as original)
    const branchnameSpan = document.createElement('span');
    branchnameSpan.className = 'ado-branch-button';
    branchnameSpan.textContent = '📦';
    branchnameSpan.style.marginLeft = '0';
    branchnameSpan.style.padding = '4px 8px';
    branchnameSpan.style.height = '1.2em';
    branchnameSpan.style.lineHeight = '1.2em';
    branchnameSpan.style.display = 'inline-flex';
    branchnameSpan.style.alignItems = 'center';
    branchnameSpan.style.justifyContent = 'center';
    branchnameSpan.style.borderRadius = '4px';
    branchnameSpan.style.cursor = 'pointer';
    branchnameSpan.style.transition = 'background-color 0.2s ease';
    branchnameSpan.style.color = '#FFF';
    branchnameSpan.style.visibility = 'hidden';
    branchnameSpan.style.opacity = '0';
    
    // Add click handlers (same logic as original addButton function)
    htmlSpan.addEventListener('click', async () => {
        try {
            const clipboardItem = new ClipboardItem({
                'text/html': new Blob([`<a href="${href}">${currentTitle}</a>`], { type: 'text/html' }),
                'text/plain': new Blob([href], { type: 'text/plain' })
            });
            
            await navigator.clipboard.write([clipboardItem]);
            
            htmlSpan.textContent = '✓';
            htmlSpan.style.backgroundColor = '#107c10';
            
            setTimeout(() => {
                htmlSpan.textContent = '🔗';
                htmlSpan.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy HTML to clipboard');
        }
    });
    
    branchnameSpan.addEventListener('click', async () => {
        // Extract team name (you may need to adjust this logic based on your page structure)
        const teamInput = document.querySelector('input[aria-label*="Team"], input[placeholder*="team"], .team-field input');
        const teamName = teamInput?.value || '';
        
        const teamPath = teamName.split('\\').pop();
        const teamPart = teamPath.replace('Team', '').trim();
        
        const branchName = `feature/${teamPart.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${workItemNumber}-${currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        try {
            const clipboardItem = new ClipboardItem({
                'text/plain': new Blob([branchName], { type: 'text/plain' })
            });
            
            await navigator.clipboard.write([clipboardItem]);
            
            branchnameSpan.textContent = '✓';
            branchnameSpan.style.backgroundColor = '#107c10';
            
            setTimeout(() => {
                branchnameSpan.textContent = '📦';
                branchnameSpan.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy branch name:', err);
            alert('Failed to copy branch name to clipboard');
        }
    });
    
    // Add buttons to container
    buttonContainer.appendChild(htmlSpan);
    buttonContainer.appendChild(branchnameSpan);
    
    // Insert container after the work item link
    workItemLink.parentNode.insertBefore(buttonContainer, workItemLink.nextSibling);
}

// Function to setup treegrid hover functionality
function setupTreegridHover() {
    const treegridTables = document.querySelectorAll('table[role="treegrid"]');
    
    treegridTables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            // Skip header rows
            if (row.querySelector('th')) return;
            
            // Skip if already setup
            if (row.hasAttribute('data-ado-hover-setup')) return;
            
            // Mark as setup
            row.setAttribute('data-ado-hover-setup', 'true');
            
            // Create buttons for this row
            createRowButtons(row);
            
            // Add hover events
            row.addEventListener('mouseenter', () => {
                const buttons = row.querySelectorAll('.ado-link-button, .ado-branch-button');
                buttons.forEach(button => {
                    button.style.visibility = 'visible';
                    button.style.opacity = '1';
                    button.style.transition = 'opacity 0.2s ease, visibility 0.2s ease';
                });
            });
            
            row.addEventListener('mouseleave', () => {
                const buttons = row.querySelectorAll('.ado-link-button, .ado-branch-button');
                buttons.forEach(button => {
                    button.style.visibility = 'hidden';
                    button.style.opacity = '0';
                    button.style.transition = 'opacity 0.2s ease, visibility 0.2s ease';
                });
            });
        });
    });
}

// Function to observe DOM changes for new treegrid tables
function observeTreegridChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches('table[role="treegrid"]')) {
                            setTimeout(setupTreegridHover, 100);
                        } else if (node.querySelector && node.querySelector('table[role="treegrid"]')) {
                            setTimeout(setupTreegridHover, 100);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Function to observe DOM changes for new bolt-dialog-root elements
function observeDialogChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the added node is a bolt-dialog-root or contains one
                    if (node.classList && node.classList.contains('bolt-dialog-root')) {
                        console.log('bolt-dialog-root detected, adding buttons');
                        // Add a small delay to ensure the dialog content is fully loaded
                        setTimeout(() => {
                            addButton();
                        }, 500);
                    } else if (node.querySelector && node.querySelector('.bolt-dialog-root')) {
                        console.log('Element containing bolt-dialog-root detected, adding buttons');
                        // Add a small delay to ensure the dialog content is fully loaded
                        setTimeout(() => {
                            addButton();
                        }, 500);
                    }
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('Dialog observer started');
}

// Wait for DOM to be fully loaded and add a small delay to ensure the element is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Add a small delay to ensure the element is loaded
        setTimeout(() => {
            addButton(); // For individual ticket view
            setupTreegridHover(); // For ticket list view
            observeTreegridChanges(); // Watch for dynamic content
            observeDialogChanges(); // Watch for bolt-dialog-root elements
        }, 1000);
    });
} else {
    // Add a small delay to ensure the element is loaded
    setTimeout(() => {
        addButton(); // For individual ticket view
        setupTreegridHover(); // For ticket list view
        observeTreegridChanges(); // Watch for dynamic content
        observeDialogChanges(); // Watch for bolt-dialog-root elements
    }, 1000);
}
