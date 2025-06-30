const express = require("express")
const router = express.Router()
const { hostels } = require("../server")

// Get all hostels with optional filtering
router.get("/", (req, res) => {
  try {
    let filteredHostels = [...hostels]

    // Apply filters based on query parameters
    const { name, location, minPrice, maxPrice, minRating, type } = req.query

    if (name) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (location) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.location.toLowerCase() === location.toLowerCase())
    }

    if (minPrice) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.price <= Number.parseFloat(maxPrice))
    }

    if (minRating) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.rating >= Number.parseFloat(minRating))
    }

    if (type) {
      filteredHostels = filteredHostels.filter((hostel) => hostel.type.toLowerCase() === type.toLowerCase())
    }

    res.json(filteredHostels)
  } catch (error) {
    console.error("Error fetching hostels:", error)
    res.status(500).json({ error: "Failed to fetch hostels" })
  }
})

// Get single hostel by ID
router.get("/:id", (req, res) => {
  try {
    const hostel = hostels.find((h) => h._id === req.params.id)

    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" })
    }

    res.json(hostel)
  } catch (error) {
    console.error("Error fetching hostel:", error)
    res.status(500).json({ error: "Failed to fetch hostel" })
  }
})

// Create new hostel (admin only)
router.post("/", (req, res) => {
  try {
    const { name, location, price, rating, type, image, description } = req.body

    // Validate required fields
    if (!name || !location || !price || !rating || !type) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newHostel = {
      _id: Date.now().toString(),
      name,
      location,
      price: Number.parseFloat(price),
      rating: Number.parseFloat(rating),
      type,
      image: image || "/placeholder.svg?height=200&width=350",
      description: description || "",
      createdAt: new Date(),
    }

    hostels.push(newHostel)
    res.status(201).json(newHostel)
  } catch (error) {
    console.error("Error creating hostel:", error)
    res.status(500).json({ error: "Failed to create hostel" })
  }
})

// Update hostel (admin only)
router.put("/:id", (req, res) => {
  try {
    const hostelIndex = hostels.findIndex((h) => h._id === req.params.id)

    if (hostelIndex === -1) {
      return res.status(404).json({ error: "Hostel not found" })
    }

    const { name, location, price, rating, type, image, description } = req.body

    // Update hostel
    hostels[hostelIndex] = {
      ...hostels[hostelIndex],
      name: name || hostels[hostelIndex].name,
      location: location || hostels[hostelIndex].location,
      price: price ? Number.parseFloat(price) : hostels[hostelIndex].price,
      rating: rating ? Number.parseFloat(rating) : hostels[hostelIndex].rating,
      type: type || hostels[hostelIndex].type,
      image: image || hostels[hostelIndex].image,
      description: description || hostels[hostelIndex].description,
      updatedAt: new Date(),
    }

    res.json(hostels[hostelIndex])
  } catch (error) {
    console.error("Error updating hostel:", error)
    res.status(500).json({ error: "Failed to update hostel" })
  }
})

// Delete hostel (admin only)
router.delete("/:id", (req, res) => {
  try {
    const hostelIndex = hostels.findIndex((h) => h._id === req.params.id)

    if (hostelIndex === -1) {
      return res.status(404).json({ error: "Hostel not found" })
    }

    const deletedHostel = hostels.splice(hostelIndex, 1)[0]
    res.json({ message: "Hostel deleted successfully", hostel: deletedHostel })
  } catch (error) {
    console.error("Error deleting hostel:", error)
    res.status(500).json({ error: "Failed to delete hostel" })
  }
})

module.exports = router
