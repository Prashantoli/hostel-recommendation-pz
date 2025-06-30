// Main application logic
class HostelFinder {
  constructor() {
    this.hostels = []
    this.filteredHostels = []
    this.currentUser = null
    this.init()
  }

  init() {
    this.checkAuthStatus()
    this.bindEvents()
    this.loadHostels()
  }

  checkAuthStatus() {
    const user = localStorage.getItem("currentUser")
    if (user) {
      this.currentUser = JSON.parse(user)
      this.updateUserInterface()
    }
  }

  updateUserInterface() {
    const userInfo = document.getElementById("userInfo")
    const guestInfo = document.getElementById("guestInfo")
    const userName = document.getElementById("userName")

    if (this.currentUser && userInfo && guestInfo && userName) {
      userInfo.style.display = "flex"
      guestInfo.style.display = "none"
      userName.textContent = this.currentUser.name
    }
  }

  bindEvents() {
    // Search functionality
    const searchBtn = document.getElementById("searchBtn")
    const searchInput = document.getElementById("searchInput")

    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.performSearch())
    }

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch()
        }
      })
    }

    // Filter functionality
    const filters = ["locationFilter", "priceFilter", "ratingFilter", "typeFilter"]
    filters.forEach((filterId) => {
      const filter = document.getElementById(filterId)
      if (filter) {
        filter.addEventListener("change", () => this.applyFilters())
      }
    })

    // Sort functionality
    const sortBy = document.getElementById("sortBy")
    if (sortBy) {
      sortBy.addEventListener("change", () => this.sortHostels())
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.logout())
    }
  }

  async loadHostels() {
    try {
      this.showLoading(true)
      const response = await fetch("/api/hostels")

      if (response.ok) {
        this.hostels = await response.json()
      } else {
        // Fallback to sample data if API is not available
        this.hostels = this.getSampleHostels()
      }

      this.filteredHostels = [...this.hostels]
      this.displayHostels()
    } catch (error) {
      console.error("Error loading hostels:", error)
      // Use sample data as fallback
      this.hostels = this.getSampleHostels()
      this.filteredHostels = [...this.hostels]
      this.displayHostels()
    } finally {
      this.showLoading(false)
    }
  }

  getSampleHostels() {
    return [
      {
        _id: "1",
        name: "Downtown Backpackers",
        location: "New York",
        price: 45,
        rating: 4.2,
        type: "Budget",
        image: "/placeholder.svg?height=200&width=350",
        description: "A cozy hostel in the heart of downtown with great amenities.",
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
      },
    ]
  }

  performSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim()

    if (searchTerm) {
      this.filteredHostels = this.hostels.filter(
        (hostel) =>
          hostel.name.toLowerCase().includes(searchTerm) ||
          hostel.location.toLowerCase().includes(searchTerm) ||
          hostel.description.toLowerCase().includes(searchTerm),
      )
    } else {
      this.filteredHostels = [...this.hostels]
    }

    this.applyFilters()
  }

  applyFilters() {
    let filtered = [...this.filteredHostels]

    // Location filter
    const locationFilter = document.getElementById("locationFilter").value
    if (locationFilter) {
      filtered = filtered.filter((hostel) => hostel.location === locationFilter)
    }

    // Price filter
    const priceFilter = document.getElementById("priceFilter").value
    if (priceFilter) {
      const [min, max] = this.parsePriceRange(priceFilter)
      filtered = filtered.filter((hostel) => {
        if (max === null) return hostel.price >= min
        return hostel.price >= min && hostel.price <= max
      })
    }

    // Rating filter
    const ratingFilter = document.getElementById("ratingFilter").value
    if (ratingFilter) {
      const minRating = Number.parseFloat(ratingFilter)
      filtered = filtered.filter((hostel) => hostel.rating >= minRating)
    }

    // Type filter
    const typeFilter = document.getElementById("typeFilter").value
    if (typeFilter) {
      filtered = filtered.filter((hostel) => hostel.type === typeFilter)
    }

    this.filteredHostels = filtered
    this.sortHostels()
  }

  parsePriceRange(range) {
    if (range === "201+") return [201, null]
    const [min, max] = range.split("-").map(Number)
    return [min, max]
  }

  sortHostels() {
    const sortBy = document.getElementById("sortBy").value

    this.filteredHostels.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    this.displayHostels()
  }

  displayHostels() {
    const hostelsList = document.getElementById("hostelsList")
    const noResults = document.getElementById("noResults")

    if (!hostelsList) return

    if (this.filteredHostels.length === 0) {
      hostelsList.innerHTML = ""
      if (noResults) noResults.style.display = "block"
      return
    }

    if (noResults) noResults.style.display = "none"

    hostelsList.innerHTML = this.filteredHostels
      .map(
        (hostel) => `
            <div class="hostel-card">
                <img src="${hostel.image}" alt="${hostel.name}" class="hostel-image">
                <div class="hostel-content">
                    <div class="hostel-header">
                        <h3 class="hostel-name">${hostel.name}</h3>
                        <div class="hostel-price">$${hostel.price}/night</div>
                    </div>
                    <div class="hostel-location">📍 ${hostel.location}</div>
                    <div class="hostel-rating">
                        <span class="stars">${this.generateStars(hostel.rating)}</span>
                        <span>${hostel.rating}</span>
                    </div>
                    <span class="hostel-type">${hostel.type}</span>
                    <div class="hostel-description">${hostel.description}</div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    let stars = "★".repeat(fullStars)
    if (hasHalfStar) stars += "☆"
    return stars
  }

  showLoading(show) {
    const loadingSpinner = document.getElementById("loadingSpinner")
    if (loadingSpinner) {
      loadingSpinner.style.display = show ? "block" : "none"
    }
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUser = null
    window.location.href = "login.html"
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HostelFinder()
})
