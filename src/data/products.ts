import { Product } from '@/store/cartStore';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1199,
    originalPrice: 1299,
    image: '/api/placeholder/300/300',
    category: 'Smartphones',
    rating: 4.8,
    description: 'The most advanced iPhone ever with titanium design and powerful A17 Pro chip.',
    features: ['A17 Pro Chip', '48MP Camera System', '5G Connectivity', 'Titanium Build'],
    inStock: true,
    variations: [
      { name: 'Storage', options: ['128GB', '256GB', '512GB', '1TB'] },
      { name: 'Color', options: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'] }
    ],
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300']
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    price: 1099,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    category: 'Laptops',
    rating: 4.9,
    description: 'Supercharged by the M3 chip, the MacBook Air is incredibly fast and efficient.',
    features: ['M3 Chip', '13.6" Liquid Retina Display', '18-hour Battery', 'MagSafe Charging'],
    inStock: true,
    variations: [
      { name: 'Memory', options: ['8GB', '16GB', '24GB'] },
      { name: 'Storage', options: ['256GB', '512GB', '1TB', '2TB'] },
      { name: 'Color', options: ['Space Gray', 'Silver', 'Starlight', 'Midnight'] }
    ]
  },
  {
    id: '3',
    name: 'Apple Watch Series 9',
    price: 399,
    image: '/api/placeholder/300/300',
    category: 'Wearables',
    rating: 4.7,
    description: 'The most advanced Apple Watch yet with new health features.',
    features: ['S9 Chip', 'Always-On Display', 'Blood Oxygen Monitoring', 'ECG Capability'],
    inStock: true,
    variations: [
      { name: 'Size', options: ['41mm', '45mm'] },
      { name: 'Color', options: ['Pink', 'Starlight', 'Silver', 'Product Red', 'Midnight'] }
    ]
  },
  {
    id: '4',
    name: 'HP LaserJet Pro M404n',
    price: 199,
    originalPrice: 249,
    image: '/api/placeholder/300/300',
    category: 'Printers',
    rating: 4.5,
    description: 'Fast, reliable laser printer perfect for office environments.',
    features: ['38 ppm Print Speed', 'Automatic Duplex', 'Mobile Printing', 'Energy Efficient'],
    inStock: true
  },
  {
    id: '5',
    name: 'Samsung 27" 4K Monitor',
    price: 329,
    image: '/api/placeholder/300/300',
    category: 'Monitors',
    rating: 4.6,
    description: 'Crystal clear 4K resolution with vibrant colors and sharp details.',
    features: ['4K UHD Resolution', 'HDR10 Support', 'USB-C Hub', 'Eye Saver Mode'],
    inStock: true,
    variations: [
      { name: 'Size', options: ['24"', '27"', '32"'] }
    ]
  },
  {
    id: '6',
    name: 'Canon EOS R5',
    price: 3899,
    image: '/api/placeholder/300/300',
    category: 'Cameras',
    rating: 4.9,
    description: 'Professional mirrorless camera with 45MP sensor and 8K video.',
    features: ['45MP Full-Frame Sensor', '8K Video Recording', 'In-Body Stabilization', 'Dual Pixel CMOS AF'],
    inStock: false
  },
  {
    id: '7',
    name: 'Microsoft Surface Pro 9',
    price: 999,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    category: 'Tablets',
    rating: 4.4,
    description: '2-in-1 laptop and tablet with Intel 12th Gen processors.',
    features: ['Intel 12th Gen i5', '13" PixelSense Display', 'All-day Battery', 'Windows 11'],
    inStock: true,
    variations: [
      { name: 'Processor', options: ['Intel i5', 'Intel i7'] },
      { name: 'RAM', options: ['8GB', '16GB', '32GB'] },
      { name: 'Storage', options: ['128GB', '256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    price: 899,
    image: '/api/placeholder/300/300',
    category: 'Laptops',
    rating: 4.6,
    description: 'Ultra-portable laptop with stunning InfinityEdge display.',
    features: ['13.4" InfinityEdge Display', 'Intel 13th Gen i7', '16GB RAM', '512GB SSD'],
    inStock: true
  }
];

export const categories = [
  'All Products',
  'Smartphones',
  'Laptops',
  'Tablets',
  'Wearables',
  'Cameras',
  'Printers',
  'Monitors',
  'Accessories'
];

export const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $500', min: 100, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: 'Over $2000', min: 2000, max: Infinity }
];

export const brands = [
  'Apple',
  'Samsung',
  'Microsoft',
  'Dell',
  'HP',
  'Canon',
  'Sony',
  'Lenovo',
  'ASUS'
];