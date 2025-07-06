import fs from 'fs';
import path from 'path';

// Update size keys to match new CSV structure
export type SizeKey = "Under 1500" | "1500-2500" | "2500-3500" | "3500-4500" | "4500-5500";

export type PricingData = Record<SizeKey, {
  hdrPhotography: number;
  matterportTour: number;
  propertyHighlightsVideo: number;
  slideshowVideoTour: number;
  socialMediaReel: number;
  droneAerialPhotos: number;
  droneAerialVideo: number;
  dronePhotosVideo: number;
  floorPlan2d: number;
  houseModel3d: number;
  propertyWebsite: number;
  customDomainName: number;
  virtualDeclutter: string;
  virtualStaging: string;
  virtualTwilight: string;
}>;

export type PackageFeature = {
  label: string;
  included: boolean;
  gold?: boolean;
  bold?: boolean;
};

export type PackageCard = {
  name: string;
  price: string;
  subtitle: string;
  sqft: string;
  discount: string;
  discountColor: string;
  buttonColor: string;
  borderColor?: string;
  features: PackageFeature[];
  image: string;
  includes: string;
};

export type PackagesData = Record<SizeKey, PackageCard[]>;

// Helper function to format price with dollar sign
function formatPrice(price: number | string): string {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  return price.toString().startsWith('$') ? price.toString() : `$${price}`;
}

// Parse individual services from CSV
function parseIndividualServices(): PricingData {
  const pricingData = {} as PricingData;
  
  // Initialize data structure with new CSV pricing
  const sizeKeys: SizeKey[] = ["Under 1500", "1500-2500", "2500-3500", "3500-4500", "4500-5500"];
  sizeKeys.forEach(sizeKey => {
    pricingData[sizeKey] = {
      hdrPhotography: 0,
      matterportTour: 0,
      propertyHighlightsVideo: 0,
      slideshowVideoTour: 0,
      socialMediaReel: 0,
      droneAerialPhotos: 0,
      droneAerialVideo: 0,
      dronePhotosVideo: 0,
      floorPlan2d: 0,
      houseModel3d: 0,
      propertyWebsite: 0,
      customDomainName: 0,
      virtualDeclutter: "29/image",
      virtualStaging: "39/image",
      virtualTwilight: "49/image",
    };
  });

  // Set pricing based on new CSV data
  const servicePricing = {
    "Under 1500": {
      hdrPhotography: 169,
      matterportTour: 199,
      propertyHighlightsVideo: 289,
      slideshowVideoTour: 99,
      socialMediaReel: 229,
      droneAerialPhotos: 159,
      droneAerialVideo: 159,
      dronePhotosVideo: 199,
      floorPlan2d: 119,
      houseModel3d: 159,
      propertyWebsite: 129,
      customDomainName: 39
    },
    "1500-2500": {
      hdrPhotography: 229,
      matterportTour: 239,
      propertyHighlightsVideo: 309,
      slideshowVideoTour: 99,
      socialMediaReel: 249,
      droneAerialPhotos: 159,
      droneAerialVideo: 159,
      dronePhotosVideo: 199,
      floorPlan2d: 149,
      houseModel3d: 199,
      propertyWebsite: 129,
      customDomainName: 39
    },
    "2500-3500": {
      hdrPhotography: 289,
      matterportTour: 279,
      propertyHighlightsVideo: 329,
      slideshowVideoTour: 99,
      socialMediaReel: 269,
      droneAerialPhotos: 159,
      droneAerialVideo: 159,
      dronePhotosVideo: 199,
      floorPlan2d: 179,
      houseModel3d: 239,
      propertyWebsite: 129,
      customDomainName: 39
    },
    "3500-4500": {
      hdrPhotography: 349,
      matterportTour: 319,
      propertyHighlightsVideo: 349,
      slideshowVideoTour: 99,
      socialMediaReel: 289,
      droneAerialPhotos: 159,
      droneAerialVideo: 159,
      dronePhotosVideo: 199,
      floorPlan2d: 209,
      houseModel3d: 279,
      propertyWebsite: 129,
      customDomainName: 39
    },
    "4500-5500": {
      hdrPhotography: 409,
      matterportTour: 359,
      propertyHighlightsVideo: 369,
      slideshowVideoTour: 99,
      socialMediaReel: 309,
      droneAerialPhotos: 159,
      droneAerialVideo: 159,
      dronePhotosVideo: 199,
      floorPlan2d: 239,
      houseModel3d: 319,
      propertyWebsite: 129,
      customDomainName: 39
    }
  };

  // Apply the pricing data
  sizeKeys.forEach(sizeKey => {
    const pricing = servicePricing[sizeKey];
    pricingData[sizeKey] = {
      ...pricingData[sizeKey],
      ...pricing
    };
  });

  return pricingData;
}

