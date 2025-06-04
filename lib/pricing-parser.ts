import fs from 'fs';
import path from 'path';

// Types for parsed data
export type SizeKey = "<1000" | "1000-2000" | "2000-3000" | "3000-4000" | "4000-5000";

export type PricingData = Record<SizeKey, {
  hdrPhotography: number;
  virtualTour: number;
  propertyHighlightsVideo: number;
  slideshowVideoTour: number;
  socialMediaReel: number;
  droneAerialPhotos: number;
  droneAerialVideo: number;
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
};

export type PackagesData = Record<SizeKey, PackageCard[]>;

// Parse HTML table to extract pricing data
function parseALaCarteServices(htmlContent: string): PricingData {
  const pricingData = {} as PricingData;
  
  // Size mappings from HTML to our keys
  const sizeMapping: Record<string, SizeKey> = {
    "0–999 sq ft": "<1000",
    "1000–1999 sq ft": "1000-2000", 
    "2000–2999 sq ft": "2000-3000",
    "3000–3999 sq ft": "3000-4000",
    "4000–4999 sq ft": "4000-5000"
  };

  // Service name mappings
  const serviceMapping: Record<string, keyof PricingData[SizeKey]> = {
    "HDR Photography": "hdrPhotography",
    "360° Virtual Tour": "virtualTour",
    "Property Highlights Video": "propertyHighlightsVideo",
    "Slideshow Video Tour": "slideshowVideoTour",
    "Social Media Reel": "socialMediaReel",
    "Drone Aerial Photos": "droneAerialPhotos",
    "Drone Aerial Video": "droneAerialVideo",
    "2D Floor Plan": "floorPlan2d",
    "3D House Model": "houseModel3d",
    "Property Website": "propertyWebsite",
    "Custom Domain Name": "customDomainName",
    "Virtual Declutter": "virtualDeclutter",
    "Virtual Staging": "virtualStaging",
    "Virtual Twilight": "virtualTwilight"
  };

  // Initialize pricing data structure
  Object.values(sizeMapping).forEach(sizeKey => {
    pricingData[sizeKey] = {} as PricingData[SizeKey];
  });

  // Find the A La Carte table
  const aLaCarteMatch = htmlContent.match(/<h2>A La Carte Services<\/h2><table[^>]*>([\s\S]*?)<\/table>/);
  if (!aLaCarteMatch) return pricingData;

  const tableContent = aLaCarteMatch[1];
  
  // Parse table rows
  const rowMatches = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/g);
  if (!rowMatches) return pricingData;

  // Get header row to understand column order
  const headerRow = rowMatches[0];
  const headerCells = headerRow.match(/<th[^>]*>(.*?)<\/th>/g);
  if (!headerCells) return pricingData;
  
  const sizeColumns: SizeKey[] = [];
  headerCells.slice(1).forEach(cell => {
    const cellText = cell.replace(/<[^>]*>/g, '').trim();
    if (sizeMapping[cellText]) {
      sizeColumns.push(sizeMapping[cellText]);
    }
  });

  // Parse data rows
  rowMatches.slice(1).forEach(row => {
    const cells = row.match(/<td[^>]*>(.*?)<\/td>/g);
    if (!cells || cells.length < 2) return;

    const serviceName = cells[0].replace(/<[^>]*>/g, '').trim();
    const serviceKey = serviceMapping[serviceName];
    if (!serviceKey) return;

    cells.slice(1).forEach((cell, index) => {
      if (index >= sizeColumns.length) return;
      
      const sizeKey = sizeColumns[index];
      const cellValue = cell.replace(/<[^>]*>/g, '').trim();
      
      if (cellValue.includes('/image')) {
        (pricingData[sizeKey] as any)[serviceKey] = cellValue;
      } else {
        const numericValue = parseFloat(cellValue);
        if (!isNaN(numericValue)) {
          (pricingData[sizeKey] as any)[serviceKey] = numericValue;
        }
      }
    });
  });

  return pricingData;
}

