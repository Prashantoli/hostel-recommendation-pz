// API communication layer
class APIClient {
  constructor() {
    this.baseURL = "/api"
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Hostel endpoints
  async getHostels(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/hostels?${queryString}` : "/hostels"
    return this.request(endpoint)
  }

  async getHostel(id) {
    return this.request(`/hostels/${id}`)
  }

  async createHostel(hostelData) {
    return this.request("/hostels", {
      method: "POST",
      body: JSON.stringify(hostelData),
    })
  }

  async updateHostel(id, hostelData) {
    return this.request(`/hostels/${id}`, {
      method: "PUT",
      body: JSON.stringify(hostelData),
    })
  }

  async deleteHostel(id) {
    return this.request(`/hostels/${id}`, {
      method: "DELETE",
    })
  }

  // Authentication endpoints
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async socialLogin(provider, token) {
    return this.request(`/auth/${provider}`, {
      method: "POST",
      body: JSON.stringify({ token }),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  // Admin endpoints
  async getAdminStats() {
    return this.request("/admin/stats")
  }
}

// Create global API client instance
window.apiClient = new APIClient()
