"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format, addDays, format as formatDate, isSameDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Camera, Compass, Video, Instagram, LayoutGrid, Globe, Building, PenTool } from "lucide-react"
import { useState as useLocalState } from "react"
import { supabase } from "@/lib/supabaseClient"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  propertyType: z.enum([
    "residential-detached-semi-townhouse",
    "condo-apartment",
    "multi-unit-investment",
    "commercial-retail-office",
    "luxury-custom-architecture"
  ], {
    required_error: "Please select a property type."
  }),
  squareFootage: z.string().min(1, {
    message: "Please enter the square footage.",
  }),
  date: z.string({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  additionalInfo: z.string().optional(),
})

const services = [
  { id: "hdrPhotography", name: "HDR Photography", prices: [189.99, 249.99, 319.99, 379.99, 439.99] },
  { id: "virtualTour", name: "360° Virtual Tour", prices: [199.99, 239.99, 279.99, 319.99, 349.99] },
  { id: "propertyHighlightsVideo", name: "Property Highlights Video", prices: [319.99, 349.99, 389.99, 429.99, 469.99] },
  { id: "socialMediaReel", name: "Social Media Reel", prices: [229.99, 249.99, 279.99, 299.99, 329.99] },
  { id: "droneAerialPhotos", name: "Drone Aerial Photos", prices: [159.99, 159.99, 159.99, 159.99, 159.99] },
  { id: "droneAerialVideo", name: "Drone Aerial Video", prices: [159.99, 159.99, 159.99, 159.99, 159.99] },
  { id: "floorPlan2d", name: "2D Floor Plan", prices: [119.99, 149.99, 189.99, 229.99, 269.99] },
  { id: "houseModel3d", name: "3D House Model", prices: [189.99, 229.99, 269.99, 299.99, 339.99] },
  { id: "propertyWebsite", name: "Property Website", prices: [129.99, 129.99, 129.99, 129.99, 129.99] },
  { id: "customDomainName", name: "Custom Domain Name", prices: [39.99, 39.99, 39.99, 39.99, 39.99] },
  { id: "virtualStaging", name: "Virtual Staging", prices: ["39.99/image", "39.99/image", "39.99/image", "39.99/image", "39.99/image"] },
  { id: "virtualTwilight", name: "Virtual Twilight", prices: ["49.99/image", "49.99/image", "49.99/image", "49.99/image", "49.99/image"] },
];
const sizeOptions = [
  { value: "<1000", label: "Under 1000 sq ft" },
  { value: "1000-2000", label: "1000–1999 sq ft" },
  { value: "2000-3000", label: "2000–2999 sq ft" },
  { value: "3000-4000", label: "3000–3999 sq ft" },
  { value: "4000-5000", label: "4000–4999 sq ft" },
];
type Package = { name: string; price: string; discount: string; features: string[] };
const hardcodedPackages: { [key: string]: Package[] } = {
  '<1000': [
    { name: 'Essentials Package', price: '$229.99', discount: 'Save $20', features: ['HDR Photography', '1–2 Drone Shots'] },
    { name: 'Deluxe Tour Package', price: '$489.99', discount: 'Save $80', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan'] },
    { name: 'Marketing Pro Package', price: '$829.99', discount: 'Save $130', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain'] },
    { name: 'Premium Seller Experience', price: '$1069.99', discount: 'Save $420', features: ['HDR Photography', '3–5 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain', '3D House Model', 'Virtual Twilight'] },
  ],
  '1000-2000': [
    { name: 'Essentials Package', price: '$289.99', discount: 'Save $30', features: ['HDR Photography', '1–2 Drone Shots'] },
    { name: 'Deluxe Tour Package', price: '$579.99', discount: 'Save $120', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan'] },
    { name: 'Marketing Pro Package', price: '$959.99', discount: 'Save $160', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain'] },
    { name: 'Premium Seller Experience', price: '$1199.99', discount: 'Save $450', features: ['HDR Photography', '3–5 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain', '3D House Model', 'Virtual Twilight'] },
  ],
  '2000-3000': [
    { name: 'Essentials Package', price: '$349.99', discount: 'Save $30', features: ['HDR Photography', '1–2 Drone Shots'] },
    { name: 'Deluxe Tour Package', price: '$649.99', discount: 'Save $190', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan'] },
    { name: 'Marketing Pro Package', price: '$1079.99', discount: 'Save $200', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain'] },
    { name: 'Premium Seller Experience', price: '$1319.99', discount: 'Save $490', features: ['HDR Photography', '3–5 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain', '3D House Model', 'Virtual Twilight'] },
  ],
  '3000-4000': [
    { name: 'Essentials Package', price: '$389.99', discount: 'Save $50', features: ['HDR Photography', '1–2 Drone Shots'] },
    { name: 'Deluxe Tour Package', price: '$719.99', discount: 'Save $260', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan'] },
    { name: 'Marketing Pro Package', price: '$1179.99', discount: 'Save $260', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain'] },
    { name: 'Premium Seller Experience', price: '$1419.99', discount: 'Save $550', features: ['HDR Photography', '3–5 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain', '3D House Model', 'Virtual Twilight'] },
  ],
  '4000-5000': [
    { name: 'Essentials Package', price: '$449.99', discount: 'Save $50', features: ['HDR Photography', '1–2 Drone Shots'] },
    { name: 'Deluxe Tour Package', price: '$799.99', discount: 'Save $320', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan'] },
    { name: 'Marketing Pro Package', price: '$1299.99', discount: 'Save $310', features: ['HDR Photography', '2–3 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain'] },
    { name: 'Premium Seller Experience', price: '$1539.99', discount: 'Save $600', features: ['HDR Photography', '3–5 Drone Shots', '360° Virtual Tour', '2D Floor Plan', 'Custom Video', 'Property Website', 'Custom Domain', '3D House Model', 'Virtual Twilight'] },
  ],
};

export default function BookNowPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [dateCount, setDateCount] = useState(14)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)
  const dateDropdownButtonRef = useRef<HTMLButtonElement>(null)
  const [selectedSize, setSelectedSize] = useState('<1000')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'both' | 'packages' | 'services'>('both')
  const [loadingMap, setLoadingMap] = useState<{ [pkgName: string]: boolean }>({})
  const [addedMap, setAddedMap] = useState<{ [pkgName: string]: boolean }>({})
  const [removingMap, setRemovingMap] = useState<{ [pkgName: string]: boolean }>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serviceQuantities, setServiceQuantities] = useState<{ [id: string]: number }>({})
  const [submitAnim, setSubmitAnim] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [topLevelError, setTopLevelError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      squareFootage: "",
      additionalInfo: "",
      date: "",
      time: "",
    },
  })

  const today = typeof window !== "undefined" ? new Date() : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  function validateRequiredBookingFields(values: z.infer<typeof formSchema>) {
    if (!selectedSize) return "Please select a property size.";
    if (!values.name) return "Name is required.";
    if (!values.email) return "Email is required.";
    if (!values.phone) return "Phone is required.";
    if (!values.address) return "Address is required.";
    if (!values.propertyType) return "Property type is required.";
    if (!values.squareFootage) return "Square footage is required.";
    if (!values.date) return "Date is required.";
    if (!values.time) return "Time is required.";
    if (!selectedPackage && selectedServices.length === 0) return "Please select at least one package or service.";
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setTopLevelError(null);
    const missing = validateRequiredBookingFields(values);
    if (missing) {
      setTopLevelError(missing);
      setIsSubmitting(false);
      setSubmitStatus('idle');
      setSubmitAnim('idle');
      return;
    }
    console.log('onSubmit called with values:', values);
    setIsSubmitting(true);
    setSubmitStatus('loading');
    setSubmitAnim('loading');

    // Use <1000 as default if no property size selected
    const propertySize = selectedSize || '<1000';

    // Build services array
    let servicesArr: any[] = [];
    let totalAmount = 0;
    if (selectedPackage) {
      // Find the selected package object
      const pkg = hardcodedPackages[propertySize]?.find(p => p.name === selectedPackage);
      if (pkg) {
        // For each feature, try to find a matching service for price, else price 0
        servicesArr = pkg.features.map(f => {
          // Try to match to a service for price
          let service = services.find(s => f.includes(s.name));
          let price = 0;
          if (service) {
            const sizeIdx = sizeOptions.findIndex(opt => opt.value === propertySize);
            const p = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
            price = typeof p === 'number' ? p : parseFloat(p);
          } else {
            price = 0;
          }
          return {
            name: f,
            price,
            count: 1,
            total: price,
          };
        });
        totalAmount = servicesArr.reduce((sum: number, s: any) => sum + s.total, 0);
      }
    } else if (selectedServices.length > 0) {
      servicesArr = selectedServices.map(id => {
        const service = services.find(s => s.id === id);
        if (!service) return null;
        const sizeIdx = sizeOptions.findIndex(opt => opt.value === propertySize);
        const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
        const qty = serviceQuantities[id] || 1;
        let priceNum = 0;
        if (typeof price === 'number') priceNum = price;
        else if (typeof price === 'string') {
          const match = price.match(/\d+(\.\d+)?/);
          priceNum = match ? parseFloat(match[0]) : 0;
        }
        return {
          name: service.name,
          price: priceNum,
          count: qty,
          total: priceNum * qty,
        };
      }).filter((s): s is any => !!s);
      totalAmount = servicesArr.reduce((sum: number, s: any) => sum + s.total, 0);
    }

    const street = values.address;
    const street2 = '';
    const city = '';
    const province = '';
    const zipCode = '';

    const payload = {
      property_size: propertySize,
      services: servicesArr,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      address: {
        street,
        street2,
        city,
        province,
        zipCode,
      },
      notes: values.additionalInfo || null,
      preferred_date: values.date,
      time: values.time,
      property_status: 'Vacant',
      status: 'pending',
      user_id: null,
      agent_name: values.name,
      agent_email: values.email,
      agent_phone: values.phone,
      agent_company: '',
    };

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([payload]);
      setIsSubmitting(false);
      if (error) {
        setIsSuccess(false);
        setSubmitStatus('error');
        setSubmitAnim('error');
        setTimeout(() => setSubmitAnim('idle'), 1200);
      } else {
        // Trigger Supabase Edge Function after successful booking
        try {
          await fetch('https://jshnsfvvsmjlxlbdpehf.supabase.co/functions/v1/sendBookingEmailjshnsfvvsmjlxlbdpehf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer ' + <your-secret>, // Uncomment and set if your edge function requires auth
            },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          // Optionally handle/log edge function errors, but don't block user
          console.error('Edge function call failed:', e);
        }
        setIsSuccess(true);
        setSubmitStatus('success');
        setSubmitAnim('success');
        setTimeout(() => setSubmitAnim('idle'), 1200);
      }
    } catch (err) {
      setIsSubmitting(false);
      setIsSuccess(false);
      setSubmitStatus('error');
      setSubmitAnim('error');
      setTimeout(() => setSubmitAnim('idle'), 1200);
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone"];
    } else if (step === 2) {
      fieldsToValidate = ["address", "propertyType", "squareFootage", "date", "time"];
    } else if (step === 3) {
      // No form fields to validate, just require a package or service
      if (!selectedPackage && selectedServices.length === 0) {
        return;
      }
    }
    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate as any);
      if (isValid) setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1)
  }

  // Helper to update quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setServiceQuantities(prev => {
      const newQty = Math.max(0, (prev[id] || 1) + delta);
      if (newQty === 0) {
        setSelectedServices(selectedServices.filter(sid => sid !== id));
      } else if (!selectedServices.includes(id)) {
        setSelectedServices([...selectedServices, id]);
      }
      return { ...prev, [id]: newQty };
    });
  };

  if (submitStatus === 'success') {
    return (
      <div className="relative">
        <img
          src="/book-texture.svg"
          alt="Header texture"
          className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center -mt-16 flex flex-col items-center">
            <span className="success-anim mb-4">
              <svg className="w-16 h-16 text-green-500 animate-success-pop" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Booking sent successfully!</h1>
            <p className="text-lg mb-6">
              Thank you for booking with us. We'll contact you shortly to confirm your appointment.
            </p>
            <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
          </div>
        </div>
      </div>
    )
  }
  if (submitStatus === 'error') {
    return (
      <div className="relative">
        <img
          src="/book-texture.svg"
          alt="Header texture"
          className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center -mt-16 flex flex-col items-center">
            <span className="error-anim mb-4">
              <svg className="w-16 h-16 text-red-500 animate-error-pop" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Booking failed</h1>
            <p className="text-lg mb-6">
              Something went wrong. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  console.log('Form errors:', form.formState.errors);

  return (
    <div className="relative bg-[#262F3F] min-h-screen">
      <img
        src="/book-texture.svg"
        alt="Header texture"
        className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="container w-full mx-auto pt-56 pb-12 px-0 md:px-8 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 -mt-16 w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Book Your Service</h1>

          {topLevelError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center font-semibold animate-fade-in">
              {topLevelError}
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className={`h-1 w-1/4 ${step >= 1 ? "bg-blue-600" : "bg-gray-300"}`}></div>
              <div className={`h-1 w-1/4 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
              <div className={`h-1 w-1/4 ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
              <div className={`h-1 w-1/4 ${step >= 4 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Personal Info</span>
              <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Property Details</span>
              <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>Choose Services</span>
              <span className={step >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}>Confirmation</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="residential-detached-semi-townhouse" />
                              </FormControl>
                              <FormLabel className="font-normal">Residential – Detached / Semi / Townhouse</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="condo-apartment" />
                              </FormControl>
                              <FormLabel className="font-normal">Condo – Apartment</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="multi-unit-investment" />
                              </FormControl>
                              <FormLabel className="font-normal">Multi-Unit / Investment Property</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="commercial-retail-office" />
                              </FormControl>
                              <FormLabel className="font-normal">Commercial / Retail / Office</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="luxury-custom-architecture" />
                              </FormControl>
                              <FormLabel className="font-normal">Luxury / Custom / Architecture</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="squareFootage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Square Footage</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                          <FormLabel>
                            Select Date <span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover open={dateDropdownOpen} onOpenChange={setDateDropdownOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                ref={dateDropdownButtonRef}
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-white border border-gray-300 rounded-md text-black",
                                  !field.value && "text-muted-foreground"
                                )}
                                type="button"
                                style={{ boxShadow: "none" }}
                                tabIndex={0}
                                onFocus={e => e.currentTarget.style.boxShadow = 'none'}
                                onBlur={e => e.currentTarget.style.boxShadow = 'none'}
                                onMouseDown={e => e.currentTarget.style.background = 'white'}
                                onMouseUp={e => e.currentTarget.style.background = 'white'}
                                onMouseOver={e => {
                                  e.currentTarget.style.background = 'white';
                                  e.currentTarget.style.color = 'black';
                                }}
                                onMouseOut={e => {
                                  e.currentTarget.style.background = 'white';
                                  e.currentTarget.style.color = 'black';
                                }}
                              >
                                {field.value
                                  ? format(new Date(field.value), "PPP")
                                  : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 text-black" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="p-0"
                              align="start"
                              side="bottom"
                              sideOffset={4}
                              style={{ width: 'var(--radix-popover-trigger-width)' }}
                            >
                              <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                                {Array.from({ length: dateCount }).map((_, i) => {
                                  const date = addDays(today, i)
                                  const iso = date.toISOString().split('T')[0]
                                  return (
                                    <button
                                      key={iso}
                                      type="button"
                                      className={cn(
                                        "w-full text-left px-4 py-2 hover:bg-blue-50",
                                        field.value === iso && "bg-blue-100 font-semibold"
                                      )}
                                      onClick={() => {
                                        field.onChange(iso)
                                        setDateDropdownOpen(false)
                                      }}
                                    >
                                      {format(date, "PPP")}
                                    </button>
                                  )
                                })}
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 font-medium"
                                  onClick={e => {
                                    e.preventDefault()
                                    setDateCount(dateCount + 14)
                                    // Keep dropdown open
                                    setTimeout(() => {
                                      dateDropdownButtonRef.current?.focus()
                                    }, 0)
                                  }}
                                >
                                  Load more dates...
                                </button>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                          <FormLabel>
                            Select Time <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select a time</option>
                              {Array.from({ length: 16 }).map((_, i) => {
                                const hour = 9 + Math.floor(i / 2);
                                const minute = i % 2 === 0 ? '00' : '30';
                                const value = `${hour.toString().padStart(2, '0')}:${minute}`;
                                const ampmHour = hour > 12 ? hour - 12 : hour;
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                return (
                                  <option key={value} value={value}>
                                    {`${ampmHour}:${minute} ${ampm}`}
                                  </option>
                                );
                              })}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  {/* Packages/Services Selector */}
                  <div className="flex justify-center mb-6 gap-2">
                    <button
                      className={`px-5 py-2 rounded-full font-semibold transition-all border-2 focus:outline-none text-base md:text-lg ${viewMode === 'packages' ? 'bg-[#262F3F] text-white border-[#262F3F]' : 'bg-white text-[#262F3F] border-gray-300 hover:bg-[#f5efe0]'}`}
                      onClick={() => setViewMode(viewMode === 'packages' ? 'both' : 'packages')}
                      aria-pressed={viewMode === 'packages'}
                    >
                      Packages
                    </button>
                    <button
                      className={`px-5 py-2 rounded-full font-semibold transition-all border-2 focus:outline-none text-base md:text-lg ${viewMode === 'services' ? 'bg-[#262F3F] text-white border-[#262F3F]' : 'bg-white text-[#262F3F] border-gray-300 hover:bg-[#f5efe0]'}`}
                      onClick={() => setViewMode(viewMode === 'services' ? 'both' : 'services')}
                      aria-pressed={viewMode === 'services'}
                    >
                      Individual Services
                    </button>
                  </div>

                  {/* Shared Size Selector */}
                  <div className="flex flex-col items-center mb-8">
                    <span className="text-base font-medium mb-2 text-[#262F3F]">Select Property Size</span>
                    <div className="relative w-full max-w-md flex flex-col items-center">
                      <div className="absolute top-1/2 left-0 right-0 h-2 flex items-center" style={{ zIndex: 0 }}>
                        <div className="w-full h-2 bg-[#f5efe0] rounded-full" />
                      </div>
                      <div className="relative flex justify-between w-full z-10 px-2">
                        {sizeOptions.map((opt, idx) => (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => {
                              setSelectedSize(opt.value);
                            }}
                            aria-label={opt.label}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none ${selectedSize === opt.value ? 'bg-[#262F3F] border-[#262F3F]' : 'bg-white border-[#262F3F]'} ${selectedSize === opt.value ? '' : 'hover:bg-[#f5efe0]'}`}
                            style={{ marginTop: 0 }}
                          >
                            {selectedSize === opt.value && <span className="w-4 h-4 rounded-full bg-[#262F3F] block" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 text-lg font-bold text-[#262F3F]">{sizeOptions.find(opt => opt.value === selectedSize)?.label}</div>
                  </div>

                  {/* Packages Section */}
                  <div
                    className={`transition-all duration-500 ${viewMode === 'services' ? 'opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden' : 'opacity-100 translate-y-0'} ${viewMode === 'both' ? '' : 'mb-0'}`}
                    style={{ transitionProperty: 'opacity, transform, height' }}
                  >
                    <h2 className="text-4xl font-serif font-bold mb-2 text-[#262F3F] text-left md:text-center">Packages</h2>
                    <p className="text-base md:text-lg text-[#262F3F] mb-6 text-left md:text-center max-w-2xl mx-auto">Save on our most popular services and check out in a flash with a package. Pricing is straightforward and additional services can be added à la carte.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {hardcodedPackages[selectedSize]?.map((pkg: Package, idx: number) => {
                        const allFeatures = [
                          'HDR Photography',
                          '1–2 Drone Shots',
                          '2–3 Drone Shots',
                          '3–5 Drone Shots',
                          '360° Virtual Tour',
                          '2D Floor Plan',
                          'Custom Video',
                          'Property Website',
                          'Custom Domain',
                          'Virtual Twilight',
                          'Virtual Staging',
                          '3D House Model',
                        ];
                        // Normalize features for matching
                        const normalize = (s: string) => s.replace(/\s*\(.*\)/, '').trim();
                        const included = allFeatures.filter(f => pkg.features.some(pf => normalize(pf) === normalize(f)));
                        const excluded = allFeatures.filter(f => !pkg.features.some(pf => normalize(pf) === normalize(f)));
                        let sizeLabel = sizeOptions.find(opt => opt.value === selectedSize)?.label || '';
                        return (
                        <div
                          key={pkg.name}
                            className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all min-h-[500px]"
                            style={{ boxShadow: '0 2px 8px 0 rgba(38,47,63,0.04)' }}
                        >
                            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B7A86]">{pkg.name}</div>
                          <div className="flex items-end gap-2 mb-1">
                              <span className="text-2xl font-bold text-[#262F3F]">{pkg.price}</span>
                          </div>
                            <div className="text-sm text-[#262F3F] mb-1">{sizeLabel}</div>
                          <div className="mb-2 text-sm font-semibold text-[#B42222]">{pkg.discount}</div>
                            <button
                              className={`w-full mb-4 mt-2 font-semibold text-base rounded-md py-3 transition-colors flex items-center justify-center gap-2 relative overflow-hidden
                                ${selectedPackage === pkg.name || addedMap[pkg.name] ? 'bg-[#d4a03a] text-white' : 'bg-[#f5efe0] text-[#262F3F]'}
                              `}
                              onClick={async () => {
                                if (addedMap[pkg.name] || selectedPackage === pkg.name) {
                                  // Undo: show removing spinner, then revert
                                  setRemovingMap(prev => ({ ...prev, [pkg.name]: true }));
                                  setTimeout(() => {
                                    setAddedMap(prev => ({ ...prev, [pkg.name]: false }));
                                    setRemovingMap(prev => ({ ...prev, [pkg.name]: false }));
                                    setSelectedPackage(null);
                                    setServiceQuantities({});
                                  }, 700);
                                } else {
                                  // Unselect all other packages instantly
                                  setAddedMap({ [pkg.name]: false });
                                  setLoadingMap(prev => ({ ...prev, [pkg.name]: true }));
                                  setSelectedPackage(null);
                                  setSelectedServices([]);
                                  setServiceQuantities({});
                                  setTimeout(() => {
                                    setLoadingMap(prev => ({ ...prev, [pkg.name]: false }));
                                    setAddedMap({ [pkg.name]: true });
                                    setSelectedPackage(pkg.name);
                                  }, 700);
                                }
                              }}
                              disabled={loadingMap[pkg.name] || removingMap[pkg.name]}
                              style={{ transition: 'background 0.3s, color 0.3s' }}
                            >
                              <span className="flex items-center gap-2 w-full justify-center">
                                {loadingMap[pkg.name] ? (
                                  <span className="flex items-center gap-2 animate-fade-in">
                                    {/* Spinner animation */}
                                    <span className="inline-block w-6 h-6 align-middle">
                                      <span className="block w-6 h-6 border-2 border-[#d4a03a] border-t-transparent rounded-full animate-spin"></span>
                                    </span>
                                    <span className="font-bold">Adding...</span>
                                  </span>
                                ) : removingMap[pkg.name] ? (
                                  <span className="flex items-center gap-2 animate-fade-in">
                                    {/* Spinner animation for removing */}
                                    <span className="inline-block w-6 h-6 align-middle">
                                      <span className="block w-6 h-6 border-2 border-[#d4a03a] border-t-transparent rounded-full animate-spin"></span>
                                    </span>
                                    <span className="font-bold">Removing...</span>
                                  </span>
                                ) : addedMap[pkg.name] || selectedPackage === pkg.name ? (
                                  <span className="flex items-center gap-2 animate-fade-in">
                                    {/* Checkmark animation */}
                                    <svg className="w-6 h-6 text-white animate-pop" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="font-bold">Added to Order</span>
                                  </span>
                                ) : (
                                  <span>Add to Order</span>
                                )}
                              </span>
                            </button>
                            <ul className="flex-1 mb-0 space-y-1 text-base">
                              {/* Included features at the top */}
                              {included.map((feature, i) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-2 text-[#262F3F] font-medium"
                                >
                                  <span className="inline-block w-5 h-5 rounded-full flex items-center justify-center bg-[#262F3F] text-white">✓</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                              {/* Excluded features below (skip drone shots) */}
                              {excluded.filter(f => !['1–2 Drone Shots', '2–3 Drone Shots', '3–5 Drone Shots'].includes(f)).map((feature, i) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-2 text-gray-400 line-through"
                                >
                                  <span className="inline-block w-5 h-5 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* OR Divider */}
                  {viewMode === 'both' && (
                    <div className="flex items-center my-6 md:my-8 transition-all duration-500">
                      <div className="flex-1 h-px bg-gray-200 md:bg-gray-300" />
                      <span className="mx-2 md:mx-4 text-gray-400 font-semibold text-xs md:text-base">OR</span>
                      <div className="flex-1 h-px bg-gray-200 md:bg-gray-300" />
                  </div>
                  )}

                  {/* Individual Services Section Header & Description */}
                  <div
                    className={`transition-all duration-500 ${viewMode === 'packages' ? 'opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden' : 'opacity-100 translate-y-0'}`}
                    style={{ transitionProperty: 'opacity, transform, height' }}
                  >
                    <h2 className="text-4xl font-serif font-bold mb-2 text-[#262F3F] text-left md:text-center">A La Carte Services</h2>
                    <p className="text-base md:text-lg text-[#262F3F] mb-6 text-left md:text-center max-w-2xl mx-auto">Pick exactly what you need with clear, straightforward pricing. Whether you're after just photos, a virtual tour, or a custom add-on, you can build your own package from our full service list.</p>
                    <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                      <h3 className="text-base md:text-lg font-semibold mb-4">Select Individual Services</h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 mb-4 md:mb-6">
                        {services.map(service => {
                          const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                          const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                          // Normalize function for feature matching
                          const normalize = (s: string) => s.replace(/\s*\(.*\)/, '').trim();
                          // Check if this service is included in the selected package
                          let includedInPackage = false;
                          let packageHasCustomVideo = false;
                          let coveredByCustomVideo = false;
                          const customVideoServices = [
                            'Property Highlights Video',
                            'Social Media Reel',
                            'Drone Aerial Video',
                          ];
                          if (selectedPackage) {
                            const pkg = hardcodedPackages[selectedSize]?.find(p => p.name === selectedPackage);
                            if (pkg) {
                              includedInPackage = pkg.features.some(f => normalize(f) === normalize(service.name));
                              packageHasCustomVideo = pkg.features.some((pf: string) => normalize(pf) === 'Custom Video');
                              coveredByCustomVideo = packageHasCustomVideo && customVideoServices.includes(service.name) && !includedInPackage;
                            }
                          }
                          const isVirtual = service.id === 'virtualStaging' || service.id === 'virtualTwilight';
                          const qty = serviceQuantities[service.id] || 0;
                          return (
                            <label key={service.id} className={`relative flex items-center border rounded-lg p-3 md:p-4 cursor-pointer transition-all
                              ${selectedServices.includes(service.id) ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'}
                              ${selectedPackage && (includedInPackage || coveredByCustomVideo) ? 'opacity-50 pointer-events-none' : ''}
                            `}
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service.id) && qty > 0}
                                onChange={() => {
                                  if (selectedServices.includes(service.id)) {
                                    setSelectedServices(selectedServices.filter(id => id !== service.id));
                                    if (isVirtual) setServiceQuantities(prev => ({ ...prev, [service.id]: 0 }));
                                  } else {
                                    setSelectedServices([...selectedServices, service.id]);
                                    if (isVirtual && (!serviceQuantities[service.id] || serviceQuantities[service.id] < 1)) setServiceQuantities(prev => ({ ...prev, [service.id]: 1 }));
                                  }
                                }}
                                disabled={!!selectedPackage && (includedInPackage || coveredByCustomVideo)}
                                className="mr-3 w-5 h-5 accent-blue-600 relative z-10"
                              />
                              {/* Custom checkmark for selected state */}
                              {selectedServices.includes(service.id) && qty > 0 && (
                                <span className="absolute left-2.5 top-1.5 pointer-events-none z-20">
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                              <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm md:text-base">{service.name}</span>
                                  {includedInPackage && (
                                    <span className="notice-tag notice-gold animate-fade-in">
                                      <svg className="w-4 h-4 mr-1 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l4 4 6-8" /></svg>
                                      Included in Package
                                    </span>
                                  )}
                                  {coveredByCustomVideo && (
                                    <span className="notice-tag notice-blue animate-fade-in">
                                      <svg className="w-4 h-4 mr-1 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path strokeLinecap="round" strokeLinejoin="round" d="M4 10h12M10 4v12" /></svg>
                                      Covered by Custom Video in Package
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 flex items-center gap-2">
                                  {typeof price === 'number' ? `$${price.toFixed(2)}` : `$${price}`}
                                  {isVirtual && (
                                    <span className="flex items-center gap-1 ml-2">
                                      <button
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                        onClick={e => {
                                          e.preventDefault();
                                          setServiceQuantities(prev => {
                                            const newQty = Math.max(0, (prev[service.id] || 0) - 1);
                                            if (newQty === 0) {
                                              setSelectedServices(selectedServices.filter(id => id !== service.id));
                                            } else if (!selectedServices.includes(service.id)) {
                                              setSelectedServices([...selectedServices, service.id]);
                                            }
                                            return { ...prev, [service.id]: newQty };
                                          });
                                        }}
                                        aria-label="Decrease quantity"
                                        disabled={qty <= 0}
                                      >
                                        -
                                      </button>
                                      <span className="mx-2 min-w-[20px] text-center select-none">{qty}</span>
                                      <button
                                        type="button"
                                        className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-lg font-bold bg-white hover:bg-gray-100 transition"
                                        onClick={e => {
                                          e.preventDefault();
                                          setServiceQuantities(prev => {
                                            const newQty = (prev[service.id] || 0) + 1;
                                            if (!selectedServices.includes(service.id) && newQty > 0) {
                                              setSelectedServices([...selectedServices, service.id]);
                                            }
                                            return { ...prev, [service.id]: newQty };
                                          });
                                        }}
                                        aria-label="Increase quantity"
                                      >
                                        +
                                      </button>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 md:mt-4 gap-2 md:gap-0">
                        <div className="text-gray-600 text-xs md:text-sm">{selectedServices.length} services selected</div>
                        <div className="text-xl md:text-2xl font-bold">
                          ${selectedServices.reduce((sum, id) => {
                            const service = services.find(s => s.id === id);
                            if (!service) return sum;
                            const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                            const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                            const qty = serviceQuantities[id] || 1;
                            // For per-image services, show /image
                            const isPerImage = typeof price === 'string' && price.includes('/image');
                            let priceNum = 0;
                            if (typeof price === 'number') priceNum = price;
                            else if (typeof price === 'string') {
                              const match = price.match(/\d+(\.\d+)?/);
                              priceNum = match ? parseFloat(match[0]) : 0;
                            }
                            const priceDisplay = isPerImage
                              ? `$${priceNum.toFixed(2)}/image x${qty}`
                              : qty > 1
                                ? `$${priceNum.toFixed(2)} x${qty}`
                                : `$${priceNum.toFixed(2)}`;
                            return sum + priceNum * qty;
                          }, 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unified Order Overview (always visible if there is a package or any services selected) */}
                  {(selectedPackage || selectedServices.length > 0) && (
                    <div className="mt-8 animate-fade-in-up">
                      <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-xl mx-auto p-6 relative overflow-hidden order-overview-card">
                        {/* Dopamine confetti animation on add (optional, simple CSS pulse for now) */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200 rounded-full opacity-40 blur-2xl animate-pulse pointer-events-none"></div>
                        <h5 className="text-lg font-bold mb-4 text-[#262F3F] flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#d4a03a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                          Order Overview
                        </h5>
                        {/* Show address if available */}
                        {form.watch("address") && (
                          <div className="flex items-center gap-2 mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="font-medium text-gray-700 truncate" title={form.watch("address")}>{form.watch("address")}</span>
                          </div>
                        )}
                        <ul className="text-base text-gray-800 space-y-2 mb-2">
                          {selectedPackage && (() => {
                            const pkg = hardcodedPackages[selectedSize]?.find(p => p.name === selectedPackage);
                            return pkg ? (
                              <li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 animate-fade-in">
                                <span className="font-medium flex items-center gap-2">
                                  <svg className="w-5 h-5 text-[#d4a03a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
                                  {pkg.name}
                                </span>
                                <span className="font-semibold">{pkg.price}</span>
                              </li>
                            ) : null;
                          })()}
                          {selectedServices.map((id, idx) => {
                            const service = services.find(s => s.id === id);
                            if (!service) return null;
                            const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                            const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                            const qty = serviceQuantities[id] || 1;
                            const isPerImage = typeof price === 'string' && price.includes('/image');
                            let priceNum = 0;
                            if (typeof price === 'number') priceNum = price;
                            else if (typeof price === 'string') {
                              const match = price.match(/\d+(\.\d+)?/);
                              priceNum = match ? parseFloat(match[0]) : 0;
                            }
                            const priceDisplay = isPerImage
                              ? `$${priceNum.toFixed(2)}/image x${qty}`
                              : qty > 1
                                ? `$${priceNum.toFixed(2)} x${qty}`
                                : `$${priceNum.toFixed(2)}`;
                            return (
                              <li key={id} className={`flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 transition-all duration-300 ${idx % 2 === 0 ? 'bg-white/40' : ''} rounded-lg group hover:bg-blue-50/60 animate-fade-in-up`}>
                                <span className="font-medium flex items-center gap-2">
                                  {service.name}
                                  <span className="ml-3 flex items-center gap-1">
                                    <button
                                      type="button"
                                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                      onClick={() => handleQuantityChange(id, -1)}
                                      aria-label="Decrease quantity"
                                      disabled={qty <= 0}
                                    >
                                      -
                                    </button>
                                    <span className="mx-2 min-w-[20px] text-center select-none">{qty}</span>
                                    <button
                                      type="button"
                                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-lg font-bold bg-white hover:bg-gray-100 transition"
                                      onClick={() => handleQuantityChange(id, 1)}
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </span>
                                </span>
                                <span className="font-semibold">{priceDisplay}</span>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="flex justify-between text-xl font-semibold border-t pt-4 mt-4 animate-fade-in">
                          <span>Total</span>
                          <span>
                            {(() => {
                              let total = 0;
                              if (selectedPackage) {
                                const pkg = hardcodedPackages[selectedSize]?.find(p => p.name === selectedPackage);
                                if (pkg) total += parseFloat(pkg.price.replace('$', ''));
                              }
                              total += selectedServices.reduce((sum, id) => {
                                const service = services.find(s => s.id === id);
                                if (!service) return sum;
                                const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                                const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                                const qty = serviceQuantities[id] || 1;
                                let priceNum = 0;
                                if (typeof price === 'number') priceNum = price;
                                else if (typeof price === 'string') {
                                  const match = price.match(/\d+(\.\d+)?/);
                                  priceNum = match ? parseFloat(match[0]) : 0;
                                }
                                return sum + priceNum * qty;
                              }, 0);
                              return `$${total.toFixed(2)}`;
                            })()}
                          </span>
                        </div>
                        <button
                          className="w-full bg-[#262F3F] hover:bg-[#1a202c] text-white font-semibold rounded-lg py-3 mt-4 transition disabled:opacity-60 animate-fade-in"
                          disabled={!(selectedPackage || selectedServices.length > 0)}
                          type="button"
                          onClick={() => setStep(4)}
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requirements or information we should know?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide any additional details that might help us prepare for your service.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Booking Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Name:</div>
                      <div>{form.watch("name")}</div>

                      <div className="text-gray-600">Email:</div>
                      <div>{form.watch("email")}</div>

                      <div className="text-gray-600">Phone:</div>
                      <div>{form.watch("phone")}</div>

                      <div className="text-gray-600">Address:</div>
                      <div>{form.watch("address")}</div>

                      <div className="text-gray-600">Property Type:</div>
                      <div className="capitalize">{form.watch("propertyType")}</div>

                      <div className="text-gray-600">Square Footage:</div>
                      <div>{form.watch("squareFootage")} sq ft</div>

                      <div className="text-gray-600">Date:</div>
                      <div>{form.watch("date") ? formatDate(new Date(form.watch("date")), "MMM dd, yyyy") : "Not selected"}</div>
                      <div className="text-gray-600">Time:</div>
                      <div>{form.watch("time") ? (() => {
                        const [hourStr, minuteStr] = form.watch("time").split(":");
                        let hour = parseInt(hourStr, 10);
                        const minute = minuteStr;
                        const ampm = hour >= 12 ? "PM" : "AM";
                        if (hour === 0) hour = 12;
                        else if (hour > 12) hour -= 12;
                        return `${hour}:${minute} ${ampm}`;
                      })() : "Not selected"}</div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting || submitAnim === 'loading' || submitStatus === 'loading'}>
                      {submitAnim === 'loading' ? (
                        <span className="flex items-center gap-2 animate-fade-in">
                          <span className="inline-block w-6 h-6 align-middle">
                            <span className="block w-6 h-6 border-2 border-[#d4a03a] border-t-transparent rounded-full animate-spin"></span>
                          </span>
                          Sending booking…
                        </span>
                      ) : submitAnim === 'success' ? (
                        <span className="flex items-center gap-2 animate-pop">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-bold">Booking Sent!</span>
                        </span>
                      ) : submitAnim === 'error' ? (
                        <span className="flex items-center gap-2 animate-pop">
                          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="3" fill="none"/>
                          </svg>
                          <span className="font-bold">Failed!</span>
                        </span>
                      ) : (
                        'Complete Booking'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.7s linear infinite;
        }
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-in;
        }
        @keyframes success-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success-pop {
          animation: success-pop 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes error-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-error-pop {
          animation: error-pop 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .notice-tag {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.13rem 0.5rem;
          box-shadow: 0 1px 4px 0 rgba(38,47,63,0.10);
          margin-left: 0.25rem;
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
          min-width: 0;
          white-space: normal;
          letter-spacing: 0.01em;
          transition: background 0.2s, color 0.2s;
          line-height: 1.2;
          max-width: 100%;
          word-break: break-word;
        }
        .notice-tag svg {
          width: 0.95em;
          height: 0.95em;
          margin-right: 0.3em;
          flex-shrink: 0;
        }
        .notice-gold {
          background: #d4a03a;
          color: #fff;
        }
        .notice-blue {
          background: #262F3F;
          color: #fff;
        }
        @media (max-width: 640px) {
          .notice-tag {
            font-size: 0.68rem;
            padding: 0.10rem 0.35rem;
            margin-left: 0.15rem;
          }
          .notice-tag svg {
            width: 0.9em;
            height: 0.9em;
            margin-right: 0.18em;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
