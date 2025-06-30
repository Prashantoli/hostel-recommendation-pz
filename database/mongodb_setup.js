const mongoose = require("mongoose")
const Hostel = require("../server/models/Hostel")

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hostel_finder", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)

    // Seed database with sample data if empty
    await seedDatabase()
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

// Seed database with sample hostels
const seedDatabase = async () => {
  try {
    const count = await Hostel.countDocuments()

    if (count === 0) {
      console.log("Seeding database with sample hostels...")

      const sampleHostels = [
        {
          name: "Downtown Backpackers",
          location: "New York",
          price: 45,
          rating: 4.2,
          type: "Budget",
          image: "/placeholder.svg?height=200&width=350",
          description: "A cozy hostel in the heart of downtown with great amenities.",
          amenities: ["WiFi", "Kitchen", "Laundry", "Common Room"],
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
        },
      ]

      await Hostel.insertMany(sampleHostels)
      console.log("Database seeded successfully!")
    }
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

module.exports = connectDB