// Parse packages table to extract package data
function parsePackages(htmlContent: string): PackagesData {
  const packagesData = {} as PackagesData;
  
  // Initialize packages data structure
  const sizeKeys: SizeKey[] = ["<1000", "1000-2000", "2000-3000", "3000-4000", "4000-5000"];
  sizeKeys.forEach(sizeKey => {
    packagesData[sizeKey] = [];
  });

  // Size mappings from HTML to our keys
  const sizeMapping: Record<string, SizeKey> = {
    "0–999 sq ft": "<1000",
    "1000–1999 sq ft": "1000-2000", 
    "2000–2999 sq ft": "2000-3000",
    "3000–3999 sq ft": "3000-4000",
    "4000–4999 sq ft": "4000-5000"
  };

  // Find the packages table
  const packagesMatch = htmlContent.match(/<h2>Packages<\/h2><table[^>]*>([\s\S]*?)<\/table>/);
  if (!packagesMatch) return packagesData;

  const tableContent = packagesMatch[1];
  
  // Parse table rows
  const rowMatches = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/g);
  if (!rowMatches) return packagesData;

  // Parse data rows (skip header)
  rowMatches.slice(1).forEach(row => {
    const cells = row.match(/<td[^>]*>(.*?)<\/td>/g);
    if (!cells || cells.length < 6) return;

    const packageName = cells[0].replace(/<[^>]*>/g, '').trim();
    const propertySize = cells[1].replace(/<[^>]*>/g, '').trim();
    const price = parseFloat(cells[2].replace(/<[^>]*>/g, '').trim());
    const aLaCarteValue = parseFloat(cells[3].replace(/<[^>]*>/g, '').trim());
    const discount = parseFloat(cells[4].replace(/<[^>]*>/g, '').trim());
    const includes = cells[5].replace(/<[^>]*>/g, '').trim();

    const sizeKey = sizeMapping[propertySize];
    if (!sizeKey) return;

    // Determine package type and styling based on name
    let buttonColor = 'bg-[#262F3F] text-white';

    // Parse includes to determine features
    const includedServices = includes.split(',').map(s => s.trim());
    const features: PackageFeature[] = [
      { label: 'HDR Photography', included: includedServices.some(s => s.toLowerCase().includes('hdr')) },
      { label: includedServices.some(s => s.includes('3–5')) ? '3–5 Drone Shots' : includedServices.some(s => s.includes('2–3')) ? '2–3 Drone Shots' : '1–2 Drone Shots', included: includedServices.some(s => s.toLowerCase().includes('drone')) },
      { label: 'Property Website', included: true },
      { label: 'Slideshow Video Tour', included: true },
      { label: 'Custom Domain Name', included: includedServices.some(s => s.toLowerCase().includes('custom domain')) },
      { label: '360° Virtual Tour', included: includedServices.some(s => s.toLowerCase().includes('virtual tour')) },
      { label: '2D Floor Plan', included: includedServices.some(s => s.toLowerCase().includes('floor plan')) },
      { label: 'Custom Video (Built with Your Preferences)', included: includedServices.some(s => s.toLowerCase().includes('video') && !s.toLowerCase().includes('slideshow')) },
      { label: 'Virtual Twilight', included: includedServices.some(s => s.toLowerCase().includes('twilight')) },
      { label: '3D House Model', included: includedServices.some(s => s.toLowerCase().includes('3d')) },
      { label: 'Virtual Staging', included: includedServices.some(s => s.toLowerCase().includes('staging')) },
    ];

    const packageCard: PackageCard = {
      name: packageName.toUpperCase(),
      price: `$${price.toFixed(2)}`,
      subtitle: '',
      sqft: propertySize,
      discount: `Save $${discount}`,
      discountColor: 'text-[#B42222]',
      buttonColor,
      features,
      image: '',
    };

    packagesData[sizeKey].push(packageCard);
  });

  return packagesData;
}

// Main function to load and parse pricing data
export function loadPricingData(): { pricingData: PricingData; packagesData: PackagesData } {
  try {
    const htmlFilePath = path.join(process.cwd(), 'rephotos-pricing-and-packages.html');
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    
    const pricingData = parseALaCarteServices(htmlContent);
    const packagesData = parsePackages(htmlContent);
    
    return { pricingData, packagesData };
  } catch (error) {
    console.error('Error loading pricing data:', error);
    
    // Return fallback data structure if parsing fails
    const fallbackPricingData = {} as PricingData;
    const fallbackPackagesData = {} as PackagesData;
    
    const sizeKeys: SizeKey[] = ["<1000", "1000-2000", "2000-3000", "3000-4000", "4000-5000"];
    sizeKeys.forEach(sizeKey => {
      fallbackPricingData[sizeKey] = {
        hdrPhotography: 0,
        virtualTour: 0,
        propertyHighlightsVideo: 0,
        slideshowVideoTour: 0,
        socialMediaReel: 0,
        droneAerialPhotos: 0,
        droneAerialVideo: 0,
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