// Parse packages from CSV data
function parsePackages(): PackagesData {
  const packagesData = {} as PackagesData;
  
  // Initialize packages data structure
  const sizeKeys: SizeKey[] = ["Under 1500", "1500-2500", "2500-3500", "3500-4500", "4500-5500"];
  sizeKeys.forEach(sizeKey => {
    packagesData[sizeKey] = [];
  });

  // Package data from CSV
  const packagePricing = [
    // Essentials
    { name: "Essentials", size: "Under 1500", price: 279, includes: "Professional Photography, 1-2 Drone Photos, Listing Website, Slideshow Video, Feature Sheet (PDF), Social Media Post (Square), Social Media Story (Vertical), Blue Sky Replacement" },
    { name: "Essentials", size: "1500-2500", price: 329, includes: "Professional Photography, 1-2 Drone Photos, Listing Website, Slideshow Video, Feature Sheet (PDF), Social Media Post (Square), Social Media Story (Vertical), Blue Sky Replacement" },
    { name: "Essentials", size: "2500-3500", price: 379, includes: "Professional Photography, 1-2 Drone Photos, Listing Website, Slideshow Video, Feature Sheet (PDF), Social Media Post (Square), Social Media Story (Vertical), Blue Sky Replacement" },
    { name: "Essentials", size: "3500-4500", price: 429, includes: "Professional Photography, 1-2 Drone Photos, Listing Website, Slideshow Video, Feature Sheet (PDF), Social Media Post (Square), Social Media Story (Vertical), Blue Sky Replacement" },
    { name: "Essentials", size: "4500-5500", price: 479, includes: "Professional Photography, 1-2 Drone Photos, Listing Website, Slideshow Video, Feature Sheet (PDF), Social Media Post (Square), Social Media Story (Vertical), Blue Sky Replacement" },
    
    // Essentials + 2D Floor Plans
    { name: "Essentials + 2D Floor Plans", size: "Under 1500", price: 349, includes: "Everything in Essentials + 2D Floor Plan (Color-coded + Black and white)" },
    { name: "Essentials + 2D Floor Plans", size: "1500-2500", price: 399, includes: "Everything in Essentials + 2D Floor Plan (Color-coded + Black and white)" },
    { name: "Essentials + 2D Floor Plans", size: "2500-3500", price: 449, includes: "Everything in Essentials + 2D Floor Plan (Color-coded + Black and white)" },
    { name: "Essentials + 2D Floor Plans", size: "3500-4500", price: 499, includes: "Everything in Essentials + 2D Floor Plan (Color-coded + Black and white)" },
    { name: "Essentials + 2D Floor Plans", size: "4500-5500", price: 549, includes: "Everything in Essentials + 2D Floor Plan (Color-coded + Black and white)" },
    
    // Essentials + Matterport Tour
    { name: "Essentials + Matterport Tour", size: "Under 1500", price: 399, includes: "Everything in Essentials + 360 Virtual Tour" },
    { name: "Essentials + Matterport Tour", size: "1500-2500", price: 449, includes: "Everything in Essentials + 360 Virtual Tour" },
    { name: "Essentials + Matterport Tour", size: "2500-3500", price: 499, includes: "Everything in Essentials + 360 Virtual Tour" },
    { name: "Essentials + Matterport Tour", size: "3500-4500", price: 549, includes: "Everything in Essentials + 360 Virtual Tour" },
    { name: "Essentials + Matterport Tour", size: "4500-5500", price: 599, includes: "Everything in Essentials + 360 Virtual Tour" },
    
    // Marketing Pro
    { name: "Marketing Pro", size: "Under 1500", price: 679, includes: "Everything in Essentials + Enhanced Twilight Listing Image + 360 Virtual Tour, Property Highlights Video, 2D Floor Plan (Color-coded + Blk and white, Full Aerial Coverage (Additional Drone Images + Footage) + Custom Domain Name" },
    { name: "Marketing Pro", size: "1500-2500", price: 729, includes: "Everything in Essentials + Enhanced Twilight Listing Image + 360 Virtual Tour, Property Highlights Video, 2D Floor Plan (Color-coded + Blk and white, Full Aerial Coverage (Additional Drone Images + Footage) + Custom Domain Name" },
    { name: "Marketing Pro", size: "2500-3500", price: 779, includes: "Everything in Essentials + Enhanced Twilight Listing Image + 360 Virtual Tour, Property Highlights Video, 2D Floor Plan (Color-coded + Blk and white, Full Aerial Coverage (Additional Drone Images + Footage) + Custom Domain Name" },
    { name: "Marketing Pro", size: "3500-4500", price: 829, includes: "Everything in Essentials + Enhanced Twilight Listing Image + 360 Virtual Tour, Property Highlights Video, 2D Floor Plan (Color-coded + Blk and white, Full Aerial Coverage (Additional Drone Images + Footage) + Custom Domain Name" },
    { name: "Marketing Pro", size: "4500-5500", price: 879, includes: "Everything in Essentials + Enhanced Twilight Listing Image + 360 Virtual Tour, Property Highlights Video, 2D Floor Plan (Color-coded + Blk and white, Full Aerial Coverage (Additional Drone Images + Footage) + Custom Domain Name" },
    
    // Top Agent
    { name: "Top Agent", size: "Under 1500", price: 799, includes: "Everything in Marketing Pro + Agent on video, 2 Additional Twilight Images, Social Media Reel Video, Extra social media content, 2D + 3D Floor Plan" },
    { name: "Top Agent", size: "1500-2500", price: 849, includes: "Everything in Marketing Pro + Agent on video, 2 Additional Twilight Images, Social Media Reel Video, Extra social media content, 2D + 3D Floor Plan" },
    { name: "Top Agent", size: "2500-3500", price: 899, includes: "Everything in Marketing Pro + Agent on video, 2 Additional Twilight Images, Social Media Reel Video, Extra social media content, 2D + 3D Floor Plan" },
    { name: "Top Agent", size: "3500-4500", price: 949, includes: "Everything in Marketing Pro + Agent on video, 2 Additional Twilight Images, Social Media Reel Video, Extra social media content, 2D + 3D Floor Plan" },
    { name: "Top Agent", size: "4500-5500", price: 999, includes: "Everything in Marketing Pro + Agent on video, 2 Additional Twilight Images, Social Media Reel Video, Extra social media content, 2D + 3D Floor Plan" },
  ];

  // Process each package
  packagePricing.forEach(pkg => {
    const sizeKey = pkg.size === "Under 1500" ? "Under 1500" : 
                   pkg.size === "1500-2500" ? "1500-2500" :
                   pkg.size === "2500-3500" ? "2500-3500" :
                   pkg.size === "3500-4500" ? "3500-4500" :
                   "4500-5500";

    // Parse includes to determine features
    const includedServices = pkg.includes.split(',').map(s => s.trim());
    const features: PackageFeature[] = [
      { label: 'Professional Photography', included: includedServices.some(s => s.toLowerCase().includes('photography')) },
      { label: '1-2 Drone Photos', included: includedServices.some(s => s.toLowerCase().includes('drone')) },
      { label: 'Listing Website', included: includedServices.some(s => s.toLowerCase().includes('website')) },
      { label: 'Slideshow Video', included: includedServices.some(s => s.toLowerCase().includes('slideshow')) },
      { label: 'Feature Sheet (PDF)', included: includedServices.some(s => s.toLowerCase().includes('feature sheet')) },
      { label: 'Social Media Post', included: includedServices.some(s => s.toLowerCase().includes('social media post')) },
      { label: 'Social Media Story', included: includedServices.some(s => s.toLowerCase().includes('social media story')) },
      { label: 'Blue Sky Replacement', included: includedServices.some(s => s.toLowerCase().includes('blue sky')) },
      { label: '2D Floor Plan', included: includedServices.some(s => s.toLowerCase().includes('floor plan')) },
      { label: '360 Virtual Tour', included: includedServices.some(s => s.toLowerCase().includes('virtual tour')) },
      { label: 'Property Highlights Video', included: includedServices.some(s => s.toLowerCase().includes('property highlights video')) },
      { label: 'Enhanced Twilight Image', included: includedServices.some(s => s.toLowerCase().includes('twilight')) },
      { label: 'Full Aerial Coverage', included: includedServices.some(s => s.toLowerCase().includes('aerial coverage')) },
      { label: 'Custom Domain Name', included: includedServices.some(s => s.toLowerCase().includes('custom domain')) },
      { label: 'Agent on Video', included: includedServices.some(s => s.toLowerCase().includes('agent on video')) },
      { label: 'Social Media Reel Video', included: includedServices.some(s => s.toLowerCase().includes('reel video')) },
      { label: '3D Floor Plan', included: includedServices.some(s => s.toLowerCase().includes('3d floor plan')) },
    ];

    // Determine button color based on package name
    let buttonColor = 'bg-[#262F3F] text-white';
    let borderColor = 'border-gray-200';
    
    if (pkg.name === 'Marketing Pro') {
      buttonColor = 'bg-[#B42222] text-white';
      borderColor = 'border-[#B42222]';
    } else if (pkg.name === 'Top Agent') {
      buttonColor = 'bg-[#D4AF37] text-black';
      borderColor = 'border-[#D4AF37]';
    }

    const packageCard: PackageCard = {
      name: pkg.name.toUpperCase(),
      price: formatPrice(pkg.price),
      subtitle: '',
      sqft: `${pkg.size} sq ft`,
      discount: '', // We don't have discount data in the new CSV
      discountColor: 'text-[#B42222]',
      buttonColor,
      borderColor,
      features,
      image: '',
      includes: pkg.includes
    };

    packagesData[sizeKey].push(packageCard);
  });

  return packagesData;
}

