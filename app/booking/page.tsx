"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function BookingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn")
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true)
    } else {
      router.push("/login")
    }
  }, [router])

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    movingDate: "",
    items: {
      sofaSet: false,
      bed: false,
      diningTable: false,
      wardrobe: false,
      otherFurniture: false,
    },
  })

  const [estimatedPrice, setEstimatedPrice] = useState(299)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const updatedItems = {
      ...formData.items,
      [name]: checked,
    }
    setFormData({
      ...formData,
      items: updatedItems,
    })
    calculatePrice(updatedItems)
  }

  const calculatePrice = (items: typeof formData.items) => {
    const basePrice = 199
    let additionalCost = 0

    if (items.sofaSet) additionalCost += 50
    if (items.bed) additionalCost += 40
    if (items.diningTable) additionalCost += 30
    if (items.wardrobe) additionalCost += 60
    if (items.otherFurniture) additionalCost += 20

    const totalPrice = basePrice + additionalCost
    setEstimatedPrice(totalPrice)
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      pickupLocation: "",
      dropoffLocation: "",
      movingDate: "",
      items: {
        sofaSet: false,
        bed: false,
        diningTable: false,
        wardrobe: false,
        otherFurniture: false,
      },
    })
    setEstimatedPrice(299)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: formData.items, // Send items as a JSON object
          price: estimatedPrice,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Booking successfully added:", result)

      router.push("/booking/confirmation")
    } catch (error) {
      console.error("Error adding booking:", error)
    }
  }

  if (!isLoggedIn) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Book Your Move</h1>
      <p className="text-center text-green-600 font-medium mb-6">
        Welcome! You are now logged in and can make a booking.
      </p>

      <div className="flex justify-center mb-6">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
          alt="Moving boxes"
          width={300}
          height={200}
          className="rounded-lg shadow-md object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
          </div>

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Pick-Up Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter pick-up address"
              required
            />
          </div>

          <div>
            <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Drop-Off Location
            </label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter drop-off address"
              required
            />
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Items & Schedule</h2>
          </div>

          <div>
            <label htmlFor="movingDate" className="block text-sm font-medium text-gray-700 mb-1">
              Moving Date
            </label>
            <input
              type="date"
              id="movingDate"
              name="movingDate"
              value={formData.movingDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Items</label>
            <div className="space-y-2">
              {Object.entries(formData.items).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleItemChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={key} className="ml-2 text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Price Estimate</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Estimated Total</span>
                <span className="text-2xl font-bold text-blue-600">${estimatedPrice}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}