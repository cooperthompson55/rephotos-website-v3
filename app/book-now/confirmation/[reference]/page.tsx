"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../../lib/supabaseClient"
import { Button } from "@/components/ui/button"

// Extend existing Window interface for confirmation map
declare global {
  interface Window {
    initConfirmationMap: () => void;
  }
}

interface BookingData {
  id: number
  reference_number: string
  property_size: string
  services: any[]
  total_amount: number
  address: string
  notes: string
  preferred_date: string
  time: string
  status: string
  agent_name: string
  agent_email: string
  agent_phone: string
  agent_company: string
  created_at: string
  suite_unit?: string
}

export default function BookingConfirmationPage() {
  const params = useParams()
  const referenceNumber = params.reference as string
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry&callback=initConfirmationMap`
      script.async = true
      script.defer = true
      
      window.initConfirmationMap = () => {
        setMapLoaded(true)
      }
      
      document.head.appendChild(script)
    }

    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      loadGoogleMaps()
    } else {
      setMapLoaded(true)
    }
  }, [])

  // Initialize map when both map API and booking data are ready
  useEffect(() => {
    if (mapLoaded && booking && booking.address && mapRef.current) {
      initializeMap()
    }
  }, [mapLoaded, booking])

  const initializeMap = () => {
    if (!window.google || !mapRef.current || !booking?.address) return

    const geocoder = new (window.google as any).maps.Geocoder()
    
    geocoder.geocode({ address: booking.address }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location
        
        const map = new (window.google as any).maps.Map(mapRef.current!, {
          zoom: 18,
          center: location,
          mapTypeId: 'satellite',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: true
        })

        new (window.google as any).maps.Marker({
          position: location,
          map: map,
          title: booking.address,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new (window.google as any).maps.Size(32, 32)
          }
        })
      } else {
        console.error('Geocoding failed:', status)
      }
    })
  }

  useEffect(() => {
    const fetchBooking = async () => {
      if (!referenceNumber) {
        setError("No reference number provided")
        setLoading(false)
        return
      }

      try {
        // First try to fetch by reference_number (primary method)
        let { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('reference_number', referenceNumber)
          .single()

        // If not found by reference_number, try by ID as fallback (for old bookings)
        if (error && error.message?.includes("0 rows")) {
          console.log("Reference number not found, trying by ID...")
          const bookingId = parseInt(referenceNumber)
          if (!isNaN(bookingId)) {
            const response = await supabase
              .from('bookings')
              .select('*')
              .eq('id', bookingId)
              .single()
            
            data = response.data
            error = response.error
          }
        }

        if (error || !data) {
          console.error('Error fetching booking:', error)
          setError("Booking not found")
        } else {
          setBooking(data)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [referenceNumber])

  if (loading) {
    return (
      <div className="relative bg-[#262F3F] min-h-screen">
        <img
          src="/book-texture.svg"
          alt="Header texture"
          className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 -mt-16 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1c4596] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="relative bg-[#262F3F] min-h-screen">
        <img
          src="/book-texture.svg"
          alt="Header texture"
          className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 -mt-16 text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Booking Not Found</h1>
            <p className="text-lg mb-6 text-gray-600">
              {error || "We couldn't find a booking with this reference number."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = "/book-now"} 
                className="bg-[#1c4596] hover:bg-[#2853AE] text-white px-8 py-3 text-lg"
              >
                Make a New Booking
              </Button>
              <Button 
                onClick={() => window.location.href = "/"} 
                variant="outline"
                className="border-[#262F3F] text-[#262F3F] hover:bg-[#262F3F] hover:text-white px-8 py-3 text-lg"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Extract package name from services or notes
  const getSelectedPackageName = () => {
    if (booking.services && booking.services.length > 0) {
      // Check if first service is a bundle/package
      const firstService = booking.services[0]
      if (firstService && typeof firstService === 'object' && 'name' in firstService) {
        return firstService.name
      }
    }
    
    // Fallback: extract from notes
    const notesMatch = booking.notes?.match(/Selected Package: (.+?)(?:\n|$)/)
    if (notesMatch) {
      return notesMatch[1]
    }
    
    return 'Custom Selection'
  }

  const selectedPackageName = getSelectedPackageName()

  // Get actual services from booking
  const getBookingServices = () => {
    console.log('Booking services raw data:', booking.services);
    
    if (booking.services && booking.services.length > 0) {
      const servicesList = booking.services.map(service => {
        console.log('Processing service:', service);
        
        // Handle different possible service structures
        if (typeof service === 'object' && service !== null) {
          // Handle object with name property
          if ('name' in service && service.name) {
            const serviceName = String(service.name);
            if ('count' in service && service.count && Number(service.count) > 1) {
              return `${serviceName} (${service.count}x)`;
            }
            return serviceName;
          }
          
          // Handle object with title property (fallback)
          if ('title' in service && service.title) {
            const serviceName = String(service.title);
            if ('count' in service && service.count && Number(service.count) > 1) {
              return `${serviceName} (${service.count}x)`;
            }
            return serviceName;
          }
          
          // Handle object that might be stringified
          if (typeof service === 'object' && Object.keys(service).length > 0) {
            console.log('Unknown service object structure:', service);
            // Try to extract any string value from the object
            const possibleName = service.name || service.title || service.service || Object.values(service)[0];
            if (possibleName && typeof possibleName === 'string') {
              return possibleName;
            }
          }
        }
        
        // Handle string services
        if (typeof service === 'string' && service.trim()) {
          return service.trim();
        }
        
        console.log('Could not process service:', service);
        return null;
      }).filter(service => service && service.length > 0); // Filter out any null/undefined/empty values
      
      console.log('Processed services list:', servicesList);
      
      // Only return the services list if we actually found some services
      if (servicesList.length > 0) {
        return servicesList;
      }
    }
    
    // Fallback if no services found
    console.log('No services found, using fallback');
    return [
      "Professional HDR Photography",
      "Listing Website", 
      "All files optimized for MLS"
    ]
  }

  // Helper function to format complete address including unit
  const formatCompleteAddress = (booking: BookingData) => {
    if (!booking.address) return "Not specified";
    
    if (booking.suite_unit && booking.suite_unit.trim()) {
      return `${booking.suite_unit.trim()}, ${booking.address}`;
    }
    
    return booking.address;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Unknown' || dateString === 'Not specified') {
      return 'Not specified'
    }
    try {
      // Parse the date as local date to avoid timezone issues
      // Split the date string (YYYY-MM-DD) and create local date
      const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10))
      const localDate = new Date(year, month - 1, day) // month is 0-indexed in JS
      
      return localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="relative bg-[#262F3F] min-h-screen">
      <img
        src="/book-texture.svg"
        alt="Header texture"
        className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 text-center -mt-16 w-full flex flex-col items-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-green-500 animate-success-pop" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#262F3F] mb-2">Your Photoshoot is Booked</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl">
            Thank you for your booking! We have received your request and will contact you shortly to confirm the details.
          </p>

          {/* Booking Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-[#262F3F] mb-4">Booking Details:</h2>
            <div className="space-y-2 text-gray-700">
              <div><strong>Package:</strong> {selectedPackageName}</div>
              <div><strong>Property Size:</strong> {booking.property_size}</div>
              <div><strong>Property Address:</strong> {formatCompleteAddress(booking)}</div>
              <div><strong>Investment:</strong> <span className="text-2xl font-bold text-[#1c4596]">${booking.total_amount.toFixed(2)}</span></div>
              <div><strong>Preferred Date:</strong> {formatDate(booking.preferred_date)}</div>
              <div><strong>Preferred Time:</strong> {booking.time || 'Not specified'}</div>
              <div><strong>Status:</strong> <span className="capitalize bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">{booking.status}</span></div>
            </div>
          </div>

          {/* Property Location Map */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-[#262F3F] mb-4">Property Location</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Address:</strong> {formatCompleteAddress(booking)}
              </p>
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                {mapLoaded ? (
                  <div
                    ref={mapRef}
                    className="w-full h-full"
                    style={{ minHeight: '256px' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1c4596] mx-auto mb-2"></div>
                      <p className="text-sm">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                📍 Our photographer will arrive at this location for your scheduled shoot.
              </p>
            </div>
          </div>

          {/* Booking Includes */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#262F3F] mb-4">Booking Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getBookingServices().map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#1c4596] text-lg">•</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-8 text-center">
            <p className="text-gray-700 mb-2">
              <strong>Questions?</strong> Call us at{' '}
              <a href="tel:9052999300" className="text-[#1c4596] font-semibold hover:underline">
                (905) 299-9300
              </a>
              {' '}or email{' '}
              <a href="mailto:cooper@rephotos.ca" className="text-[#1c4596] font-semibold hover:underline">
                cooper@rephotos.ca
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Reference your booking with: <span className="font-mono font-bold">{booking.reference_number || `#${booking.id}`}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <p className="text-lg font-medium text-[#262F3F] mb-4">Ready to list another property?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = "/book-now"} 
                className="bg-[#1c4596] hover:bg-[#2853AE] text-white px-8 py-3 text-lg"
              >
                Book Another Shoot
              </Button>
              <Button 
                onClick={() => window.location.href = "/"} 
                variant="outline"
                className="border-[#262F3F] text-[#262F3F] hover:bg-[#262F3F] hover:text-white px-8 py-3 text-lg"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 