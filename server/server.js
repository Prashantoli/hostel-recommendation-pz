const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../client")))

// Sample data (in production, this would come from MongoDB)
const hostels = [
  {
    _id: "1",
    name: "Downtown Backpackers",
    location: "New York",
    price: 45,
    rating: 4.2,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "A cozy hostel in the heart of downtown with great amenities.",
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Luxury Stay Hostel",
    location: "Los Angeles",
    price: 120,
    rating: 4.8,
    type: "Luxury",
    image: "/placeholder.svg?height=200&width=350",
    description: "Premium hostel experience with top-notch facilities.",
    createdAt: new Date(),
  },
  {
    _id: "3",
    name: "Beach View Hostel",
    location: "Miami",
    price: 75,
    rating: 4.5,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Beautiful ocean views and modern amenities.",
    createdAt: new Date(),
  },
  {
    _id: "4",
    name: "City Center Lodge",
    location: "Chicago",
    price: 60,
    rating: 4.0,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Convenient location with easy access to public transport.",
    createdAt: new Date(),
  },
  {
    _id: "5",
    name: "Golden Gate Hostel",
    location: "San Francisco",
    price: 95,
    rating: 4.6,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Stylish hostel near the famous Golden Gate Bridge.",
    createdAt: new Date(),
  },
  {
    _id: "6",
    name: "Budget Traveler Inn",
    location: "New York",
    price: 35,
    rating: 3.8,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Affordable accommodation for budget-conscious travelers.",
    createdAt: new Date(),
  },
]

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/hostels", require("./routes/hostels"))
app.use("/api/admin", require("./routes/admin"))

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT} to view the application`)
})

// Export hostels data for use in routes
module.exports = { hostels }
