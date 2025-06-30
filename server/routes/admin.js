const express = require("express")
const router = express.Router()
const { hostels } = require("../server")

// Get admin statistics
router.get("/stats", (req, res) => {
  try {
    const stats = {
      totalHostels: hostels.length,
      averagePrice: hostels.reduce((sum, h) => sum + h.price, 0) / hostels.length,
      averageRating: hostels.reduce((sum, h) => sum + h.rating, 0) / hostels.length,
      hostelsByType: hostels.reduce((acc, h) => {
        acc[h.type] = (acc[h.type] || 0) + 1
        return acc
      }, {}),
      hostelsByLocation: hostels.reduce((acc, h) => {
        acc[h.location] = (acc[h.location] || 0) + 1
        return acc
      }, {}),
    }

    res.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    res.status(500).json({ error: "Failed to fetch statistics" })
  }
})

// Get all hostels for admin management
router.get("/hostels", (req, res) => {
  try {
    res.json(hostels)
  } catch (error) {
    console.error("Error fetching hostels for admin:", error)
    res.status(500).json({ error: "Failed to fetch hostels" })
  }
})

module.exports = router
