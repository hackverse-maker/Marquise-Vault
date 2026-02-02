// --- Component Loader ---

async function loadComponent(selector, path) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        container.innerHTML = html;

        // Dispatch event after load
        document.dispatchEvent(new CustomEvent('componentLoaded', { detail: { selector, path } }));
    } catch (error) {
        console.error(`Failed to load component: ${path}`, error);
    }
}

// Initialize default shared components
document.addEventListener('DOMContentLoaded', () => {
    // These will be implemented as HTML snippets or pure JS generators
    // For now, setting up the framework
});
