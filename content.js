function addButton() {
    // Find the target element
    const targetElement = document.querySelector('a.bolt-link.no-underline-link[href*="/_workitems/edit/"]');
    if (!targetElement) {
        console.log('Target element not found');
        return;
    }

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
    tooltip.className = 'bolt-tooltip bolt-callout absolute flex-row';
    tooltip.id = '__bolt-tooltip-' + Date.now();
    tooltip.role = 'tooltip';
    tooltip.tabIndex = -1;
    
    // Create tooltip content
    const content = document.createElement('div');
    content.className = 'bolt-callout-content';
    content.role = 'tooltip';
    
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'bolt-tooltip-content body-m';
    tooltipContent.textContent = 'Link';
    
    content.appendChild(tooltipContent);
    tooltip.appendChild(content);
    
    // Add to body instead of span
    document.body.appendChild(tooltip);

    // Add hover effect
    htmlSpan.addEventListener('mouseenter', (e) => {
        htmlSpan.style.backgroundColor = 'rgba(0,0,0,0.05)';
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY - 20}px`;
    });
    
    htmlSpan.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    // Create the branchname span
    const branchnameSpan = document.createElement('span');
    branchnameSpan.textContent = '📦';
    branchnameSpan.style.marginLeft = '10px';
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
    
    // Add hover effect
    branchnameSpan.addEventListener('mouseenter', () => {
        branchnameSpan.style.backgroundColor = 'rgba(0,0,0,0.05)';
    });
    
    branchnameSpan.addEventListener('mouseleave', () => {
        branchnameSpan.style.backgroundColor = 'transparent';
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
        
        // Determine prefix based on work item type
        const isDefect = document.querySelector('span[aria-label="Defect"]') !== null;
        const isRegression = document.querySelector('span[aria-label="Regression"]') !== null;
        const isSupport = document.querySelector('span[aria-label="Support"]') !== null;
        
        const prefix = isSupport ? 'hotfix' : (isDefect || isRegression) ? 'bugfix' : 'feature';
        
        // Get team name from the input field
        const teamInput = document.querySelector('input[aria-labelledby="__bolt--Area"]');
        const teamName = teamInput?.value || '';
        
        // Extract the last part of the path and remove 'Team'
        const teamPath = teamName.split('\\').pop(); // Split on backslash
        const teamPart = teamPath.replace('Team', '').trim();
        
        // Create branch name format
        const branchName = `${prefix}/${teamPart.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${workItemNumber}-${currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(branchName);
            
            // Update span text and background to show success
            branchnameSpan.textContent = '✓';
            branchnameSpan.style.backgroundColor = '#4CAF50';
            branchnameSpan.style.color = '#fff';
            
            // Reset span text and background after 2 seconds
            setTimeout(() => {
                branchnameSpan.textContent = '📦';
                branchnameSpan.style.backgroundColor = 'transparent';
                branchnameSpan.style.color = '#FFF';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy branch name to clipboard');
        }
    });



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
            // Copy to clipboard
            await navigator.clipboard.writeText(html);
            
            // Update span text and background to show success
            htmlSpan.textContent = '✓';
            htmlSpan.style.backgroundColor = '#4CAF50';
            htmlSpan.style.color = '#fff';
            
            // Reset span text and background after 2 seconds
            setTimeout(() => {
                htmlSpan.textContent = '🔗';
                htmlSpan.style.backgroundColor = 'transparent';
                htmlSpan.style.color = '#FFF';
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
