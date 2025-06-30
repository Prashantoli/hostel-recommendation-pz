// Hostel model (for MongoDB integration)
const mongoose = require("mongoose")

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    type: {
      type: String,
      required: true,
      enum: ["Budget", "Luxury", "Boutique"],
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=200&width=350",
    },
    description: {
      type: String,
      trim: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for better search performance
hostelSchema.index({ name: "text", description: "text" })
hostelSchema.index({ location: 1 })
hostelSchema.index({ price: 1 })
hostelSchema.index({ rating: -1 })
hostelSchema.index({ type: 1 })

module.exports = mongoose.model("Hostel", hostelSchema)
