# Music Library

A modern React application demonstrating micro frontend architecture, authentication, and advanced JavaScript array methods. Built with React 19, Vite, and Module Federation.

## Features

### Core Functionality
- **Music Library Interface**: Clean, modern UI for browsing your music collection
- **Advanced Filtering**: Real-time search across title, artist, and album
- **Smart Sorting**: Multi-field sorting (title, artist, album, year) with direction control
- **Dynamic Grouping**: Organize songs by artist, album, or genre
- **JavaScript Methods**: Extensive use of `map()`, `filter()`, and `reduce()`

### Architecture
- **Micro Frontend**: Modular architecture using Webpack Module Federation
- **Authentication System**: JWT-based auth with role management
- **Role-Based Access Control**: Different permissions for admin and regular users
- **Persistent Sessions**: Automatic session management with localStorage

### User Roles
- **Admin Users**
  - Add new songs to the library
  - Delete existing songs
  - Full library management access
  
- **Regular Users**
  - Browse and search music library
  - Filter and sort collections
  - View-only access

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/music-library.git
   cd music-library
   ```

2. **Install dependencies for both applications**
   ```bash
   # Install music library dependencies
   cd music-library
   npm install
   
   # Install main app dependencies
   cd ../main-app
   npm install
   ```

3. **Start the development servers**
   
   **Terminal 1 - Music Library Micro Frontend:**
   ```bash
   cd music-library
   npm run dev
   ```
   *Runs on http://localhost:5001*
   
   **Terminal 2 - Main Application:**
   ```bash
   cd main-app
   npm run dev
   ```
   *Runs on http://localhost:5000*

4. **Open your browser**
   Navigate to `http://localhost:5000` to access the application

### Demo Credentials

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| **Admin** | `admin` | `admin123` | Add/Delete songs, Full access |
| **User** | `user` | `user123` | View/Filter songs only |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Main App (Host)                      │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │  Authentication │    │      App Shell             │ │
│  │  - Login/Logout │    │  - Header                  │ │
│  │  - JWT Handling │    │  - Navigation              │ │
│  │  - Role Mgmt    │    │  - Micro Frontend Loader   │ │
│  └─────────────────┘    └─────────────────────────────┘ │
│              │                          │               │
│              └──────────┬───────────────┘               │
│                         │                               │
└─────────────────────────┼─────────────────────────────────┘
                          │ Module Federation
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Music Library (Remote)                     │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                MusicLibrary Component               │ │
│  │  - Song Display Grid                                │ │
│  │  - Filter/Sort/Group Controls                      │ │
│  │  - Add/Delete Songs (Admin only)                   │ │
│  │  - JavaScript Array Methods                        │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Technical Stack

### Frontend
- **React 19**: Functional components with hooks
- **Vite**: Fast build tool and dev server
- **Module Federation**: Micro frontend orchestration
- **CSS3**: Modern styling with gradients and animations

### State Management
- **React Context**: Authentication state
- **useState/useReducer**: Local component state
- **localStorage**: Session persistence

### JavaScript Features
- **Array Methods**: Extensive use of `map()`, `filter()`, `reduce()`
- **ES6+ Features**: Destructuring, arrow functions, template literals
- **Async/Await**: Promise-based authentication flow

## Project Structure

```
music-library/
├── main-app/                 # Host application
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── AuthContext.jsx  # Authentication context
│   │   ├── Login.jsx        # Login component
│   │   ├── main.jsx         # Entry point
│   │   └── *.css            # Styling files
│   ├── vite.config.js       # Vite + Module Federation config
│   ├── package.json         # Dependencies and scripts
│   └── netlify.toml         # Deployment configuration
│
├── music-library/            # Micro frontend
│   ├── src/
│   │   ├── MusicLibrary.jsx # Main music library component
│   │   ├── main.jsx         # Entry point
│   │   └── *.css            # Styling files
│   ├── vite.config.js       # Vite + Module Federation config
│   ├── package.json         # Dependencies and scripts  
│   └── netlify.toml         # Deployment configuration
│
└── README.md                # This file
```

## Development Commands

```bash
# Music Library Commands
cd music-library
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build

# Main App Commands  
cd main-app
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

### Automatic Deployment
Both applications are configured for easy deployment on:
- **Netlify** (recommended)
- **Vercel** 
- **GitHub Pages**

### Manual Deployment Steps

1. **Deploy Music Library First**
   - Deploy the `music-library` folder to your hosting platform
   - Note the deployed URL (e.g., `https://your-music-library.netlify.app`)

2. **Deploy Main App**
   - Update `src/main.jsx` in main-app with the deployed music library URL
   - Deploy the `main-app` folder
   - Access your application at the main app URL

### Environment Variables
For production deployment, set:
```bash
# In main-app deployment
VITE_MUSIC_LIBRARY_URL=https://your-music-library-url.com/assets/remoteEntry.js
```

## Testing the Application

### Manual Test Scenarios

1. **Authentication Flow**
   - Test login with both admin and user credentials
   - Verify role-based UI differences
   - Test session persistence (refresh browser)
   - Test logout functionality

2. **Music Library Features**
   - Search for songs by title, artist, album
   - Test sorting by different fields and directions
   - Try grouping by artist, album, genre
   - (Admin only) Add and delete songs

3. **Micro Frontend Integration**
   - Verify music library loads correctly
   - Test error handling (stop music-library server)
   - Test refresh functionality

## Troubleshooting

### Common Issues

1. **Music Library Not Loading**
   - Ensure music-library is running on port 5001
   - Check browser console for CORS errors
   - Verify Module Federation configuration

2. **Authentication Issues**
   - Check localStorage for stored tokens
   - Verify JWT token structure in browser dev tools
   - Clear localStorage if needed

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify Vite configuration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Key Learning Outcomes

This project demonstrates proficiency in:
- React Fundamentals: Hooks, components, state management
- Micro Frontend Architecture: Module Federation, remote loading
- Authentication: JWT implementation, role-based access
- JavaScript Mastery: Array methods, ES6+ features
- Modern Tooling: Vite, Module Federation, deployment
- UI/UX Design: Responsive design, modern aesthetics


