import Image from "next/image"
import Link from "next/link"

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Features</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Discover how Key2Rent makes your moving experience seamless and stress-free.
        </p>
      </div>

      {/* Feature 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Easy Online Booking</h2>
          <p className="text-gray-600 mb-4">
            Our intuitive booking system allows you to schedule your furniture shifting in just a few clicks. Select
            your items, choose a date, and get an instant price estimate.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>24/7 online booking availability</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Transparent pricing with no hidden fees</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant confirmation and booking details</span>
            </li>
          </ul>
          <Link href="/booking" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            Try our booking system
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
            alt="Easy Online Booking"
            width={400}
            height={300}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Feature 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 flex justify-center">
          <Image
            src="/images/professional-movers.jpg"
            alt="Professional mover delivering packages to customer"
            width={500}
            height={350}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Movers</h2>
          <p className="text-gray-600 mb-4">
            Our team of experienced movers is trained to handle your furniture with care. We ensure safe packing,
            transportation, and setup at your new location.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Trained and vetted moving professionals</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Proper equipment and tools for safe handling</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Furniture protection and careful transportation</span>
            </li>
          </ul>
          <Link href="/about" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            Learn about our team
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Tracking</h2>
          <p className="text-gray-600 mb-4">
            Stay informed about your move with our real-time tracking system. Know exactly when your items will arrive
            at your new location.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Live updates on your moving progress</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>SMS and email notifications</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Direct communication with your moving team</span>
            </li>
          </ul>
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            View dashboard demo
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop"
            alt="Real-Time Tracking"
            width={400}
            height={300}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Experience Our Features?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Book your move today and see how Key2Rent can make your relocation experience seamless and stress-free.
        </p>
        <Link
          href="/booking"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
        >
          Book Your Move
        </Link>
      </div>
    </div>
  )
}
