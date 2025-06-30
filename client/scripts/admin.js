// Admin panel functionality
class AdminPanel {
  constructor() {
    this.hostels = []
    this.editingHostel = null
    this.init()
  }

  init() {
    this.checkAdminAuth()
    this.bindEvents()
    this.loadHostels()
  }

  checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.email || !currentUser.email.includes("admin")) {
      // For demo purposes, allow access but show warning
      console.warn("Admin access - in production, implement proper role-based authentication")
    }
  }

  bindEvents() {
    // Add hostel button
    const addHostelBtn = document.getElementById("addHostelBtn")
    if (addHostelBtn) {
      addHostelBtn.addEventListener("click", () => this.showAddForm())
    }

    // Form submission
    const addEditForm = document.getElementById("addEditForm")
    if (addEditForm) {
      addEditForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // Cancel form
    const cancelForm = document.getElementById("cancelForm")
    if (cancelForm) {
      cancelForm.addEventListener("click", () => this.hideForm())
    }

    // Admin logout
    const adminLogoutBtn = document.getElementById("adminLogoutBtn")
    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener("click", () => this.logout())
    }
  }

  async loadHostels() {
    try {
      // Try to load from API, fallback to sample data
      const response = await fetch("/api/hostels")
      if (response.ok) {
        this.hostels = await response.json()
      } else {
        this.hostels = this.getSampleHostels()
      }
    } catch (error) {
      console.error("Error loading hostels:", error)
      this.hostels = this.getSampleHostels()
    }

    this.displayAdminHostels()
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
    ]
  }

  displayAdminHostels() {
    const adminHostelsList = document.getElementById("adminHostelsList")
    if (!adminHostelsList) return

    if (this.hostels.length === 0) {
      adminHostelsList.innerHTML = "<p>No hostels found.</p>"
      return
    }

    adminHostelsList.innerHTML = `
            <div class="table-header">
                <div>Name</div>
                <div>Location</div>
                <div>Price</div>
                <div>Rating</div>
                <div>Type</div>
                <div>Actions</div>
            </div>
            ${this.hostels
              .map(
                (hostel) => `
                <div class="table-row">
                    <div><strong>${hostel.name}</strong></div>
                    <div>${hostel.location}</div>
                    <div>$${hostel.price}</div>
                    <div>${hostel.rating} ⭐</div>
                    <div>${hostel.type}</div>
                    <div class="table-actions">
                        <button class="btn btn-edit" onclick="adminPanel.editHostel('${hostel._id}')">Edit</button>
                        <button class="btn btn-delete" onclick="adminPanel.deleteHostel('${hostel._id}')">Delete</button>
                    </div>
                </div>
            `,
              )
              .join("")}
        `
  }

  showAddForm() {
    this.editingHostel = null
    document.getElementById("formTitle").textContent = "Add New Hostel"
    document.getElementById("addEditForm").reset()
    document.getElementById("hostelId").value = ""
    document.getElementById("hostelForm").style.display = "block"
    document.getElementById("hostelForm").scrollIntoView({ behavior: "smooth" })
  }

  editHostel(id) {
    this.editingHostel = this.hostels.find((h) => h._id === id)
    if (!this.editingHostel) return

    document.getElementById("formTitle").textContent = "Edit Hostel"
    document.getElementById("hostelId").value = this.editingHostel._id
    document.getElementById("hostelName").value = this.editingHostel.name
    document.getElementById("hostelLocation").value = this.editingHostel.location
    document.getElementById("hostelPrice").value = this.editingHostel.price
    document.getElementById("hostelRating").value = this.editingHostel.rating
    document.getElementById("hostelType").value = this.editingHostel.type
    document.getElementById("hostelImage").value = this.editingHostel.image
    document.getElementById("hostelDescription").value = this.editingHostel.description

    document.getElementById("hostelForm").style.display = "block"
    document.getElementById("hostelForm").scrollIntoView({ behavior: "smooth" })
  }

  async handleFormSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const hostelData = {
      name: formData.get("name"),
      location: formData.get("location"),
      price: Number.parseFloat(formData.get("price")),
      rating: Number.parseFloat(formData.get("rating")),
      type: formData.get("type"),
      image: formData.get("image") || "/placeholder.svg?height=200&width=350",
      description: formData.get("description"),
    }

    try {
      const hostelId = document.getElementById("hostelId").value

      if (hostelId) {
        // Update existing hostel
        await this.updateHostel(hostelId, hostelData)
        this.showSuccess("Hostel updated successfully!")
      } else {
        // Add new hostel
        await this.addHostel(hostelData)
        this.showSuccess("Hostel added successfully!")
      }

      this.hideForm()
      this.loadHostels()
    } catch (error) {
      console.error("Error saving hostel:", error)
      this.showError("Error saving hostel. Please try again.")
    }
  }

  async addHostel(hostelData) {
    // Simulate API call
    const newHostel = {
      _id: Date.now().toString(),
      ...hostelData,
    }

    this.hostels.push(newHostel)

    // In a real app, this would be an API call
    // await apiClient.createHostel(hostelData);
  }

  async updateHostel(id, hostelData) {
    // Simulate API call
    const index = this.hostels.findIndex((h) => h._id === id)
    if (index !== -1) {
      this.hostels[index] = { _id: id, ...hostelData }
    }

    // In a real app, this would be an API call
    // await apiClient.updateHostel(id, hostelData);
  }

  async deleteHostel(id) {
    if (!confirm("Are you sure you want to delete this hostel?")) {
      return
    }

    try {
      // Simulate API call
      this.hostels = this.hostels.filter((h) => h._id !== id)

      // In a real app, this would be an API call
      // await apiClient.deleteHostel(id);

      this.displayAdminHostels()
      this.showSuccess("Hostel deleted successfully!")
    } catch (error) {
      console.error("Error deleting hostel:", error)
      this.showError("Error deleting hostel. Please try again.")
    }
  }

  hideForm() {
    document.getElementById("hostelForm").style.display = "none"
    document.getElementById("addEditForm").reset()
    this.editingHostel = null
  }

  showSuccess(message) {
    this.showMessage(message, "success")
  }

  showError(message) {
    this.showMessage(message, "error")
  }

  showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}`
    messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            ${type === "success" ? "background: #28a745;" : "background: #dc3545;"}
        `
    messageDiv.textContent = message

    document.body.appendChild(messageDiv)

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv)
      }
    }, 3000)
  }

  logout() {
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
  }
}

// Create global admin panel instance
let adminPanel

document.addEventListener("DOMContentLoaded", () => {
  adminPanel = new AdminPanel()
})
