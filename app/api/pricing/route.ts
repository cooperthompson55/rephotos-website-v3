import fs from 'fs'
import path from 'path'

// Service name mapping from HTML table to service IDs
const serviceNameMapping: Record<string, string> = {
  'HDR Photography': 'hdrPhotography',
  '360° Virtual Tour': 'virtualTour',
  'Property Highlights Video': 'propertyHighlightsVideo',
  'Social Media Reel': 'socialMediaReel',
  'Drone Aerial Photos': 'droneAerialPhotos',
  'Drone Aerial Video': 'droneAerialVideo',
  '2D Floor Plan': 'floorPlan2d',
  '3D House Model': 'houseModel3d',
  'Property Website': 'propertyWebsite',
  'Custom Domain Name': 'customDomainName',
  'Virtual Declutter': 'virtualDeclutter',
  'Virtual Staging': 'virtualStaging',
  'Virtual Twilight': 'virtualTwilight',
  'Slideshow Video Tour': 'slideshowVideoTour',
}

// Size range mapping from HTML table headers to size keys
const sizeRangeMapping: Record<string, string> = {
  '0–999 sq ft': '<1000',
  '1000–1999 sq ft': '1000-2000',
  '2000–2999 sq ft': '2000-3000',
  '3000–3999 sq ft': '3000-4000',
  '4000–4999 sq ft': '4000-5000',
}

function parsePricingDataFromHTML() {
  try {
    // Read the HTML file
    const htmlPath = path.join(process.cwd(), 'rephotos-pricing-and-packages.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    
    // Extract the table content using regex
    const tableMatch = htmlContent.match(/<table[^>]*>[\s\S]*?<\/table>/)
    if (!tableMatch) {
      throw new Error('Could not find pricing table in HTML file')
    }
    
    const tableHTML = tableMatch[0]
    
    // Extract table rows
    const rowMatches = tableHTML.match(/<tr[^>]*>[\s\S]*?<\/tr>/g)
    if (!rowMatches || rowMatches.length < 2) {
      throw new Error('Could not parse table rows')
    }
    
    // Parse header row to get size columns
    const headerRow = rowMatches[0]
    const headerCells = headerRow.match(/<th[^>]*>([\s\S]*?)<\/th>/g)
    if (!headerCells || headerCells.length < 6) {
      throw new Error('Invalid header row format')
    }
    
    // Extract size ranges from headers (skip first column which is "Service")
    const sizeColumns = headerCells.slice(1).map(cell => {
      const cellContent = cell.replace(/<\/?th[^>]*>/g, '').trim()
      return sizeRangeMapping[cellContent] || cellContent
    })
    
    // Initialize pricing data structure
    const pricingData: Record<string, Record<string, number | string>> = {}
    sizeColumns.forEach(size => {
      pricingData[size] = {}
    })
    
    // Parse data rows
    for (let i = 1; i < rowMatches.length; i++) {
      const row = rowMatches[i]
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g)
      if (!cells || cells.length !== sizeColumns.length + 1) {
        continue // Skip invalid rows
      }
      
      // Extract service name from first cell
      const serviceName = cells[0].replace(/<\/?td[^>]*>/g, '').trim()
      const serviceId = serviceNameMapping[serviceName]
      
      if (!serviceId) {
        continue // Skip unknown services
      }
      
      // Extract prices for each size
      for (let j = 1; j < cells.length; j++) {
        const priceText = cells[j].replace(/<\/?td[^>]*>/g, '').trim()
        const sizeKey = sizeColumns[j - 1]
        
        if (sizeKey && pricingData[sizeKey]) {
          // Parse price - handle both numeric and "/image" format
          if (priceText.includes('/image')) {
            pricingData[sizeKey][serviceId] = priceText
          } else {
            const numericPrice = parseFloat(priceText)
            if (!isNaN(numericPrice)) {
              pricingData[sizeKey][serviceId] = numericPrice
            }
          }
        }
      }
    }
    
    return pricingData
  } catch (error) {
    console.error('Error parsing pricing data from HTML:', error)
    // Return fallback data if parsing fails
    return {
      '<1000': {},
      '1000-2000': {},
      '2000-3000': {},
      '3000-4000': {},
      '4000-5000': {},
    }
  }
}

export async function GET() {
  try {
    const pricingData = parsePricingDataFromHTML()
    return Response.json(pricingData)
  } catch (error) {
    console.error('Error fetching pricing data:', error)
    return Response.json({ error: 'Failed to fetch pricing data' }, { status: 500 })
  }
} 