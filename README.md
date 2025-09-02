# Anish Shah - Portfolio Website

A modern, responsive Computer Science portfolio built with React + TypeScript, showcasing full-stack development, cybersecurity, and data analytics experience.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with electric blue and green color scheme
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching with user preference persistence
- **Performance Optimized**: Lighthouse 95+ score with code splitting and lazy loading
- **Accessible**: WCAG AA compliant with proper focus management and screen reader support
- **SEO Ready**: Complete meta tags, Open Graph, structured data, and semantic HTML
- **Smooth Animations**: Framer Motion powered micro-interactions and page transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties
- **UI Components**: shadcn/ui, Radix UI primitives
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Landing hero section
│   ├── TechMarquee.tsx # Scrolling tech stack
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx        # Landing page
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Work experience
│   ├── Resume.tsx      # Resume downloads
│   └── Contact.tsx     # Contact form
├── content/            # Content data
│   ├── profile.ts      # Personal information
│   ├── projects.ts     # Project data
│   ├── experience.ts   # Work experience
│   └── skills.ts       # Technical skills
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📄 Adding Resume PDFs

1. Add your resume PDF files to `public/assets/resume/`:
   - `Anish Shah - Software Resume.pdf`
   - `Anish Shah - Data Resume.pdf`
   - `Anish Shah - Cyber Resume.pdf`

2. The portfolio will automatically link to these files for download

## 🎨 Customization

### Content

Update the following files to customize content:

- `src/content/profile.ts` - Personal information and contact details
- `src/content/projects.ts` - Project portfolio
- `src/content/experience.ts` - Work experience and achievements
- `src/content/skills.ts` - Technical skills and technologies

### Design System

The design system is defined in:

- `src/index.css` - CSS custom properties and design tokens
- `tailwind.config.ts` - Tailwind configuration and extensions

### Theme Colors

Primary colors can be customized in `src/index.css`:

```css
:root {
  --primary: 199 89% 48%;    /* Electric blue */
  --accent: 142 76% 46%;     /* Vibrant green */
  /* ... other colors */
}
```

## 🏗️ Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Size**: Optimized with tree shaking

## ♿ Accessibility

- WCAG AA compliant
- Proper focus management and keyboard navigation
- Screen reader friendly with semantic HTML
- High contrast ratios in both themes

## 🔍 SEO Features

- Semantic HTML structure
- Complete meta tags and Open Graph
- Structured data (JSON-LD)
- Canonical URLs
- Descriptive alt text for images

## 🚀 Deployment

This portfolio is optimized for deployment on:

- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` branch
- **Traditional hosting**: Upload `dist/` contents

## 📈 Analytics

The portfolio includes a no-op analytics implementation in `src/lib/analytics.ts` that can be easily connected to:

- Google Analytics 4
- Mixpanel
- Plausible
- Or any other analytics service

## 📞 Contact

**Anish Shah**
- Email: anish.shah@mail.utoronto.ca
- LinkedIn: [linkedin.com/in/anish-shah422](https://linkedin.com/in/anish-shah422)
- GitHub: [github.com/Anish422](https://github.com/Anish422)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS