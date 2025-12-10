document.addEventListener("DOMContentLoaded", function () {
  const img = document.querySelector('img[alt="米山舞"]');
  if (!img) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'social-row d-flex';

  wrapper.innerHTML = `
    <a class="social-link" href="https://www.youtube.com/@yoneyamai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M23.5 6.2s-.2-1.7-.9-2.5c-.9-.9-1.9-.9-2.4-1C16.8 2.3 12 2.3 12 2.3h-.1s-4.8 0-8.2.4c-.5.1-1.5.1-2.4 1-.7.8-.9 2.5-.9 2.5S0 8.1 0 10v2c0 1.9.5 3.8.5 3.8s.2 1.7.9 2.5c.9.9 2.1.9 2.6 1 1.9.2 8 .4 8 .4s4.8 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.8.9-2.5.9-2.5S24 13.9 24 12V10c0-1.9-.5-3.8-.5-3.8zM9.6 14.8V8.9l6.3 2.9-6.3 3z"/></svg>
    </a>
    <a class="social-link" href="https://www.instagram.com/yoneyamai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.1A4.9 4.9 0 1 0 16.9 13 4.9 4.9 0 0 0 12 8.1zm6.4-3.6a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z"/></svg>
    </a>
    <a class="social-link" href="https://x.com/yoneyamai" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17.53 3h3.24l-7.06 8.06L22.5 21h-6.34l-4.96-6.45L5.36 21H2.12l7.55-8.63L1.5 3h6.48l4.47 5.96L17.53 3z"/></svg>    
    </a>
        <a class="social-link" href="https://www.threads.com/@yoneyamai?xmt=AQF0Spoy1zpAifvbuBaByCtIr_5MHtfvyZy-CwT91Od4M8o" target="_blank" rel="noopener noreferrer" aria-label="Theads">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12C24 5.373 18.627 0 12 0zm4.622 13.432c-.189 1.349-.953 3.408-3.438 4.028-1.026.257-2.808.178-3.956-.843-.624-.555-.987-1.33-1.08-2.316h2.008c.094.657.579 1.157 1.259 1.31.837.19 1.79-.143 2.228-1.23.142-.349.231-.758.27-1.224-.432.334-.986.53-1.648.53-1.744 0-3.16-1.416-3.16-3.16 0-1.745 1.416-3.16 3.16-3.16.95 0 1.772.414 2.333 1.07.603.703.928 1.668.928 2.87 0 .355-.018.693-.056 1.016l.552.11c.298.059.583.178.847.355zm-3.06-2.23c0-.983-.61-1.66-1.5-1.66s-1.5.677-1.5 1.66c0 .984.61 1.66 1.5 1.66s1.5-.676 1.5-1.66z" /></svg>    
    </a>

    `;

  img.parentNode.insertBefore(wrapper, img.nextSibling);
});