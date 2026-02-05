# Personal Academic Website

A modern, interactive personal website for showcasing your research work in Computer Vision, with a cyberpunk/tech aesthetic featuring dynamic backgrounds, smooth animations, and project demos.

## Features

- **Dynamic Particle Background**: Animated particles with connecting lines for a sci-fi aesthetic
- **Smooth Scrolling Animations**: Sections fade in as you scroll
- **Interactive Navigation**: Sticky navbar with smooth transitions
- **Project Demo Showcase**: Video player for project demonstrations
- **Publication Filtering**: Filter publications by type (conference, journal, preprint)
- **Animated Statistics**: Counter animations for publication/citation counts
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Dark Theme**: Cyberpunk-inspired color scheme with neon accents
- **Interactive Elements**: Hover effects, glitch animations, and smooth transitions

## Quick Start

1. Open `index.html` in your browser to view the website
2. Customize the content with your information (see below)

## Customization Guide

### 1. Personal Information

Edit `index.html` and replace the following:

- **Name**: Search for "Your Name" and replace with your actual name
- **University**: Replace "University Name" with your institution
- **Email**: Update `your.email@university.edu`
- **Profile Photo**: Replace `profile.jpg` with your photo (or update the `src` attribute)

### 2. Social Media Links

Update the social media links in the hero section:

```html
<a href="mailto:your.email@university.edu" class="social-icon" title="Email">
<a href="https://scholar.google.com/your-profile" target="_blank" class="social-icon" title="Google Scholar">
<a href="https://github.com/yourusername" target="_blank" class="social-icon" title="GitHub">
```

### 3. Research Interests

Update the research cards in the "Research Focus" section with your specific areas:

```html
<div class="research-card card-hover">
    <h3>Your Research Area</h3>
    <p>Description of your research focus</p>
    <div class="card-tech">
        <span>Technology 1</span>
        <span>Technology 2</span>
    </div>
</div>
```

### 4. Publications

Add your publications in the "Publications" section:

```html
<div class="publication-item" data-category="conference">
    <div class="pub-year">2024</div>
    <div class="pub-content">
        <h3 class="pub-title">Your Paper Title</h3>
        <p class="pub-authors"><strong>Your Name</strong>, Co-authors</p>
        <p class="pub-venue">
            <span class="venue-badge venue-conference">Conference Name 2024</span>
        </p>
        <div class="pub-links">
            <a href="paper.pdf" class="pub-link">
                <i class="fas fa-file-pdf"></i> Paper
            </a>
            <a href="https://github.com/..." class="pub-link">
                <i class="fab fa-github"></i> Code
            </a>
        </div>
    </div>
</div>
```

**Venue Badge Types**:
- `venue-conference`: For conference papers (blue)
- `venue-journal`: For journal papers (purple)
- `venue-preprint`: For preprints/arXiv (yellow)

### 5. Projects

#### Featured Project (with video)

```html
<div class="project-featured">
    <div class="project-visual">
        <div class="video-container">
            <video class="project-video" loop muted playsinline poster="poster.jpg">
                <source src="your-video.mp4" type="video/mp4">
            </video>
        </div>
    </div>
    <div class="project-details">
        <h3 class="project-title">Project Name</h3>
        <div class="project-description">
            <p>Project description...</p>
        </div>
        <div class="project-tech">
            <span class="tech-tag">PyTorch</span>
            <span class="tech-tag">CUDA</span>
        </div>
    </div>
</div>
```

#### Regular Project Cards

```html
<div class="project-card card-hover">
    <div class="project-image">
        <img src="project-image.jpg" alt="Project">
    </div>
    <div class="project-info">
        <h4>Project Title</h4>
        <p>Description...</p>
        <div class="project-meta">
            <span><i class="fas fa-code"></i> Python</span>
            <span><i class="fas fa-star"></i> 1.2k</span>
        </div>
    </div>
</div>
```

### 6. Statistics

Update the counter numbers in the About section:

```html
<h3 class="stat-number" data-target="15">0</h3>  <!-- Number of publications -->
<h3 class="stat-number" data-target="500">0</h3> <!-- Citation count -->
<h3 class="stat-number" data-target="8">0</h3>   <!-- Number of projects -->
```

### 7. Colors and Styling

Edit CSS variables in `style.css`:

```css
:root {
    --neon-blue: #00d9ff;      /* Primary accent color */
    --neon-purple: #b537f2;    /* Secondary accent color */
    --neon-pink: #ff006e;      /* Tertiary accent */
    --neon-green: #00ff88;     /* Success/highlight color */
}
```

### 8. Background Animation

Adjust particle count in `script.js`:

```javascript
const numberOfParticles = 100; // Increase/decrease for more/fewer particles
```

## File Structure

```
Home_Page/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/             # (Create this folder for your media)
    ├── profile.jpg     # Your profile photo
    ├── project1.jpg    # Project images
    ├── project1-demo.mp4  # Project videos
    └── ...
```

## Adding Media Files

1. Create an `assets` folder in the same directory as `index.html`
2. Add your images and videos to this folder
3. Update the paths in `index.html`:
   ```html
   <img src="assets/profile.jpg" alt="Your Name">
   <video src="assets/project-demo.mp4"></video>
   ```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Best Results

1. **Images**: Use high-quality images (profile: 350×350px, projects: 400×300px)
2. **Videos**: Keep video files under 10MB for faster loading
3. **Links**: Always test your links after adding them
4. **Mobile**: Check how your site looks on mobile devices
5. **Performance**: Optimize images before uploading (use tools like TinyPNG)

## Interactive Features

- **Particle Background**: Moves and connects dynamically
- **Hover Effects**: Cards glow and lift on hover
- **Video Controls**: Click play button or video to control playback
- **Publication Filter**: Click filter buttons to show specific types
- **Smooth Scrolling**: Click nav links for smooth scroll to sections
- **Counter Animation**: Statistics count up when scrolling into view
- **Easter Egg**: Try the Konami Code (↑↑↓↓←→←→BA)

## Deployment

### GitHub Pages

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Custom Domain

1. Add a `CNAME` file with your domain name
2. Update DNS settings with your domain provider
3. Point to GitHub Pages servers

## Troubleshooting

**Particles not showing?**
- Make sure JavaScript is enabled
- Check browser console for errors

**Videos not playing?**
- Ensure video files are in the correct format (MP4 H.264)
- Check file paths are correct

**Styles look broken?**
- Verify all CSS files are loaded
- Clear browser cache

## License

Feel free to use this template for your personal academic website. Attribution is appreciated but not required.

## Credits

Built with:
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Canvas API for particles animation

---

**Need help?** Check the comments in the code files for more detailed information about each section.
