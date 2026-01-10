# 🌐 Franco Garcia - Portfolio Website

> A modern, high-performance portfolio website showcasing my skills as a Full-Stack Developer and UI/UX Designer. Built with cutting-edge technologies and optimized for exceptional user experience across all devices.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-00d4ff?style=for-the-badge&logo=vercel)](https://garcia-franco-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

---

## ✨ Features

### 🎨 Design & User Experience
- **Minimalist Black Theme** - Professional, modern aesthetic with smooth animations
- **Fully Responsive** - Seamless experience across desktop, tablet, and mobile devices
- **3D Interactive Atom Visualization** - Dynamic tech stack showcase with smooth orbital animations
- **Performance Optimized** - Mobile-first approach with CSS animations and GPU acceleration
- **Smooth Scroll Navigation** - Intuitive section-based navigation with scroll indicators

### 🚀 Technical Highlights
- **Real-time Contact Form** - Integrated EmailJS for direct email submissions
- **Interactive Components** - Framer Motion animations for engaging user interactions
- **Modular Architecture** - Clean, maintainable codebase with component-based structure
- **SEO Optimized** - Semantic HTML and proper meta tags
- **Accessibility** - ARIA labels and keyboard navigation support

### 📱 Sections
- **Home** - Hero section with animated profile and introduction
- **About** - Professional background, skills, and expertise
- **Projects** - Showcase of featured projects with detailed descriptions
- **Achievements** - Certifications, accomplishments, and milestones
- **Connect** - Contact form and social media links

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library with hooks and functional components
- **Vite 4.5** - Lightning-fast build tool and dev server
- **Framer Motion** - Production-ready motion library for React
- **CSS3** - Custom styling with CSS variables and modern features
- **EmailJS** - Client-side email service integration

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database (configured for future features)
- **Mongoose** - MongoDB object modeling

### Deployment & DevOps
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and repository hosting
- **Git** - Distributed version control system

---

## 📦 Project Structure

```
GarciaFranco_Portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Home.jsx   # Hero section with profile
│   │   │   ├── About.jsx  # About section
│   │   │   ├── Projects.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Connect.jsx # Contact form
│   │   │   └── Atom.jsx   # 3D tech stack visualization
│   │   ├── assets/        # Static assets (images, icons)
│   │   └── App.jsx        # Main application component
│   ├── public/            # Public assets (PDFs, certificates)
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Express application
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
│
├── .github/               # GitHub configurations
├── vercel.json            # Vercel deployment configuration
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (optional, for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Coco120903/GarciaFranco_Portfolio.git
   cd GarciaFranco_Portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   - Create `.env` file in `client/` directory
   - Add EmailJS credentials (see `client/EMAILJS_SETUP.md` for details):
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

4. **Run the development server**
   ```bash
   # From root directory
   npm run dev
   ```
   This starts:
   - Frontend dev server (usually `http://localhost:5173`)
   - Backend server (usually `http://localhost:5000`)

---

## 🎯 Key Features Explained

### 3D Atom Visualization
An interactive 3D representation of my tech stack with:
- Smooth orbital animations
- GPU-accelerated CSS transforms
- Mobile-optimized performance
- Hover interactions for each technology

### Contact Form Integration
- Direct email submission via EmailJS
- No backend required for form handling
- Real-time validation and feedback
- Responsive design for all devices

### Performance Optimizations
- **Mobile-first** approach with reduced animations
- **CSS animations** for better GPU utilization
- **Intersection Observer** to pause animations when off-screen
- **Lazy loading** for components and images
- **Optimized bundle size** with Vite

---

## 📄 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend servers concurrently
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend dev server

### Client Directory
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Directory
- `npm run dev` - Start server with nodemon (auto-reload)
- `npm start` - Start server with Node.js

---

## 🌐 Deployment

This project is deployed on **Vercel** for optimal performance and global CDN distribution.

**Live URL:** [garcia-franco-portfolio.vercel.app](https://garcia-franco-portfolio.vercel.app)

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

## 📝 Documentation

- **[EmailJS Setup Guide](./client/EMAILJS_SETUP.md)** - Configure contact form email service
- **[GitHub Setup Guide](./GITHUB_SETUP.md)** - Repository setup instructions
- **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Deployment walkthrough

---

## 🎨 Design Philosophy

This portfolio emphasizes:
- **Simplicity** - Clean, uncluttered interface
- **Performance** - Fast loading and smooth animations
- **Accessibility** - Usable by everyone
- **Modern Aesthetics** - Contemporary design trends
- **User Experience** - Intuitive navigation and interactions

---

## 🔧 Customization

### Adding Your Profile Image
1. Place your profile image in `client/src/assets/`
2. Update the import in `client/src/components/Home.jsx`
3. Adjust size in `client/src/index.css` (`.profile-image`)

### Modifying Colors
- Edit CSS variables in component stylesheets
- Primary accent color: `#00d4ff` (cyan blue)
- Background: `#000000` (black)

### Adding Projects
- Edit `client/src/components/Projects.jsx`
- Follow the existing project card structure
- Add project images to `client/public/images/`

---

## 📊 Performance Metrics

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Mobile Optimization**: Optimized animations and reduced element count
- **Bundle Size**: Optimized with Vite's tree-shaking
- **Load Time**: < 2s on average connection

---

## 🤝 Contributing

This is a personal portfolio project. However, suggestions and feedback are welcome!

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Franco Angelov E. Garcia**

- 📧 Email: [franco__garcia@hotmail.com](mailto:franco__garcia@hotmail.com)
- 💼 LinkedIn: [linkedin.com/in/franco-angelov-e-garcia](https://www.linkedin.com/in/franco-angelov-e-garcia-2530933a4/)
- 💻 GitHub: [@Coco120903](https://github.com/Coco120903)
- 🌐 Portfolio: [garcia-franco-portfolio.vercel.app](https://garcia-franco-portfolio.vercel.app)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Framer Motion** - For smooth animations
- **Vite** - For excellent developer experience
- **Vercel** - For seamless deployment
- **EmailJS** - For contact form functionality

---

<div align="center">

**Built with ❤️ by Franco Garcia**

⭐ Star this repo if you find it helpful!

</div>
