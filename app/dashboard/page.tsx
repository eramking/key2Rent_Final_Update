"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Booking {
  id: string;
  status: string;
  moving_date: string;
  pickup_location: string;
  dropoff_location: string;
  items: string;
  price: number;
  customer_name?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/getBookings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched bookings:", data);
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received.");
        }

        const formattedBookings = data.map((booking: any) => ({
          ...booking,
          price: parseFloat(booking.price) || 0,
        }));

        setBookings(formattedBookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError(`Failed to load bookings: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const lowerCaseStatus = booking.status.toLowerCase();
    if (activeTab === "upcoming") {
      return lowerCaseStatus === "pending" || lowerCaseStatus === "assigned";
    } else {
      return lowerCaseStatus === "completed" || lowerCaseStatus === "cancelled";
    }
  });

  const renderItems = (itemsData: any) => {
    try {
      // Parse items if it's a string; otherwise, use it as-is
      const parsedItems = typeof itemsData === "string" ? JSON.parse(itemsData) : itemsData;

      if (typeof parsedItems === "object" && parsedItems !== null) {
        const selectedItems = Object.keys(parsedItems)
          .filter((key) => parsedItems[key]) // Filter items with `true` value
          .map((key) => key.replace(/([A-Z])/g, " $1").toLowerCase()); // Format keys

        return selectedItems.length > 0
          ? selectedItems.join(", ") // Join selected items with commas
          : "No items selected";
      } else {
        return "Invalid items format";
      }
    } catch (error) {
      console.error("Error parsing items:", error);
      return "Error displaying items";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Overview</h1>
        <div className="my-6">
          <Image
            src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2070&auto=format&fit=crop"
            alt="Dashboard Banner"
            width={1200}
            height={300}
            className="w-full h-40 object-cover rounded-lg shadow-md"
            priority
          />
        </div>
        <p className="text-gray-600">View all current and past bookings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 h-fit">
          <nav className="space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
              All Bookings
            </Link>
          </nav>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "upcoming" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Upcoming / Active
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "past" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Past Bookings
                </button>
              </nav>
            </div>

            <div className="p-4">
              {isLoading && <p className="text-center text-gray-500 py-8">Loading bookings...</p>}
              {error && <div className="text-center py-8 text-red-600"><p><strong>Error:</strong> {error}</p></div>}

              {!isLoading && !error && filteredBookings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeTab} bookings found.</p>
                </div>
              )}

              {!isLoading && !error && filteredBookings.length > 0 && (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                        <div>
                          <h3 className="font-medium text-lg text-gray-800 mb-1 sm:mb-0">Booking #{booking.id}</h3>
                          {booking.customer_name && <p className="text-sm text-gray-600">Customer: {booking.customer_name}</p>}
                        </div>
                        <span
                          className={`mt-2 sm:mt-0 px-2.5 py-0.5 text-xs sm:text-sm font-semibold rounded-full ${
                            booking.status.toLowerCase() === "pending" ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                            : booking.status.toLowerCase() === "assigned" ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : booking.status.toLowerCase() === "completed" ? "bg-green-100 text-green-800 border border-green-300"
                            : booking.status.toLowerCase() === "cancelled" ? "bg-red-100 text-red-800 border border-red-300"
                            : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-500">
                          Moving Date: <span className="font-medium text-gray-700">{new Date(booking.moving_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                        <div><p className="text-xs text-gray-500 uppercase font-semibold">From</p><p className="text-gray-700">{booking.pickup_location}</p></div>
                        <div><p className="text-xs text-gray-500 uppercase font-semibold">To</p><p className="text-gray-700">{booking.dropoff_location}</p></div>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Items</p>
                        <p className="text-sm text-gray-700">{renderItems(booking.items)}</p>
                      </div>
                      <div className="mt-4 flex justify-between items-center border-t pt-3">
                        <p className="font-medium text-lg text-gray-800">${booking.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}