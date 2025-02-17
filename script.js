document.addEventListener('DOMContentLoaded', () => {
    // ------------ Existing Functionality ------------
    const tags = document.querySelectorAll('.tag');
    const windows = document.querySelectorAll('.window');
    const clock = document.getElementById('clock');
    const windowTitle = document.getElementById('window-title');

    // Handle tab clicks
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

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const digitHandlers = {
            'Digit1': 'home',
            'Digit2': 'projects',
            'Digit3': 'about',
            'Digit4': 'contact',
            'Digit5': 'blog'
        };

        if (digitHandlers[e.code]) {
            const target = digitHandlers[e.code];
            windowTitle.textContent = `~/portfolio/${target}`;
            tags.forEach(t => t.classList.remove('active'));
            windows.forEach(w => w.classList.remove('active'));
            document.querySelector(`[data-target="${target}"]`).classList.add('active');
            document.getElementById(target).classList.add('active');
        }
    });

    // ------------ Blog Functionality ------------
    const initializeBlog = async () => {
        const converter = new showdown.Converter();
        const blogList = document.querySelector('.blog-list');

        try {
            // Fetch and validate posts
            const response = await fetch('/blog-posts/posts.json');
            if (!response.ok) throw new Error('Failed to load posts.json');
            
            const posts = await response.json();
            
            // Verify post files exist
            const validatedPosts = await Promise.all(
                posts.map(async post => {
                    try {
                        const res = await fetch(`/blog-posts/${post.file}`);
                        return res.ok ? post : null;
                    } catch (error) {
                        console.warn(`Post file missing: ${post.file}`);
                        return null;
                    }
                })
            );

            // Filter and sort posts
            const filteredPosts = validatedPosts.filter(post => post !== null);
            const sortedPosts = filteredPosts.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );

            // Create blog list entries
            sortedPosts.forEach(post => {
                const entry = document.createElement('div');
                entry.className = 'blog-entry';
                entry.innerHTML = `
                    <h3>${post.title}</h3>
                    <div class="blog-meta">
                        ${new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        ${post.excerpt ? `<p class="excerpt">${post.excerpt}</p>` : ''}
                    </div>
                `;

                // Open post in new tab
                entry.addEventListener('click', () => {
                    window.open(`/blog-post.html?post=${encodeURIComponent(post.file)}`, '_blank');
                });

                blogList.appendChild(entry);
            });

        } catch (error) {
            console.error('Blog Error:', error);
            blogList.innerHTML = `
                <div class="error-message">
                    ⚠️ Error loading blog posts: ${error.message}
                </div>
            `;
        }
    };

    // Initialize blog system
    initializeBlog();
});
