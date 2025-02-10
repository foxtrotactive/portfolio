// script.js
document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.tag');
    const windows = document.querySelectorAll('.window');
    const clock = document.getElementById('clock');
    const windowTitle = document.getElementById('window-title');

    // Tag click handler
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const target = tag.dataset.target;
            
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            windows.forEach(w => w.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            
            windowTitle.textContent = `~/portfolio/${target}`;
        });
    });

    // Update clock
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Digit1') {
            windowTitle.textContent = '~/portfolio';
            tags.forEach(t => t.classList.remove('active'));
            windows.forEach(w => w.classList.remove('active'));
            document.querySelector('[data-target="home"]').classList.add('active');
            document.getElementById('home').classList.add('active');
        }
        else if (e.code === 'Digit2') {
            windowTitle.textContent = '~/portfolio/projects';
            tags.forEach(t => t.classList.remove('active'));
            windows.forEach(w => w.classList.remove('active'));
            document.querySelector('[data-target="projects"]').classList.add('active');
            document.getElementById('projects').classList.add('active');
                  
        }
        else if (e.code === 'Digit3') {
            windowTitle.textContent = '~/portfolio/about';
            tags.forEach(t => t.classList.remove('active'));
            windows.forEach(w => w.classList.remove('active'));
            document.querySelector('[data-target="about"]').classList.add('active');
            document.getElementById('about').classList.add('active');
                  
        }
        else if (e.code === 'Digit4') {
            windowTitle.textContent = '~/portfolio/contact';
            tags.forEach(t => t.classList.remove('active'));
            windows.forEach(w => w.classList.remove('active'));
            document.querySelector('[data-target="contact"]').classList.add('active');
            document.getElementById('contact').classList.add('active');
                  
        }
    });
});
