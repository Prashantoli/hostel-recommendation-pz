// Authentication logic
class AuthManager {
  constructor() {
    this.init()
  }

  init() {
    this.bindEvents()
    this.checkExistingAuth()
  }

  bindEvents() {
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e))
    }

    // Social login buttons
    const googleLogin = document.getElementById("googleLogin")
    const facebookLogin = document.getElementById("facebookLogin")

    if (googleLogin) {
      googleLogin.addEventListener("click", () => this.handleSocialLogin("google"))
    }

    if (facebookLogin) {
      facebookLogin.addEventListener("click", () => this.handleSocialLogin("facebook"))
    }

    // Sign up link
    const signupLink = document.getElementById("signupLink")
    if (signupLink) {
      signupLink.addEventListener("click", (e) => {
        e.preventDefault()
        this.showSignupForm()
      })
    }
  }

  checkExistingAuth() {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser && window.location.pathname.includes("login.html")) {
      window.location.href = "home.html"
    }
  }

  async handleLogin(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      this.showLoading(true)

      // Simulate API call
      const response = await this.simulateLogin(email, password)

      if (response.success) {
        // Store user data
        localStorage.setItem("currentUser", JSON.stringify(response.user))

        // Redirect to home page
        window.location.href = "home.html"
      } else {
        this.showError(response.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      this.showError("Login failed. Please try again.")
    } finally {
      this.showLoading(false)
    }
  }

  async simulateLogin(email, password) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo
    if (email && password) {
      return {
        success: true,
        user: {
          id: "1",
          name: email.split("@")[0],
          email: email,
          type: email.includes("admin") ? "admin" : "user",
        },
      }
    } else {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }
  }

  async handleSocialLogin(provider) {
    try {
      this.showLoading(true)

      // Simulate social login
      const response = await this.simulateSocialLogin(provider)

      if (response.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.user))
        window.location.href = "home.html"
      } else {
        this.showError(response.message)
      }
    } catch (error) {
      console.error("Social login error:", error)
      this.showError(`${provider} login failed. Please try again.`)
    } finally {
      this.showLoading(false)
    }
  }

  async simulateSocialLogin(provider) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        type: "user",
        provider: provider,
      },
    }
  }

  showSignupForm() {
    alert(
      "Signup functionality would be implemented here. For demo purposes, you can login with any email/password combination.",
    )
  }

  showLoading(show) {
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((btn) => {
      btn.disabled = show
      if (show) {
        btn.style.opacity = "0.6"
      } else {
        btn.style.opacity = "1"
      }
    })
  }

  showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector(".error-message")
    if (!errorDiv) {
      errorDiv = document.createElement("div")
      errorDiv.className = "error-message"
      errorDiv.style.cssText = `
                background: #f8d7da;
                color: #721c24;
                padding: 12px;
                border-radius: 6px;
                margin: 1rem 0;
                border: 1px solid #f5c6cb;
            `

      const form = document.getElementById("loginForm")
      if (form) {
        form.parentNode.insertBefore(errorDiv, form)
      }
    }

    errorDiv.textContent = message

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv)
      }
    }, 5000)
  }
}

// Initialize authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AuthManager()
})