// Main function to load and parse pricing data
export function loadPricingData(): { pricingData: PricingData; packagesData: PackagesData } {
  try {
    const pricingData = parseIndividualServices();
    const packagesData = parsePackages();
    
    return { pricingData, packagesData };
  } catch (error) {
    console.error('Error loading pricing data:', error);
    
    // Return fallback data structure if parsing fails
    const fallbackPricingData = {} as PricingData;
    const fallbackPackagesData = {} as PackagesData;
    
    const sizeKeys: SizeKey[] = ["Under 1500", "1500-2500", "2500-3500", "3500-4500", "4500-5500"];
    sizeKeys.forEach(sizeKey => {
      fallbackPricingData[sizeKey] = {
        hdrPhotography: 0,
        matterportTour: 0,
        propertyHighlightsVideo: 0,
        slideshowVideoTour: 0,
        socialMediaReel: 0,
        droneAerialPhotos: 0,
        droneAerialVideo: 0,
        dronePhotosVideo: 0,
        floorPlan2d: 0,
        houseModel3d: 0,
        propertyWebsite: 0,
        customDomainName: 0,
        virtualDeclutter: "0/image",
        virtualStaging: "0/image",
        virtualTwilight: "0/image",
      };
      fallbackPackagesData[sizeKey] = [];
    });
    
    return { pricingData: fallbackPricingData, packagesData: fallbackPackagesData };
  }
} 