/**
 * Main JavaScript File
 * Handles component loading and initialization
 */

// Component paths mapping
const components = {
    formDialog: 'components/form-dialog.html',
    header: 'components/header.html',
    hero: 'components/hero.html',
    benefits: 'components/benefits.html',
    targetAudience: 'components/target-audience.html',
    testimonials: 'components/testimonials.html',
    courseContent: 'components/course-content.html',
    bonus: 'components/bonus.html',
    instructor: 'components/instructor.html',
    footer: 'components/footer.html'
};

/**
 * Load a component HTML file and insert it into a container
 * @param {string} componentName - Name of the component
 * @param {string} containerId - ID of the container element
 */
async function loadComponent(componentName, containerId) {
    try {
        const componentPath = components[componentName];
        if (!componentPath) {
            console.error(`Component "${componentName}" not found in components mapping`);
            return;
        }

        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentPath}`);
        }

        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = html;
            
            // Execute any scripts within the component
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            console.error(`Container with ID "${containerId}" not found`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
    }
}

/**
 * Load all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Load all components
    await Promise.all([
        loadComponent('formDialog', 'form-dialog-container'),
        loadComponent('header', 'header-container'),
        loadComponent('hero', 'hero-container'),
        loadComponent('benefits', 'benefits-container'),
        loadComponent('targetAudience', 'target-audience-container'),
        loadComponent('testimonials', 'testimonials-container'),
        loadComponent('courseContent', 'course-content-container'),
        loadComponent('bonus', 'bonus-container'),
        loadComponent('instructor', 'instructor-container'),
        loadComponent('footer', 'footer-container')
    ]);

    // Initialize form dialog first
    if (typeof initFormDialog === 'function') {
        initFormDialog();
    }

    // Initialize primary buttons
    if (typeof initPrimaryButtons === 'function') {
        initPrimaryButtons();
    }

    // Initialize components after they're loaded
    if (typeof initComponents === 'function') {
        initComponents();
    }

    // Initialize animations after components are loaded
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
});

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of the target element
 */
function smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export for use in other scripts
window.smoothScrollTo = smoothScrollTo;
