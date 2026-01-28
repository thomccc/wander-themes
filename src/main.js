// Main JavaScript file for Desert Spirit Vacations

// Property grid scrolling
document.addEventListener('DOMContentLoaded', () => {
  // Replace Figma MCP localhost assets with downloaded assets in /public/figma-assets/guest-2026
  // This lets the page work without the MCP asset server running.
  const FIGMA_LOCAL_ASSET_BASE = '/figma-assets/guest-2026/';
  const FIGMA_LOCALHOST_ASSET_BASE = 'http://localhost:3845/assets/';
  const FIGMA_ASSET_OVERRIDES = new Map([
    // Figma search icon svg referenced earlier in the HTML; map to the downloaded magnifying-glass asset.
    ['0baecca1de8b32d12d09ff14a8961569f20fa9dc.svg', '6e2cc34decd6d2da946aed33eb7ef20133cb866c.svg'],
  ]);

  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;

    if (src.startsWith(FIGMA_LOCALHOST_ASSET_BASE)) {
      const filename = src.slice(FIGMA_LOCALHOST_ASSET_BASE.length);
      const overridden = FIGMA_ASSET_OVERRIDES.get(filename);
      img.setAttribute('src', FIGMA_LOCAL_ASSET_BASE + (overridden ?? filename));
    }
  });

  // Handle property grid navigation
  const prevButtons = document.querySelectorAll('.section-controls button:first-child');
  const nextButtons = document.querySelectorAll('.section-controls button:last-child');
  const propertyGrids = document.querySelectorAll('.property-grid');

  prevButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const grid = propertyGrids[index];
      grid.scrollBy({ left: -280, behavior: 'smooth' });
    });
  });

  nextButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const grid = propertyGrids[index];
      grid.scrollBy({ left: 280, behavior: 'smooth' });
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Form submitted');
      alert('Thank you for your message! We will get back to you soon.');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
