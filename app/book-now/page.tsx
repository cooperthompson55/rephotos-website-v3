"use client"

import { useState, useRef, useEffect } from "react"
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
import { cn } from "../../lib/utils"
import { Camera, Compass, Video, Instagram, LayoutGrid, Globe, Building, PenTool, ChevronUp, ChevronDown } from "lucide-react"
import { useState as useLocalState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loadPricingData, type SizeKey, type PricingData, type PackagesData, type PackageFeature, type PackageCard } from "@/lib/pricing-parser"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to proceed."
  }),
})

// Generate services from dynamic pricing data
const getServicesFromPricingData = (pricingData: PricingData | null) => {
  if (!pricingData) return [];
  
  const sampleSize = "<1000" as SizeKey;
  return [
    { id: "hdrPhotography", name: "HDR Photography", prices: [pricingData["<1000"].hdrPhotography, pricingData["1000-2000"].hdrPhotography, pricingData["2000-3000"].hdrPhotography, pricingData["3000-4000"].hdrPhotography, pricingData["4000-5000"].hdrPhotography] },
    { id: "virtualTour", name: "360° Virtual Tour", prices: [pricingData["<1000"].virtualTour, pricingData["1000-2000"].virtualTour, pricingData["2000-3000"].virtualTour, pricingData["3000-4000"].virtualTour, pricingData["4000-5000"].virtualTour] },
    { id: "propertyHighlightsVideo", name: "Property Highlights Video", prices: [pricingData["<1000"].propertyHighlightsVideo, pricingData["1000-2000"].propertyHighlightsVideo, pricingData["2000-3000"].propertyHighlightsVideo, pricingData["3000-4000"].propertyHighlightsVideo, pricingData["4000-5000"].propertyHighlightsVideo] },
    { id: "socialMediaReel", name: "Social Media Reel", prices: [pricingData["<1000"].socialMediaReel, pricingData["1000-2000"].socialMediaReel, pricingData["2000-3000"].socialMediaReel, pricingData["3000-4000"].socialMediaReel, pricingData["4000-5000"].socialMediaReel] },
    { id: "slideshowVideoTour", name: "Slideshow Video Tour", prices: [pricingData["<1000"].slideshowVideoTour, pricingData["1000-2000"].slideshowVideoTour, pricingData["2000-3000"].slideshowVideoTour, pricingData["3000-4000"].slideshowVideoTour, pricingData["4000-5000"].slideshowVideoTour] },
    { id: "droneAerialPhotos", name: "Drone Aerial Photos", prices: [pricingData["<1000"].droneAerialPhotos, pricingData["1000-2000"].droneAerialPhotos, pricingData["2000-3000"].droneAerialPhotos, pricingData["3000-4000"].droneAerialPhotos, pricingData["4000-5000"].droneAerialPhotos] },
    { id: "droneAerialVideo", name: "Drone Aerial Video", prices: [pricingData["<1000"].droneAerialVideo, pricingData["1000-2000"].droneAerialVideo, pricingData["2000-3000"].droneAerialVideo, pricingData["3000-4000"].droneAerialVideo, pricingData["4000-5000"].droneAerialVideo] },
    { id: "floorPlan2d", name: "2D Floor Plan", prices: [pricingData["<1000"].floorPlan2d, pricingData["1000-2000"].floorPlan2d, pricingData["2000-3000"].floorPlan2d, pricingData["3000-4000"].floorPlan2d, pricingData["4000-5000"].floorPlan2d] },
    { id: "houseModel3d", name: "3D House Model", prices: [pricingData["<1000"].houseModel3d, pricingData["1000-2000"].houseModel3d, pricingData["2000-3000"].houseModel3d, pricingData["3000-4000"].houseModel3d, pricingData["4000-5000"].houseModel3d] },
    { id: "propertyWebsite", name: "Property Website", prices: [pricingData["<1000"].propertyWebsite, pricingData["1000-2000"].propertyWebsite, pricingData["2000-3000"].propertyWebsite, pricingData["3000-4000"].propertyWebsite, pricingData["4000-5000"].propertyWebsite] },
    { id: "customDomainName", name: "Custom Domain Name", prices: [pricingData["<1000"].customDomainName, pricingData["1000-2000"].customDomainName, pricingData["2000-3000"].customDomainName, pricingData["3000-4000"].customDomainName, pricingData["4000-5000"].customDomainName] },
    { id: "virtualDeclutter", name: "Virtual Declutter", prices: [pricingData["<1000"].virtualDeclutter, pricingData["1000-2000"].virtualDeclutter, pricingData["2000-3000"].virtualDeclutter, pricingData["3000-4000"].virtualDeclutter, pricingData["4000-5000"].virtualDeclutter] },
    { id: "virtualStaging", name: "Virtual Staging", prices: [pricingData["<1000"].virtualStaging, pricingData["1000-2000"].virtualStaging, pricingData["2000-3000"].virtualStaging, pricingData["3000-4000"].virtualStaging, pricingData["4000-5000"].virtualStaging] },
    { id: "virtualTwilight", name: "Virtual Twilight", prices: [pricingData["<1000"].virtualTwilight, pricingData["1000-2000"].virtualTwilight, pricingData["2000-3000"].virtualTwilight, pricingData["3000-4000"].virtualTwilight, pricingData["4000-5000"].virtualTwilight] },
  ];
};

