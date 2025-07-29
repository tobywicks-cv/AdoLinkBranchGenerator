function addButton() {
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

// Wait for DOM to be fully loaded and add a small delay to ensure the element is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Add a small delay to ensure the element is loaded
        setTimeout(addButton, 1000);
    });
} else {
    // Add a small delay to ensure the element is loaded
    setTimeout(addButton, 1000);
}
