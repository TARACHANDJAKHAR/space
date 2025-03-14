# 🚀 Space Explorer Website

A modern, responsive website dedicated to space exploration, offering an immersive journey through our solar system and beyond. Built with Node.js and Express, this project combines stunning visuals with educational content.

## ✨ Features

- **Immersive Design**: Sleek, modern interface with responsive layouts for all devices
- **Interactive Experience**: Dynamic content loading and smooth animations
- **Educational Content**: Detailed information about planets, space missions, and astronomical phenomena
- **Real-time Updates**: Integration with space-related APIs for latest news and data
- **Accessibility**: WCAG compliant design ensuring content is accessible to all users

## 📱 Pages

1. **Home** (`/`)
   - Featured planets carousel
   - Latest space news
   - Mission highlights
   
2. **Planets** (`/planets`)
   - Interactive solar system gallery
   - Detailed planetary information
   - High-resolution NASA imagery
   
3. **Exploration** (`/exploration`)
   - Interactive space mission timeline
   - Mission details and achievements
   - Future mission previews
   
4. **About** (`/about`)
   - Project background
   - Space facts and statistics
   - Educational resources
   
5. **Contact** (`/contact`)
   - Inquiry form
   - Newsletter signup
   - Social media links

## 🛠️ Technologies

### Frontend
- HTML5 & CSS3
  - CSS Grid & Flexbox
  - CSS Variables
  - Responsive design
- JavaScript (ES6+)
  - Fetch API
  - Intersection Observer
  - Local Storage
- Font Awesome v6
- Google Fonts

### Backend
- Node.js v18+
- Express.js v4.18
- EJS templating
- MongoDB (for data storage)
- Body-parser middleware

## 📁 Project Structure

```
space-explorer/
├── assets/
│   ├── images/       # Image resources
│   ├── icons/        # UI icons and favicons
│   └── videos/       # Video content
├── public/
│   ├── js/          # Client-side JavaScript
│   ├── css/         # Compiled CSS
│   └── html/        # Static pages
├── server/
│   ├── routes/      # Express routes
│   ├── models/      # Data models
│   ├── controllers/ # Business logic
│   └── config/      # Configuration files
├── views/           # EJS templates
├── tests/           # Test suites
├── package.json
└── README.md
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v18 or higher)
   - npm or yarn
   - MongoDB (local or Atlas)

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/tarachandjakhar/space.git
   
   # Navigate to project directory
   cd space
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env
   ```

3. **Configuration**
   - Update `.env` with your MongoDB URI
   - Configure API keys if needed

4. **Running the Application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the Website**
   - Open `http://localhost:3000` in your browser
   - API documentation available at `http://localhost:3000/api-docs`

## 🔧 Development

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build production assets
- `npm test`: Run test suite
- `npm run lint`: Lint code
- `npm run format`: Format code

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎯 Future Roadmap

- [ ] User authentication system
- [ ] Interactive 3D planet models using Three.js
- [ ] Real-time space events calendar
- [ ] Dark/light theme toggle
- [ ] Mobile app version
- [ ] AR features for planet visualization

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Planet data and images courtesy of NASA
- Space mission information from ESA and SpaceX
- Icons from Font Awesome
- Community contributors and supporters

## 📞 Contact

- **Developer**: TARACHAND JAKHAR

---
Made with ❤️ for space enthusiasts
