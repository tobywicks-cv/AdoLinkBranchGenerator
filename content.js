function addButton() {
    // Find the target element
    const targetElement = document.querySelector('a.bolt-link.no-underline-link[href*="/_workitems/edit/"]');
    if (!targetElement) {
        console.log('Target element not found');
        return;
    }

    // Create the HTML button
    const htmlButton = document.createElement('button');
    htmlButton.textContent = 'Link';
    htmlButton.style.marginLeft = '10px';
    htmlButton.style.padding = '10px 20px';
    htmlButton.style.backgroundColor = '#4CAF50';
    htmlButton.style.color = 'white';
    htmlButton.style.border = 'none';
    htmlButton.style.borderRadius = '4px';
    htmlButton.style.cursor = 'pointer';
    htmlButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

    // Create the markdown button
    const markdownButton = document.createElement('button');
    markdownButton.textContent = 'Markdown';
    markdownButton.style.marginLeft = '10px';
    markdownButton.style.padding = '10px 20px';
    markdownButton.style.backgroundColor = '#2196F3';
    markdownButton.style.color = 'white';
    markdownButton.style.border = 'none';
    markdownButton.style.borderRadius = '4px';
    markdownButton.style.cursor = 'pointer';
    markdownButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

    // Add click handler for markdown button
    markdownButton.addEventListener('click', async () => {
        // Get the title from the input field
        const titleInput = document.querySelector('input[aria-label="Title field"]');
        const currentTitle = titleInput?.value || '';
        
        // Extract work item number from href
        const workItemNumber = targetElement.href.split('/').pop();
        
        // Create the full title with work item number
        const title = `${workItemNumber} - ${currentTitle}`.trim() || 'Untitled';
        
        // Create markdown link
        const markdown = `[${title}](${targetElement.href})`;
        
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(markdown);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Markdown copied to clipboard!';
            successMsg.style.position = 'fixed';
            successMsg.style.top = '10px';
            successMsg.style.left = '10px';
            successMsg.style.backgroundColor = '#2196F3';
            successMsg.style.color = 'white';
            successMsg.style.padding = '10px';
            successMsg.style.borderRadius = '4px';
            successMsg.style.zIndex = '9999';
            
            document.body.appendChild(successMsg);
            
            // Remove the message after 2 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy Markdown to clipboard');
        }
    });

    // Add click handler
    htmlButton.addEventListener('click', async () => {
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
            
            // Show a temporary success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'HTML copied to clipboard!';
            successMsg.style.position = 'fixed';
            successMsg.style.top = '10px';
            successMsg.style.left = '10px';
            successMsg.style.backgroundColor = '#4CAF50';
            successMsg.style.color = 'white';
            successMsg.style.padding = '10px';
            successMsg.style.borderRadius = '4px';
            successMsg.style.zIndex = '9999';
            
            document.body.appendChild(successMsg);
            
            // Remove the message after 2 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy HTML to clipboard');
        }
    });

    // Add both buttons after the target element
    targetElement.parentNode.insertBefore(htmlButton, targetElement.nextSibling);
    targetElement.parentNode.insertBefore(markdownButton, htmlButton.nextSibling);
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
