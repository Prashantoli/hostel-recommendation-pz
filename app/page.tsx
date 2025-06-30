"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, Star, DollarSign, Users, Search, Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

// Sample data for preview
const sampleHostels = [
  {
    id: "1",
    name: "Downtown Backpackers",
    location: "New York",
    price: 45,
    rating: 4.2,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "A cozy hostel in the heart of downtown with great amenities and friendly staff.",
    amenities: ["WiFi", "Kitchen", "Laundry", "Common Room"],
  },
  {
    id: "2",
    name: "Luxury Stay Hostel",
    location: "Los Angeles",
    price: 120,
    rating: 4.8,
    type: "Luxury",
    image: "/placeholder.svg?height=200&width=350",
    description: "Premium hostel experience with top-notch facilities and stunning views.",
    amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant"],
  },
  {
    id: "3",
    name: "Beach View Hostel",
    location: "Miami",
    price: 75,
    rating: 4.5,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Beautiful ocean views and modern amenities in the heart of Miami Beach.",
    amenities: ["WiFi", "Beach Access", "Bar", "Kitchen"],
  },
  {
    id: "4",
    name: "City Center Lodge",
    location: "Chicago",
    price: 60,
    rating: 4.0,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Convenient location with easy access to public transport and attractions.",
    amenities: ["WiFi", "Kitchen", "Laundry"],
  },
  {
    id: "5",
    name: "Golden Gate Hostel",
    location: "San Francisco",
    price: 95,
    rating: 4.6,
    type: "Boutique",
    image: "/placeholder.svg?height=200&width=350",
    description: "Stylish hostel near the famous Golden Gate Bridge with panoramic views.",
    amenities: ["WiFi", "Kitchen", "Rooftop Terrace", "Bike Rental"],
  },
  {
    id: "6",
    name: "Budget Traveler Inn",
    location: "New York",
    price: 35,
    rating: 3.8,
    type: "Budget",
    image: "/placeholder.svg?height=200&width=350",
    description: "Affordable accommodation for budget-conscious travelers in Manhattan.",
    amenities: ["WiFi", "Kitchen", "Common Room"],
  },
]

export default function HostelPreview() {
  const [currentView, setCurrentView] = useState("landing")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    return "★".repeat(fullStars) + (hasHalfStar ? "☆" : "")
  }

  const filteredHostels = sampleHostels.filter((hostel) => {
    const matchesSearch =
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || hostel.location === locationFilter
    const matchesType = typeFilter === "all" || hostel.type === typeFilter

    let matchesPrice = true
    if (priceFilter === "0-50") matchesPrice = hostel.price <= 50
    else if (priceFilter === "51-100") matchesPrice = hostel.price > 50 && hostel.price <= 100
    else if (priceFilter === "101+") matchesPrice = hostel.price > 100

    return matchesSearch && matchesLocation && matchesType && matchesPrice
  })

  const ViewSelector = () => (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={currentView === "landing" ? "default" : "outline"}
          onClick={() => setCurrentView("landing")}
        >
          Landing
        </Button>
        <Button
          size="sm"
          variant={currentView === "login" ? "default" : "outline"}
          onClick={() => setCurrentView("login")}
        >
          Login
        </Button>
        <Button
          size="sm"
          variant={currentView === "home" ? "default" : "outline"}
          onClick={() => setCurrentView("home")}
        >
          Home
        </Button>
        <Button
          size="sm"
          variant={currentView === "admin" ? "default" : "outline"}
          onClick={() => setCurrentView("admin")}
        >
          Admin
        </Button>
      </div>
    </div>
  )

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Building2 className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏠 Hostel Finder</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the perfect hostel for your stay with our intelligent recommendation system. Search, filter, and
            discover hostels that match your preferences.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Browse Hostels
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>🔍 Smart Search</CardTitle>
              <CardDescription>
                Find hostels by name, location, and preferences with our advanced search
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Star className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>⭐ Rating System</CardTitle>
              <CardDescription>See ratings and reviews from other travelers to make informed decisions</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>💰 Price Comparison</CardTitle>
              <CardDescription>Compare prices and find the best deals that fit your budget</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access the hostel recommendation system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
            <span className="mr-2">🔍</span>
            Continue with Google
          </Button>

          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <span className="mr-2">📘</span>
            Continue with Facebook
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
            <p>
              <a href="#" className="text-blue-600 hover:underline">
                Continue as Guest
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏠 Hostel Finder</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, John Doe</span>
            <Button variant="secondary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Hostel</h2>
          <p className="text-gray-600">Discover and book amazing hostels worldwide</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                  <SelectItem value="Miami">Miami</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-50">Under $50</SelectItem>
                  <SelectItem value="51-100">$51 - $100</SelectItem>
                  <SelectItem value="101+">Over $100</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Boutique">Boutique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredHostels.length} of {sampleHostels.length} hostels
          </p>
          <Select defaultValue="name">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hostel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={hostel.image || "/placeholder.svg"}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-blue-600">{hostel.type}</Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{hostel.name}</h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">${hostel.price}</div>
                    <div className="text-sm text-gray-500">/night</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{hostel.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">{generateStars(hostel.rating)}</span>
                    <span className="font-medium">{hostel.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Up to 8 guests</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{hostel.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {hostel.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {hostel.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{hostel.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hostels found matching your criteria.</p>
            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )

  const AdminPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏠 Hostel Finder - Admin Panel</h1>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              Back to Home
            </Button>
            <Button variant="secondary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Manage hostel listings and view statistics</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Hostel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hostels</p>
                  <p className="text-3xl font-bold">{sampleHostels.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Price</p>
                  <p className="text-3xl font-bold">
                    ${Math.round(sampleHostels.reduce((sum, h) => sum + h.price, 0) / sampleHostels.length)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold">
                    {(sampleHostels.reduce((sum, h) => sum + h.rating, 0) / sampleHostels.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Locations</p>
                  <p className="text-3xl font-bold">{new Set(sampleHostels.map((h) => h.location)).size}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Hostel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Hostel Name</label>
                <Input placeholder="Enter hostel name" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Miami">Miami</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Price per Night ($)</label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium">Rating (1-5)</label>
                <Input type="number" min="1" max="5" step="0.1" placeholder="4.5" />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Boutique">Boutique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter hostel description..."
              />
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save Hostel</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        {/* Hostels Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Hostels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleHostels.map((hostel) => (
                <div key={hostel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={hostel.image || "/placeholder.svg"}
                      alt={hostel.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{hostel.name}</h3>
                      <p className="text-sm text-gray-600">{hostel.location}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>${hostel.price}/night</span>
                        <span>★ {hostel.rating}</span>
                        <Badge variant="outline">{hostel.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <ViewSelector />

      {currentView === "landing" && <LandingPage />}
      {currentView === "login" && <LoginPage />}
      {currentView === "home" && <HomePage />}
      {currentView === "admin" && <AdminPage />}
    </div>
  )
}