const sizeOptions = [
  { value: "<1000", label: "Under 1000 sq ft", range: "0–999 sq ft" },
  { value: "1000-2000", label: "1000–1999 sq ft", range: "1000–1999 sq ft" },
  { value: "2000-3000", label: "2000–2999 sq ft", range: "2000–2999 sq ft" },
  { value: "3000-4000", label: "3000–3999 sq ft", range: "3000–3999 sq ft" },
  { value: "4000-5000", label: "4000–4999 sq ft", range: "4000–4999 sq ft" },
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
  const [tabErrors, setTabErrors] = useState<{ [tabNum: number]: boolean }>({})
  const [stickyBarVisible, setStickyBarVisible] = useState(false)
  const [stickyBarAnimating, setStickyBarAnimating] = useState(false)
  const [barExpanded, setBarExpanded] = useState(false)

  // State for dynamic pricing data
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [packagesData, setPackagesData] = useState<PackagesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load pricing data on component mount
  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('/api/pricing-data')
        if (response.ok) {
          const data = await response.json()
          setPricingData(data.pricingData)
          setPackagesData(data.packagesData)
        } else {
          console.error('Failed to fetch pricing data')
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPricingData()
  }, [])

  // Manage sticky bar animations
  useEffect(() => {
    const shouldShow = step === 3 && (selectedPackage || selectedServices.length > 0)
    
    if (shouldShow && !stickyBarVisible) {
      // Show bar with entrance animation
      setStickyBarVisible(true)
      setStickyBarAnimating(false)
    } else if (!shouldShow && stickyBarVisible) {
      // Hide bar with exit animation
      setStickyBarAnimating(true)
      const timer = setTimeout(() => {
        setStickyBarVisible(false)
        setStickyBarAnimating(false)
      }, 300) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [step, selectedPackage, selectedServices.length, stickyBarVisible])

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
      acceptTerms: false,
    },
  })

  const today = typeof window !== "undefined" ? new Date() : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  // Individual step validation functions
  const validateStep1 = (values: z.infer<typeof formSchema>) => {
    const errors = [];
    if (!values.name || values.name.length < 2) errors.push("Name is required");
    if (!values.email || !values.email.includes("@")) errors.push("Valid email is required");
    if (!values.phone || values.phone.length < 10) errors.push("Valid phone number is required");
    return errors;
  }

  const validateStep2 = (values: z.infer<typeof formSchema>) => {
    const errors = [];
    if (!values.address || values.address.length < 5) errors.push("Property address is required");
    if (!values.propertyType) errors.push("Property type is required");
    if (!values.squareFootage) errors.push("Square footage is required");
    if (!values.date) errors.push("Date is required");
    if (!values.time) errors.push("Time is required");
    return errors;
  }

  const validateStep3 = () => {
    const errors = [];
    if (!selectedSize) errors.push("Property size is required");
    if (!selectedPackage && selectedServices.length === 0) errors.push("Please select at least one package or service");
    return errors;
  }

  const validateStep4 = (values: z.infer<typeof formSchema>) => {
    const errors = [];
    if (!values.acceptTerms) errors.push("You must accept the terms and conditions");
    return errors;
  }

  const checkAllTabErrors = (values: z.infer<typeof formSchema>) => {
    const step1Errors = validateStep1(values).length > 0;
    const step2Errors = validateStep2(values).length > 0;
    const step3Errors = validateStep3().length > 0;
    const step4Errors = validateStep4(values).length > 0;
    
    setTabErrors({
      1: step1Errors,
      2: step2Errors,
      3: step3Errors,
      4: step4Errors
    });

    return { step1Errors, step2Errors, step3Errors, step4Errors };
  }

  const validateRequiredBookingFields = (values: z.infer<typeof formSchema>) => {
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
    if (!values.acceptTerms) return "You must accept the terms and conditions to proceed.";
    return null;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setTopLevelError(null);
    const missing = validateRequiredBookingFields(values);
    if (missing) {
      setTopLevelError(missing);
      setIsSubmitting(false);
      setSubmitStatus('idle');
      setSubmitAnim('idle');
      // Show which tabs have errors
      checkAllTabErrors(values);
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
    if (selectedPackage && packagesData) {
      // Find the selected package object
      const pkg = packagesData[propertySize as SizeKey]?.find(p => p.name === selectedPackage);
      if (pkg) {
        // For each feature, try to find a matching service for price, else price 0
        servicesArr = pkg.features.map(f => {
          // Try to match to a service for price
          let service = getServicesFromPricingData(pricingData).find(s => f.label.includes(s.name));
          let price = 0;
          if (service) {
            const sizeIdx = sizeOptions.findIndex(opt => opt.value === propertySize);
            const p = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
            price = typeof p === 'number' ? p : parseFloat(p);
          } else {
            price = 0;
          }
          return {
            name: f.label,
            price,
            count: 1,
            total: price,
          };
        });
        totalAmount = servicesArr.reduce((sum: number, s: any) => sum + s.total, 0);
      }
    } else if (selectedServices.length > 0) {
      servicesArr = selectedServices.map(id => {
        const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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

    const safe = (val: string | undefined | null) => (val && val.trim() !== '' ? val : 'Unknown');
    const street = safe(values.address);
    const street2 = '';
    const city = '';
    const province = '';
    const zipCode = '';

    const payload = {
      property_size: propertySize,
      services: servicesArr,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      address: {
        street: safe(street),
        street2: safe(street2),
        city: safe(city),
        province: safe(province),
        zipCode: safe(zipCode),
      },
      notes: safe(values.additionalInfo || ''),
      preferred_date: safe(values.date),
      time: safe(values.time),
      property_status: 'Vacant',
      status: 'pending',
      user_id: null,
      agent_name: safe(values.name),
      agent_email: safe(values.email),
      agent_phone: safe(values.phone),
      agent_company: 'Unknown',
      package_name: selectedPackage || null,
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
          await fetch('https://jshnsfvvsmjlxlbdpehf.functions.supabase.co/index', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
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

  // Add a function to handle step navigation with validation
  const handleStepNavigation = async (targetStep: number) => {
    if (targetStep === step) return;
    
    // Allow free navigation between all tabs
    setStep(targetStep);
    
    // Scroll to top of page smoothly when navigating steps
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  // Clear tab errors in real-time as users fill fields
  const clearTabErrorsOnChange = () => {
    const currentValues = form.getValues();
    
    // Clear step 1 errors if all fields are valid
    if (validateStep1(currentValues).length === 0) {
      setTabErrors(prev => ({ ...prev, 1: false }));
    }
    
    // Clear step 2 errors if all fields are valid
    if (validateStep2(currentValues).length === 0) {
      setTabErrors(prev => ({ ...prev, 2: false }));
    }
    
    // Clear step 3 errors if selection is made
    if (validateStep3().length === 0) {
      setTabErrors(prev => ({ ...prev, 3: false }));
    }

    // Clear step 4 errors if all fields are valid
    if (validateStep4(currentValues).length === 0) {
      setTabErrors(prev => ({ ...prev, 4: false }));
    }
  };

  // Check if tabs should show warning indicators
  const getTabCompletionStatus = (stepNum: number) => {
    const currentValues = form.getValues();
    
    switch (stepNum) {
      case 1:
        return validateStep1(currentValues).length === 0;
      case 2:
        return validateStep2(currentValues).length === 0;
      case 3:
        return validateStep3().length === 0;
      case 4:
        return validateStep4(currentValues).length === 0;
      default:
        return true;
    }
  };

  // Show loading state while pricing data is being fetched
  if (isLoading || !pricingData || !packagesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    )
  }

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
              {[1, 2, 3, 4].map((s, idx) => (
                <div
                  key={s}
                  className={`h-1 w-1/4 transition-colors duration-200 ${step >= s ? "bg-blue-600" : "bg-gray-300"}`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {[
                { label: "Personal Info", stepNum: 1 },
                { label: "Property Details", stepNum: 2 },
                { label: "Choose Services", stepNum: 3 },
                { label: "Confirmation", stepNum: 4 },
              ].map(({ label, stepNum }, idx) => {
                const isActive = step === stepNum;
                // Allow navigation to any tab without requiring completion of previous tabs
                const isAvailable = true;
                const hasSubmissionError = tabErrors[stepNum];
                // Only show warnings after a failed submission attempt, not during navigation
                const showWarning = hasSubmissionError;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`transition-colors font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-1
                      ${isActive ? "text-blue-600" : isAvailable ? "text-blue-500 hover:text-blue-700" : "text-gray-400"}
                      ${isActive ? "underline underline-offset-4" : ""}
                      ${!isAvailable ? "cursor-default" : ""}
                    `}
                    aria-current={isActive ? "step" : undefined}
                    aria-disabled={!isAvailable}
                    tabIndex={isAvailable ? 0 : -1}
                    onClick={() => handleStepNavigation(stepNum)}
                    style={isActive ? { border: 'none', boxShadow: 'none' } : {}}
                  >
                    {label}
                    {showWarning && !isActive && (
                      <svg 
                        className="w-4 h-4 text-red-500 animate-pulse" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-label="Incomplete fields"
                      >
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
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
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              clearTabErrorsOnChange();
                            }}
                          />
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
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              clearTabErrorsOnChange();
                            }}
                          />
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
                          <Input 
                            placeholder="(123) 456-7890" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              clearTabErrorsOnChange();
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={() => handleStepNavigation(step + 1)} className="bg-[#1c4596] hover:bg-[#2853AE] text-white">
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
                          <Input 
                            placeholder="123 Main Street" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              clearTabErrorsOnChange();
                            }}
                          />
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
                            onValueChange={(value) => {
                              field.onChange(value);
                              clearTabErrorsOnChange();
                            }}
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
                          <Input 
                            placeholder="e.g. 1500" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              clearTabErrorsOnChange();
                            }}
                          />
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
                                        clearTabErrorsOnChange()
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
                              onChange={(e) => {
                                field.onChange(e);
                                clearTabErrorsOnChange();
                              }}
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
                    <Button type="button" variant="outline" onClick={() => handleStepNavigation(step - 1)}>
                      Previous
                    </Button>
                    <Button type="button" onClick={() => handleStepNavigation(step + 1)} className="bg-[#1c4596] hover:bg-[#2853AE] text-white">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  {/* Packages/Services Selector */}
                  <div className="flex justify-center items-center mb-6 gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-full font-semibold transition-all border-2 focus:outline-none text-base md:text-lg ${viewMode === 'both' ? 'bg-[#1c4596] text-white border-[#1c4596]' : 'bg-white text-[#1c4596] border-gray-300 hover:bg-[#f5efe0]'}`}
                        onClick={() => setViewMode('both')}
                        aria-pressed={viewMode === 'both'}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-full font-semibold transition-all border-2 focus:outline-none text-base md:text-lg ${viewMode === 'packages' ? 'bg-[#1c4596] text-white border-[#1c4596]' : 'bg-white text-[#1c4596] border-gray-300 hover:bg-[#f5efe0]'}`}
                        onClick={() => setViewMode('packages')}
                        aria-pressed={viewMode === 'packages'}
                      >
                        Packages
                      </button>
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-full font-semibold transition-all border-2 focus:outline-none text-base md:text-lg ${viewMode === 'services' ? 'bg-[#1c4596] text-white border-[#1c4596]' : 'bg-white text-[#1c4596] border-gray-300 hover:bg-[#f5efe0]'}`}
                        onClick={() => setViewMode('services')}
                        aria-pressed={viewMode === 'services'}
                      >
                        Individual Services
                      </button>
                    </div>
                    
                    {/* Cart Icon */}
                    <button
                      type="button"
                      className="ml-4 p-2 rounded-full bg-[#1c4596] text-white hover:bg-[#2853AE] transition-all focus:outline-none relative"
                      onClick={() => handleStepNavigation(4)}
                      title="View Cart"
                      aria-label="View cart"
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      
                      {/* Cart Badge - Show if there are items */}
                      {(selectedPackage || selectedServices.length > 0) && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {selectedPackage ? 1 + selectedServices.length : selectedServices.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Shared Size Selector */}
                  <div className="flex flex-col items-center mb-8">
                    <span className="text-base font-medium mb-2 text-[#1c4596]">Select Property Size</span>
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
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none ${selectedSize === opt.value ? 'bg-[#1c4596] border-[#1c4596]' : 'bg-white border-[#1c4596]'} ${selectedSize === opt.value ? '' : 'hover:bg-[#f5efe0]'}`}
                            style={{ marginTop: 0 }}
                          >
                            {selectedSize === opt.value && <span className="w-4 h-4 rounded-full bg-[#1c4596] block" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 text-lg font-bold text-[#1c4596]">{sizeOptions.find(opt => opt.value === selectedSize)?.label}</div>
                  </div>

                  {/* Packages Section */}
                  <div
                    className={`transition-all duration-500 ${viewMode === 'services' ? 'opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden' : 'opacity-100 translate-y-0'} ${viewMode === 'both' ? '' : 'mb-0'}`}
                    style={{ transitionProperty: 'opacity, transform, height' }}
                  >
                    <h2 className="text-4xl font-serif font-bold mb-2 text-[#262F3F]">Complete Listing Packages</h2>
                    <p className="text-lg text-[#262F3F] mb-8">Get your listing ready for MLS with our all-in-one packages. They include everything you need to market your property, with clear pricing and the option to add extra services if needed.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {packagesData[selectedSize as SizeKey].map((pkg, idx) => (
                        <div
                          key={pkg.name + idx}
                          className={`flex flex-col rounded-xl border ${pkg.borderColor || "border-gray-200"} bg-white p-6 shadow-sm transition-all`}
                        >
                          <div className="mb-2 text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86]">{pkg.name}</div>
                          <div className="flex items-end gap-2 mb-1">
                            <span className="text-4xl font-mazzard font-semibold text-[#262F3F]">
                              {pkg.price}
                            </span>
                          </div>
                          <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">
                            {pkg.sqft}
                          </div>
                          <div className={`mb-2 text-sm font-mazzard font-semibold ${pkg.discountColor}`}>{pkg.discount}</div>
                          <button
                            className={`w-full mb-4 mt-2 font-mazzard font-semibold text-base rounded-md py-3 transition-colors flex items-center justify-center gap-2 relative overflow-hidden
                              ${selectedPackage === pkg.name || addedMap[pkg.name] ? 'bg-[#2853AE] text-white' : 'bg-[#1c4596] text-white hover:bg-[#2853AE]'}
                              ${pkg.buttonColor || ''}
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
                                  clearTabErrorsOnChange();
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
                                    <span className="block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                  </span>
                                  <span className="font-bold">Adding...</span>
                                </span>
                              ) : removingMap[pkg.name] ? (
                                <span className="flex items-center gap-2 animate-fade-in">
                                  {/* Spinner animation for removing */}
                                  <span className="inline-block w-6 h-6 align-middle">
                                    <span className="block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
                                <span>Add This Package</span>
                              )}
                            </span>
                          </button>
                          <ul className="flex-1 mb-4 space-y-1 text-sm">
                            {pkg.features.map((feature: PackageFeature, i: number) => (
                              <li key={i} className={`flex items-center gap-2 ${feature.included ? "text-[#262F3F]" : "text-[#B0B7C3] line-through"}`}>
                                {feature.included ? (
                                  <span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>
                                ) : (
                                  <span className="inline-block w-4 h-4 rounded-full bg-[#E5E7EB] text-[#B0B7C3] flex items-center justify-center">✗</span>
                                )}
                                <span>{feature.label}</span>
                              </li>
                            ))}
                          </ul>
                          {/* Included with every package section */}
                          <div className="bg-[#f8f9fa] rounded-lg px-4 py-3 -mx-2 border-t border-gray-100">
                            <div className="text-[10px] font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-2">INCLUDED WITH EVERY PACKAGE</div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                                <span className="text-[#262F3F] font-medium">Next-Day Turnaround</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                                <span className="text-[#262F3F] font-medium">Quality Guarantee</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                                <span className="text-[#262F3F] font-medium">Secure Cloud Backup</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                      {/* Organized service groups */}
                      {(() => {
                        // Helper to render a service
                        function renderService(service: any, isAddon = false) {
                          const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                          const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                          let includedInPackage = false;
                          let packageHasCustomVideo = false;
                          let coveredByCustomVideo = false;
                          const customVideoServices = [
                            'Property Highlights Video',
                            'Social Media Reel',
                            'Drone Aerial Video',
                          ];
                          if (selectedPackage) {
                            const pkg = packagesData && packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                            if (pkg) {
                              includedInPackage = pkg.features.some(f => f.included && f.label === service.name);
                              packageHasCustomVideo = pkg.features.some((pf: PackageFeature) => pf.included && pf.label === 'Custom Video');
                              coveredByCustomVideo = packageHasCustomVideo && customVideoServices.includes(service.name) && !includedInPackage;
                            }
                          }
                          const isVirtual = service.id === 'virtualStaging' || service.id === 'virtualTwilight' || service.id === 'virtualDeclutter';
                          const qty = serviceQuantities[service.id] || 0;
                          const isChecked = isVirtual ? (selectedServices.includes(service.id) && qty > 0) : selectedServices.includes(service.id);
                          // Change label for Drone Aerial Photos
                          const displayName = service.id === 'droneAerialPhotos'
                            ? 'Drone Aerial Photos (10-15 images)'
                            : service.id === 'droneAerialVideo'
                              ? 'Drone Aerial Video (30-60 seconds, edited)'
                              : service.name;
                          return (
                            <label
                              key={service.id}
                              className={`relative flex items-center border rounded-lg p-3 md:p-4 cursor-pointer transition-all
                                ${selectedServices.includes(service.id) ? '' : 'border-gray-200'}
                                ${selectedPackage && (includedInPackage || coveredByCustomVideo) ? 'opacity-50 pointer-events-none' : ''}
                                ${isAddon ? 'bg-[#f8f9fa] text-xs md:text-sm py-2' : ''}
                              `}
                              style={isAddon ? { fontSize: '0.92rem', padding: '0.75rem 1rem' } : {}}
                            >
                              <span className="relative mr-3 w-6 h-6 flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (selectedServices.includes(service.id)) {
                                      setSelectedServices(selectedServices.filter(id => id !== service.id));
                                      if (isVirtual) setServiceQuantities(prev => ({ ...prev, [service.id]: 0 }));
                                    } else {
                                      setSelectedServices([...selectedServices, service.id]);
                                      if (isVirtual && (!serviceQuantities[service.id] || serviceQuantities[service.id] < 1)) setServiceQuantities(prev => ({ ...prev, [service.id]: 1 }));
                                    }
                                    clearTabErrorsOnChange();
                                  }}
                                  disabled={!!selectedPackage && (includedInPackage || coveredByCustomVideo)}
                                  className="absolute w-6 h-6 opacity-0 cursor-pointer z-10"
                                  tabIndex={0}
                                  aria-checked={isChecked}
                                />
                                <span className={`block w-6 h-6 rounded border transition-all duration-200
                                  ${isChecked ? 'bg-blue-600 border-blue-600 shadow-lg' : 'bg-white border-gray-300'}
                                  ${!!selectedPackage && (includedInPackage || coveredByCustomVideo) ? 'opacity-50' : ''}
                                `} />
                                <svg
                                  className={`absolute left-0 top-0 w-6 h-6 pointer-events-none transition-transform transition-opacity duration-200
                                    ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                  style={{ color: 'white' }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium ${isAddon ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>{displayName}</span>
                                  {isAddon && <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-[10px] font-semibold uppercase">Add-on</span>}
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
                                <div className={`text-xs md:text-sm text-gray-500 flex items-center gap-2 ${isAddon ? 'opacity-80' : ''}`}>
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
                        }
                        return (
                          <div className="flex flex-col gap-8 mb-4 md:mb-6">
                            {/* Photography */}
                            <div>
                              <div className="font-bold text-[#1c4596] text-sm mb-2 uppercase tracking-wider">Photography</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-3">
                                {getServicesFromPricingData(pricingData).filter(s => s.id === 'hdrPhotography' || s.id === 'droneAerialPhotos').map(service => renderService(service))}
                              </div>
                            </div>
                            {/* Video */}
                            <div>
                              <div className="font-bold text-[#1c4596] text-sm mb-2 uppercase tracking-wider">Video</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-3">
                                {getServicesFromPricingData(pricingData).filter(s => ['propertyHighlightsVideo','socialMediaReel','slideshowVideoTour','droneAerialVideo'].includes(s.id)).map(service => renderService(service))}
                              </div>
                            </div>
                            {/* Floor Plans & Tours */}
                            <div>
                              <div className="font-bold text-[#1c4596] text-sm mb-2 uppercase tracking-wider">Floor Plans & Tours</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-3">
                                {getServicesFromPricingData(pricingData).filter(s => ['virtualTour','floorPlan2d','houseModel3d','propertyWebsite'].includes(s.id)).map(service => renderService(service))}
                              </div>
                            </div>
                            {/* Add-Ons */}
                            <div>
                              <div className="font-bold text-[#6B7A86] text-xs mb-2 uppercase tracking-wider">Add-Ons</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-3">
                                {getServicesFromPricingData(pricingData).filter(s => ['virtualDeclutter','virtualStaging','virtualTwilight','customDomainName'].includes(s.id)).map(service => renderService(service, true))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
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
                            const pkg = packagesData && packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
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
                            const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
                              if (selectedPackage && packagesData) {
                                const pkg = packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                                if (pkg) total += parseFloat(pkg.price.replace('$', ''));
                              }
                              total += selectedServices.reduce((sum, id) => {
                                const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
                          className="w-full bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold rounded-lg py-3 mt-4 transition disabled:opacity-60 animate-fade-in"
                          disabled={!(selectedPackage || selectedServices.length > 0)}
                          type="button"
                          onClick={() => handleStepNavigation(4)}
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

                  {/* Pricing Summary */}
                  {(selectedPackage || selectedServices.length > 0) && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="font-medium text-base md:text-lg mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#262F3F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Order Summary
                      </h3>
                      
                      <div className="space-y-3">
                        {/* Selected Package */}
                        {selectedPackage && (() => {
                          const pkg = packagesData && packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                          return pkg ? (
                            <div className="mb-4">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-[#d4a03a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="7" width="18" height="13" rx="2" />
                                    <path d="M16 3v4M8 3v4" />
                                  </svg>
                                  <span className="font-medium">{pkg.name}</span>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Package</span>
                                </div>
                                <span className="font-semibold text-[#262F3F] text-sm md:text-base">{pkg.price}</span>
                              </div>
                              
                              {/* Compact Services List */}
                              <div className="mt-2 flex flex-wrap gap-1">
                                {pkg.features.filter(feature => feature.included).map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-1 bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full">
                                    <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-medium">{feature.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {/* Individual Services */}
                        {selectedServices.map((id) => {
                          const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
                          const totalServicePrice = priceNum * qty;
                          
                          return (
                            <div key={id} className="flex justify-between items-center py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#2853AE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">{service.name}</span>
                                {qty > 1 && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">×{qty}</span>
                                )}
                                {isPerImage && (
                                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Per Image</span>
                                )}
                              </div>
                              <span className="font-semibold text-[#262F3F] text-sm md:text-base">
                                ${totalServicePrice.toFixed(2)}
                                {isPerImage && qty > 1 && (
                                  <span className="text-xs text-gray-500 ml-1">
                                    (${priceNum.toFixed(2)} × {qty})
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        })}

                        {/* Total */}
                        <div className="flex justify-between items-center pt-4 border-t-2 border-[#262F3F]">
                          <span className="text-base md:text-lg font-bold text-[#262F3F]">Total Amount</span>
                          <span className="text-lg md:text-xl font-bold text-[#262F3F]">
                            {(() => {
                              let total = 0;
                              if (selectedPackage && packagesData) {
                                const pkg = packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                                if (pkg) total += parseFloat(pkg.price.replace('$', ''));
                              }
                              total += selectedServices.reduce((sum, id) => {
                                const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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

                        {/* Property Size Info */}
                        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>Property Size: <strong>{sizeOptions.find(opt => opt.value === selectedSize)?.range || selectedSize}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Required Terms and Conditions Acceptance */}
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start space-x-3 p-4 border rounded-lg bg-blue-50 border-blue-200">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                clearTabErrorsOnChange();
                              }}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="flex-1">
                            <FormLabel className="text-sm font-medium text-gray-900 cursor-pointer">
                              <span className="text-red-500">*</span> I agree to the following terms and conditions:
                            </FormLabel>
                            <FormDescription className="mt-2 text-sm text-gray-700 space-y-1">
                              <div>• I confirm that the property will be <strong>photo-ready</strong> before the photography team arrives (cleaned, staged, and prepared)</div>
                              <div>• I understand and accept the <a href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</a></div>
                              <div>• I acknowledge that failure to have the property photo-ready may result in rescheduling fees or additional charges</div>
                            </FormDescription>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => handleStepNavigation(step - 1)}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting || submitAnim === 'loading' || submitStatus === 'loading'} className="bg-[#1c4596] hover:bg-[#2853AE] text-white">
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

      {/* Sticky Bottom Bar - Shows when services/packages selected and on step 3 */}
      {stickyBarVisible && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out
          ${stickyBarAnimating ? 'animate-slide-down opacity-0' : 'animate-slide-up opacity-100'}
          ${barExpanded ? 'h-[320px] md:h-[280px]' : 'h-[64px]'}
        `} style={{overflow: 'visible'}}>
          <div className={`container mx-auto px-4 py-3 flex flex-col transition-all duration-300 ${barExpanded ? 'h-full' : ''}`}>
            <div className="flex items-center justify-between">
              {/* Left side - Item count and total */}
              <div className="flex items-center gap-4">
                {/* Drop-up arrow + Cart as a single toggle button */}
                <button
                  aria-label={barExpanded ? 'Hide order details' : 'Show order details'}
                  onClick={() => setBarExpanded(v => !v)}
                  className="focus:outline-none flex items-center justify-center mr-2 group"
                  style={{height: '32px', minWidth: '56px', padding: 0, background: 'none', border: 'none'}}
                >
                  {barExpanded ? (
                    <ChevronDown className="w-6 h-6 text-gray-700 transition-transform group-hover:-translate-y-1" />
                  ) : (
                    <ChevronUp className="w-6 h-6 text-gray-700 transition-transform group-hover:-translate-y-1" />
                  )}
                  <svg className="w-5 h-5 text-[#1c4596] ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
                <span className="font-medium text-gray-700">
                  {(selectedPackage ? 1 : 0) + selectedServices.length} item{(selectedPackage ? 1 : 0) + selectedServices.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              {/* Right side - Total and Proceed button */}
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-[#262F3F]">
                  ${(() => {
                    let total = 0;
                    if (selectedPackage && packagesData) {
                      const pkg = packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                      if (pkg) total += parseFloat(pkg.price.replace('$', ''));
                    }
                    total += selectedServices.reduce((sum, id) => {
                      const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
                    return total.toFixed(2);
                  })()}
                </div>
                <button
                  className="bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold rounded-lg px-4 py-2 transition disabled:opacity-60"
                  disabled={!(selectedPackage || selectedServices.length > 0)}
                  type="button"
                  onClick={() => handleStepNavigation(4)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
            {/* Expandable order details */}
            <div className={`transition-all duration-300 overflow-hidden ${barExpanded ? 'max-h-[200px] mt-4 animate-fade-in-up' : 'max-h-0'} w-full`}
              style={{pointerEvents: barExpanded ? 'auto' : 'none'}}
            >
              <div className="bg-gray-50 rounded-xl shadow-inner p-4">
                <h4 className="text-base font-semibold mb-2 text-[#262F3F]">Order Details</h4>
                <ul className="text-sm text-gray-800 space-y-1">
                  {selectedPackage && (() => {
                    const pkg = packagesData && packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
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
                    const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
                            <span className="mx-2 min-w-[20px] text-center select-none">{qty}</span>
                          </span>
                        </span>
                        <span className="font-semibold">{priceDisplay}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-between text-base font-semibold border-t pt-4 mt-4 animate-fade-in">
                  <span>Total</span>
                  <span>
                    {(() => {
                      let total = 0;
                      if (selectedPackage && packagesData) {
                        const pkg = packagesData[selectedSize as SizeKey]?.find(p => p.name === selectedPackage);
                        if (pkg) total += parseFloat(pkg.price.replace('$', ''));
                      }
                      total += selectedServices.reduce((sum, id) => {
                        const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
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
              </div>
            </div>
          </div>
        </div>
      )}

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
          background: #1c4596;
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
        .custom-checkbox-anim {
          transition: box-shadow 0.2s, background 0.2s, border 0.2s;
        }
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(100%); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(100%); 
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-down {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}
