const express = require("express")
const router = express.Router()

// Mock user data (in production, use a proper database)
const users = [
  {
    id: "1",
    email: "admin@hostel.com",
    password: "admin123",
    name: "Admin User",
    type: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    type: "user",
  },
]

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body

  // Find user
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // In production, use proper JWT tokens
    const { password: _, ...userWithoutPassword } = user
    res.json({
      success: true,
      user: userWithoutPassword,
      token: "mock-jwt-token",
    })
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
  }
})

// Social login endpoints
router.post("/google", (req, res) => {
  // In production, verify Google OAuth token
  const { token } = req.body

  // Mock successful Google login
  res.json({
    success: true,
    user: {
      id: "google-" + Date.now(),
      email: "user@gmail.com",
      name: "Google User",
      type: "user",
      provider: "google",
    },
    token: "mock-jwt-token",
  })
})

router.post("/facebook", (req, res) => {
  // In production, verify Facebook OAuth token
  const { token } = req.body

  // Mock successful Facebook login
  res.json({
    success: true,
    user: {
      id: "facebook-" + Date.now(),
      email: "user@facebook.com",
      name: "Facebook User",
      type: "user",
      provider: "facebook",
    },
    token: "mock-jwt-token",
  })
})

// Logout endpoint
router.post("/logout", (req, res) => {
  // In production, invalidate the JWT token
  res.json({ success: true, message: "Logged out successfully" })
})

module.exports = router
