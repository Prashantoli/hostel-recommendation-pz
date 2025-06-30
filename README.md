# Hostel Recommendation System

A full-stack web application for finding and managing hostels with smart search and filtering capabilities.

## Features

- **User Authentication**: Google and Facebook OAuth integration
- **Smart Search**: Search hostels by name, location, and description
- **Advanced Filtering**: Filter by location, price range, rating, and type
- **Responsive Design**: Works on desktop and mobile devices
- **Admin Panel**: Add, edit, and delete hostel listings
- **Real-time Updates**: Dynamic content updates without page refresh

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with CSS Grid and Flexbox
- Vanilla JavaScript for DOM manipulation and API calls

### Backend
- Node.js with Express.js
- RESTful API design
- Passport.js for OAuth authentication
- MongoDB with Mongoose ODM

### Database
- MongoDB for data storage
- Indexed collections for optimized search

## Project Structure

\`\`\`
hostel-recommendation-system/
│
├── client/              → Frontend files
│   ├── index.html       → Landing page
│   ├── login.html       → Authentication page
│   ├── home.html        → Main search page
│   ├── admin.html       → Admin panel
│   ├── styles/
│   │   └── main.css     → All styles
│   └── scripts/
│       ├── main.js      → Main application logic
│       ├── auth.js      → Authentication handling
│       ├── api.js       → API communication
│       └── admin.js     → Admin panel functionality
│
├── server/              → Backend files
│   ├── server.js        → Main server file
│   ├── routes/
│   │   ├── auth.js      → Authentication routes
│   │   ├── hostels.js   → Hostel CRUD operations
│   │   └── admin.js     → Admin-specific routes
│   ├── models/
│   │   └── Hostel.js    → Hostel data model
│   └── config/
│       └── passport.js  → OAuth configuration
│
├── database/
│   └── mongodb_setup.js → Database setup and seeding
│
├── .env                 → Environment variables
└── README.md           → This file
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials (optional)
- Facebook OAuth credentials (optional)

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd hostel-recommendation-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install express cors dotenv mongoose passport passport-google-oauth20 passport-facebook
   \`\`\`

3. **Set up environment variables**
   - Copy \`.env.example\` to \`.env\`
   - Fill in your MongoDB URI and OAuth credentials

4. **Start MongoDB**
   \`\`\`bash
   # If using local MongoDB
   mongod
   \`\`\`

5. **Run the application**
   \`\`\`bash
   node server/server.js
   \`\`\`

6. **Access the application**
   - Open your browser and go to \`http://localhost:3000\`

## API Endpoints

### Authentication
- \`POST /api/auth/login\` - User login
- \`POST /api/auth/google\` - Google OAuth
- \`POST /api/auth/facebook\` - Facebook OAuth
- \`POST /api/auth/logout\` - User logout

### Hostels
- \`GET /api/hostels\` - Get all hostels (with optional filters)
- \`GET /api/hostels/:id\` - Get single hostel
- \`POST /api/hostels\` - Create new hostel (admin only)
- \`PUT /api/hostels/:id\` - Update hostel (admin only)
- \`DELETE /api/hostels/:id\` - Delete hostel (admin only)

### Admin
- \`GET /api/admin/stats\` - Get admin statistics
- \`GET /api/admin/hostels\` - Get all hostels for admin

## Usage

### For Users
1. Visit the homepage
2. Login with Google/Facebook or use guest mode
3. Search for hostels using the search bar
4. Apply filters to narrow down results
5. Sort results by name, price, or rating

### For Admins
1. Login with admin credentials (admin@hostel.com / admin123)
2. Access the admin panel
3. Add new hostels using the form
4. Edit or delete existing hostels
5. View hostel statistics

## Features in Detail

### Search & Filtering
- **Text Search**: Search by hostel name, location, or description
- **Location Filter**: Filter by specific cities
- **Price Range**: Filter by price brackets
- **Rating Filter**: Show hostels above certain ratings
- **Type Filter**: Filter by hostel type (Budget, Luxury, Boutique)

### Recommendation System
- Context-based filtering using JavaScript
- Dynamic sorting by multiple criteria
- Real-time search results without page refresh

### Admin Features
- Full CRUD operations for hostel management
- Form validation and error handling
- Responsive admin interface
- Bulk operations support

## Security Features
- Input validation and sanitization
- CORS protection
- Environment variable protection
- OAuth integration for secure authentication

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Support
For support or questions, please open an issue in the repository.
\`\`\`

## Demo Credentials
- **Admin**: admin@hostel.com / admin123
- **User**: user@example.com / user123
- **Guest**: No login required for browsing
