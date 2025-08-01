/**
 * @jest-environment jsdom
 */

// Import the function from the source file
// Since content.js is a browser extension script, we need to load it and extract the function
const fs = require('fs');
const path = require('path');

// Read the content.js file and extract the removeExistingButtons function
const contentJsPath = path.join(__dirname, '../src/content.js');
const contentJsCode = fs.readFileSync(contentJsPath, 'utf8');

// Extract just the removeExistingButtons function from the content script
// This is a simple approach - in production you might want to use a proper parser
const functionMatch = contentJsCode.match(/function removeExistingButtons\(\)[\s\S]*?^}/m);
if (!functionMatch) {
    throw new Error('removeExistingButtons function not found in content.js');
}

// Create the function in our test environment
eval(functionMatch[0]);

describe('removeExistingButtons', () => {
    let consoleSpy;

    beforeEach(() => {
        // Clear the DOM before each test
        document.body.innerHTML = '';
        
        // Spy on console.log
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore console.log
        consoleSpy.mockRestore();
    });

    describe('Button Removal', () => {
        test('should remove link button (🔗) with matching style attributes', () => {
            // Create a link button element
            const linkButton = document.createElement('span');
            linkButton.textContent = '🔗';
            linkButton.style.cursor = 'pointer';
            linkButton.style.marginLeft = '10px';
            document.body.appendChild(linkButton);

            // Verify button exists before removal
            expect(document.querySelector('span')).toBeTruthy();
            expect(document.querySelector('span').textContent).toBe('🔗');

            // Call the function
            removeExistingButtons();

            // Verify button was removed
            expect(document.querySelector('span')).toBeNull();
        });

        test('should remove branch button (📦) with matching style attributes', () => {
            // Create a branch button element
            const branchButton = document.createElement('span');
            branchButton.textContent = '📦';
            branchButton.style.cursor = 'pointer';
            branchButton.style.marginLeft = '0px';
            document.body.appendChild(branchButton);

            // Verify button exists before removal
            expect(document.querySelector('span')).toBeTruthy();
            expect(document.querySelector('span').textContent).toBe('📦');

            // Call the function
            removeExistingButtons();

            // Verify button was removed
            expect(document.querySelector('span')).toBeNull();
        });

        test('should remove success checkmark button (✓) with matching style attributes', () => {
            // Create a success checkmark element
            const checkmarkButton = document.createElement('span');
            checkmarkButton.textContent = '✓';
            checkmarkButton.style.cursor = 'pointer';
            checkmarkButton.style.marginLeft = '5px';
            document.body.appendChild(checkmarkButton);

            // Verify button exists before removal
            expect(document.querySelector('span')).toBeTruthy();
            expect(document.querySelector('span').textContent).toBe('✓');

            // Call the function
            removeExistingButtons();

            // Verify button was removed
            expect(document.querySelector('span')).toBeNull();
        });

        test('should remove multiple buttons of different types', () => {
            // Create multiple button elements
            const linkButton = document.createElement('span');
            linkButton.textContent = '🔗';
            linkButton.style.cursor = 'pointer';
            linkButton.style.marginLeft = '10px';

            const branchButton = document.createElement('span');
            branchButton.textContent = '📦';
            branchButton.style.cursor = 'pointer';
            branchButton.style.marginLeft = '0px';

            const checkmarkButton = document.createElement('span');
            checkmarkButton.textContent = '✓';
            checkmarkButton.style.cursor = 'pointer';
            checkmarkButton.style.marginLeft = '5px';

            document.body.appendChild(linkButton);
            document.body.appendChild(branchButton);
            document.body.appendChild(checkmarkButton);

            // Verify all buttons exist before removal
            expect(document.querySelectorAll('span')).toHaveLength(3);

            // Call the function
            removeExistingButtons();

            // Verify all buttons were removed
            expect(document.querySelectorAll('span')).toHaveLength(0);
        });

        test('should not remove buttons without matching style attributes', () => {
            // Create a button without the required style attributes
            const nonMatchingButton = document.createElement('span');
            nonMatchingButton.textContent = '🔗';
            // Missing cursor: pointer and margin-left styles
            document.body.appendChild(nonMatchingButton);

            // Call the function
            removeExistingButtons();

            // Verify button was not removed (no matching style attributes)
            expect(document.querySelector('span')).toBeTruthy();
        });

        test('should not remove buttons with different content', () => {
            // Create buttons with different content
            const differentButton1 = document.createElement('span');
            differentButton1.textContent = '❌';
            differentButton1.style.cursor = 'pointer';
            differentButton1.style.marginLeft = '10px';

            const differentButton2 = document.createElement('span');
            differentButton2.textContent = 'Click me';
            differentButton2.style.cursor = 'pointer';
            differentButton2.style.marginLeft = '5px';

            document.body.appendChild(differentButton1);
            document.body.appendChild(differentButton2);

            // Call the function
            removeExistingButtons();

            // Verify buttons were not removed (different content)
            expect(document.querySelectorAll('span')).toHaveLength(2);
        });
    });

    describe('Tooltip Removal', () => {
        test('should remove tooltip with __bolt-tooltip- prefix', () => {
            // Create a tooltip element
            const tooltip = document.createElement('div');
            tooltip.id = '__bolt-tooltip-12345';
            tooltip.className = 'bolt-tooltip';
            document.body.appendChild(tooltip);

            // Verify tooltip exists before removal
            expect(document.getElementById('__bolt-tooltip-12345')).toBeTruthy();

            // Call the function
            removeExistingButtons();

            // Verify tooltip was removed
            expect(document.getElementById('__bolt-tooltip-12345')).toBeNull();
        });

        test('should remove tooltip with __bolt-branch-tooltip- prefix', () => {
            // Create a branch tooltip element
            const branchTooltip = document.createElement('div');
            branchTooltip.id = '__bolt-branch-tooltip-67890';
            branchTooltip.className = 'bolt-tooltip';
            document.body.appendChild(branchTooltip);

            // Verify tooltip exists before removal
            expect(document.getElementById('__bolt-branch-tooltip-67890')).toBeTruthy();

            // Call the function
            removeExistingButtons();

            // Verify tooltip was removed
            expect(document.getElementById('__bolt-branch-tooltip-67890')).toBeNull();
        });

        test('should remove multiple tooltips', () => {
            // Create multiple tooltip elements
            const tooltip1 = document.createElement('div');
            tooltip1.id = '__bolt-tooltip-111';
            
            const tooltip2 = document.createElement('div');
            tooltip2.id = '__bolt-branch-tooltip-222';
            
            const tooltip3 = document.createElement('div');
            tooltip3.id = '__bolt-tooltip-333';

            document.body.appendChild(tooltip1);
            document.body.appendChild(tooltip2);
            document.body.appendChild(tooltip3);

            // Verify all tooltips exist before removal
            expect(document.querySelectorAll('[id^="__bolt-tooltip-"], [id^="__bolt-branch-tooltip-"]')).toHaveLength(3);

            // Call the function
            removeExistingButtons();

            // Verify all tooltips were removed
            expect(document.querySelectorAll('[id^="__bolt-tooltip-"], [id^="__bolt-branch-tooltip-"]')).toHaveLength(0);
        });

        test('should not remove tooltips with different ID patterns', () => {
            // Create tooltips with different ID patterns
            const differentTooltip1 = document.createElement('div');
            differentTooltip1.id = 'some-other-tooltip-123';
            
            const differentTooltip2 = document.createElement('div');
            differentTooltip2.id = 'bolt-tooltip-456'; // Missing __ prefix

            document.body.appendChild(differentTooltip1);
            document.body.appendChild(differentTooltip2);

            // Call the function
            removeExistingButtons();

            // Verify tooltips were not removed (different ID patterns)
            expect(document.getElementById('some-other-tooltip-123')).toBeTruthy();
            expect(document.getElementById('bolt-tooltip-456')).toBeTruthy();
        });
    });

    describe('Combined Scenarios', () => {
        test('should remove both buttons and tooltips in a single call', () => {
            // Create buttons
            const linkButton = document.createElement('span');
            linkButton.textContent = '🔗';
            linkButton.style.cursor = 'pointer';
            linkButton.style.marginLeft = '10px';

            const branchButton = document.createElement('span');
            branchButton.textContent = '📦';
            branchButton.style.cursor = 'pointer';
            branchButton.style.marginLeft = '0px';

            // Create tooltips
            const tooltip1 = document.createElement('div');
            tooltip1.id = '__bolt-tooltip-123';
            
            const tooltip2 = document.createElement('div');
            tooltip2.id = '__bolt-branch-tooltip-456';

            document.body.appendChild(linkButton);
            document.body.appendChild(branchButton);
            document.body.appendChild(tooltip1);
            document.body.appendChild(tooltip2);

            // Verify elements exist before removal
            expect(document.querySelectorAll('span')).toHaveLength(2);
            expect(document.querySelectorAll('[id^="__bolt-tooltip-"], [id^="__bolt-branch-tooltip-"]')).toHaveLength(2);

            // Call the function
            removeExistingButtons();

            // Verify all elements were removed
            expect(document.querySelectorAll('span')).toHaveLength(0);
            expect(document.querySelectorAll('[id^="__bolt-tooltip-"], [id^="__bolt-branch-tooltip-"]')).toHaveLength(0);
        });

        test('should handle empty DOM gracefully', () => {
            // Ensure DOM is empty
            expect(document.body.children).toHaveLength(0);

            // Call the function on empty DOM
            expect(() => removeExistingButtons()).not.toThrow();

            // Verify DOM is still empty
            expect(document.body.children).toHaveLength(0);
        });

        test('should preserve non-matching elements', () => {
            // Create elements that should not be removed
            const regularButton = document.createElement('button');
            regularButton.textContent = 'Regular Button';

            const regularSpan = document.createElement('span');
            regularSpan.textContent = 'Regular Span';

            const regularDiv = document.createElement('div');
            regularDiv.id = 'regular-div';

            // Create elements that should be removed
            const linkButton = document.createElement('span');
            linkButton.textContent = '🔗';
            linkButton.style.cursor = 'pointer';
            linkButton.style.marginLeft = '10px';

            const tooltip = document.createElement('div');
            tooltip.id = '__bolt-tooltip-789';

            document.body.appendChild(regularButton);
            document.body.appendChild(regularSpan);
            document.body.appendChild(regularDiv);
            document.body.appendChild(linkButton);
            document.body.appendChild(tooltip);

            // Verify initial state
            expect(document.body.children).toHaveLength(5);

            // Call the function
            removeExistingButtons();

            // Verify only matching elements were removed
            expect(document.body.children).toHaveLength(3);
            expect(document.querySelector('button')).toBeTruthy();
            expect(document.querySelector('span').textContent).toBe('Regular Span');
            expect(document.getElementById('regular-div')).toBeTruthy();
        });
    });

    describe('Console Logging', () => {
        test('should log removal message', () => {
            // Call the function
            removeExistingButtons();

            // Verify console.log was called with expected message
            expect(consoleSpy).toHaveBeenCalledWith('Removed existing buttons and tooltips');
            expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test('should log message even when no elements are removed', () => {
            // Ensure DOM is empty
            expect(document.body.children).toHaveLength(0);

            // Call the function
            removeExistingButtons();

            // Verify console.log was still called
            expect(consoleSpy).toHaveBeenCalledWith('Removed existing buttons and tooltips');
        });
    });
});
