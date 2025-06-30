// MongoDB initialization script for Docker
const db = db.getSiblingDB("hostel_finder")

// Create collections
db.createCollection("hostels")
db.createCollection("users")

// Insert sample hostels data
db.hostels.insertMany([
  {
    name: "Downtown Backpackers",
    location: "New York",
    price: 45,
    rating: 4.2,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "A cozy hostel in the heart of downtown with great amenities.",
    amenities: ["WiFi", "Kitchen", "Laundry", "Common Room"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Luxury Stay Hostel",
    location: "Los Angeles",
    price: 120,
    rating: 4.8,
    type: "Luxury",
    image: "/placeholder.svg?height=200&width=350",
    description: "Premium hostel experience with top-notch facilities.",
    amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Beach View Hostel",
    location: "Miami",
    price: 75,
    rating: 4.5,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Beautiful ocean views and modern amenities.",
    amenities: ["WiFi", "Beach Access", "Bar", "Kitchen"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "City Center Lodge",
    location: "Chicago",
    price: 60,
    rating: 4.0,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Convenient location with easy access to public transport.",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Golden Gate Hostel",
    location: "San Francisco",
    price: 95,
    rating: 4.6,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Stylish hostel near the famous Golden Gate Bridge.",
    amenities: ["WiFi", "Kitchen", "Rooftop Terrace", "Bike Rental"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Budget Traveler Inn",
    location: "New York",
    price: 35,
    rating: 3.8,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Affordable accommodation for budget-conscious travelers.",
    amenities: ["WiFi", "Kitchen", "Common Room"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
])

// Create indexes for better performance
db.hostels.createIndex({ name: "text", description: "text" })
db.hostels.createIndex({ location: 1 })
db.hostels.createIndex({ price: 1 })
db.hostels.createIndex({ rating: -1 })
db.hostels.createIndex({ type: 1 })

// Insert sample users
db.users.insertMany([
  {
    email: "admin@hostel.com",
    password: "admin123",
    name: "Admin User",
    type: "admin",
    createdAt: new Date(),
  },
  {
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    type: "user",
    createdAt: new Date(),
  },
])

// Create index for users
db.users.createIndex({ email: 1 }, { unique: true })

print("Database initialized with sample data!")
