"use client"

import { useState } from "react"
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
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
  propertyType: z.enum(["residential", "commercial", "other"], {
    required_error: "Please select a property type.",
  }),
  squareFootage: z.string().min(1, {
    message: "Please enter the square footage.",
  }),
  serviceType: z.enum(
    ["photography", "videography", "virtual-tour", "floor-plan", "aerial", "virtual-staging", "website"],
    {
      required_error: "Please select a service type.",
    },
  ),
  date: z.date({
    required_error: "Please select a date.",
  }),
  additionalInfo: z.string().optional(),
})

export default function BookNowPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      squareFootage: "",
      additionalInfo: "",
    },
  })

  const today = typeof window !== "undefined" ? new Date() : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1 ? ["name", "email", "phone"] : ["address", "propertyType", "squareFootage", "serviceType", "date"]

    const isValid = await form.trigger(fieldsToValidate as any)
    if (isValid) setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  if (isSuccess) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h1>
          <p className="text-lg mb-6">
            Thank you for booking with us. We'll contact you shortly to confirm your appointment.
          </p>
          <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Book Your Service</h1>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`h-1 w-1/3 ${step >= 1 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className={`h-1 w-1/3 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className={`h-1 w-1/3 ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Personal Info</span>
            <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Property Details</span>
            <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>Confirmation</span>
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
                        <Input placeholder="123 Main St, City, State, ZIP" {...field} />
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
                              <RadioGroupItem value="residential" />
                            </FormControl>
                            <FormLabel className="font-normal">Residential</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="commercial" />
                            </FormControl>
                            <FormLabel className="font-normal">Commercial</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
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
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="videography">Videography</SelectItem>
                          <SelectItem value="virtual-tour">Virtual Tour</SelectItem>
                          <SelectItem value="floor-plan">Floor Plan</SelectItem>
                          <SelectItem value="aerial">Aerial Photography/Videography</SelectItem>
                          <SelectItem value="virtual-staging">Virtual Staging</SelectItem>
                          <SelectItem value="website">Property Website</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < today}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                    <div className="text-gray-600">Service:</div>
                    <div className="capitalize">{form.watch("serviceType")?.replace("-", " ")}</div>

                    <div className="text-gray-600">Date:</div>
                    <div>{form.watch("date") ? format(form.watch("date"), "PPP") : "Not selected"}</div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Complete Booking"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
