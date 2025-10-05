const categories = [
  {
    id: 'c1',
    name: 'Electronics',
    subcategories: [
      {
        id: 'sc1',
        name: 'Smartphones',
        items: [
          { id: 'i1', name: 'Phone Model A', details: ['64GB Storage', '6GB RAM', 'Black', '5.8 inch Display'] },
          { id: 'i2', name: 'Phone Model B', details: ['128GB Storage', '8GB RAM', 'Silver', '6.1 inch Display'] },
          { id: 'i10', name: 'Phone Model C', details: ['256GB Storage', '12GB RAM', 'Blue', '6.5 inch OLED Display'] },
          { id: 'i24', name: 'Phone Model D', details: ['512GB Storage', '16GB RAM', 'Gold', '6.8 inch AMOLED'] },
          { id: 'i25', name: 'Phone Model E', details: ['128GB Storage', '8GB RAM', 'Green', '6.4 inch LCD'] },
        ],
      },
      {
        id: 'sc2',
        name: 'Laptops',
        items: [
          { id: 'i3', name: 'Laptop Model X', details: ['Intel i7', '16GB RAM', '512GB SSD', '15.6 inch'] },
          { id: 'i4', name: 'Laptop Model Y', details: ['AMD Ryzen 5', '8GB RAM', '256GB SSD', '14 inch'] },
          { id: 'i11', name: 'Laptop Model Z', details: ['Intel i9', '32GB RAM', '1TB SSD', '17 inch 4K Display'] },
          { id: 'i26', name: 'Laptop Model Q', details: ['Intel i5', '8GB RAM', '256GB SSD', '13.3 inch'] },
          { id: 'i27', name: 'Gaming Laptop Pro', details: ['AMD Ryzen 7', '16GB RAM', '1TB SSD', '15.6 inch RTX 3060'] },
        ],
      },
      {
        id: 'sc7',
        name: 'Wearables',
        items: [
          { id: 'i12', name: 'Smartwatch Alpha', details: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Black Strap'] },
          { id: 'i13', name: 'Fitness Band Beta', details: ['Step Counter', 'Sleep Tracking', 'Battery 7 Days', 'Blue'] },
          { id: 'i28', name: 'Wireless Earbuds', details: ['Bluetooth 5.0', 'Noise Cancelling', 'Charging Case', 'White'] },
          { id: 'i29', name: 'VR Headset X', details: ['4K Display', '90Hz Refresh', '6DOF Tracking', 'Lightweight'] },
        ],
      },
      {
        id: 'sc10',
        name: 'Cameras',
        items: [
          { id: 'i30', name: 'DSLR Camera A', details: ['24MP', '4K Video', 'WiFi', 'Interchangeable Lens'] },
          { id: 'i31', name: 'Action Camera Pro', details: ['Waterproof', '1080p', 'Image Stabilization', 'Wide Angle'] },
          { id: 'i32', name: 'Mirrorless Camera X', details: ['20MP', 'Electronic Viewfinder', 'WiFi', '4K Video'] },
        ],
      },
    ],
  },
  {
    id: 'c2',
    name: 'Clothing',
    subcategories: [
      {
        id: 'sc3',
        name: 'Men',
        items: [
          { id: 'i5', name: 'T-Shirt Classic', details: ['Cotton', 'Blue', 'Size M', 'Regular Fit'] },
          { id: 'i6', name: 'Jeans Slim Fit', details: ['Denim', 'Black', 'Size 32', 'Slim Fit'] },
          { id: 'i14', name: 'Leather Jacket', details: ['Genuine Leather', 'Black', 'Size L', 'Zipper Closure'] },
          { id: 'i33', name: 'Formal Shirt', details: ['Cotton Blend', 'White', 'Size L', 'Slim Fit'] },
          { id: 'i34', name: 'Running Shorts', details: ['Polyester', 'Gray', 'Size M', 'Lightweight'] },
        ],
      },
      {
        id: 'sc4',
        name: 'Women',
        items: [
          { id: 'i7', name: 'Summer Dress', details: ['Polyester', 'Red', 'Size S', 'Floral Pattern'] },
          { id: 'i15', name: 'Cardigan Sweater', details: ['Wool Blend', 'Gray', 'Size M', 'Button Up'] },
          { id: 'i16', name: 'Yoga Pants', details: ['Spandex', 'Black', 'Size L', 'High Waist'] },
          { id: 'i35', name: 'Blouse', details: ['Silk', 'Beige', 'Size S', 'Long Sleeve'] },
          { id: 'i36', name: 'Denim Jacket', details: ['Denim', 'Blue', 'Size M', 'Button Closure'] },
        ],
      },
      {
        id: 'sc8',
        name: 'Kids',
        items: [
          { id: 'i17', name: 'Kids Hoodie', details: ['Cotton', 'Yellow', 'Size XS', 'Fleece Lined'] },
          { id: 'i18', name: 'Sneakers', details: ['Rubber Sole', 'White', 'Size 10', 'Velcro Straps'] },
          { id: 'i37', name: 'Kids Trousers', details: ['Cotton', 'Blue', 'Size S', 'Elastic Waist'] },
          { id: 'i38', name: 'Kids Raincoat', details: ['Waterproof', 'Red', 'Size M', 'Hooded'] },
        ],
      },
      {
        id: 'sc11',
        name: 'Accessories',
        items: [
          { id: 'i39', name: 'Men\'s Watch', details: ['Analog', 'Leather Strap', 'Black Dial', 'Water Resistant'] },
          { id: 'i40', name: 'Women\'s Scarf', details: ['Silk', 'Multicolor', 'One Size', 'Lightweight'] },
          { id: 'i41', name: 'Baseball Cap', details: ['Cotton', 'Red', 'Adjustable Size', 'Embroidered Logo'] },
        ],
      },
    ],
  },
  {
    id: 'c3',
    name: 'Home Appliances',
    subcategories: [
      {
        id: 'sc5',
        name: 'Kitchen',
        items: [
          { id: 'i8', name: 'Blender 3000', details: ['500W', '2L Capacity', 'Stainless Steel', '3 Speeds'] },
          { id: 'i19', name: 'Microwave Oven', details: ['1000W', '20L Capacity', 'Digital Display', 'Black'] },
          { id: 'i20', name: 'Air Fryer XL', details: ['1500W', '5L Capacity', 'Non-stick Basket', 'Touch Control'] },
          { id: 'i42', name: 'Coffee Maker', details: ['12 Cups', 'Programmable', 'Stainless Steel', 'Auto Shut-off'] },
          { id: 'i43', name: 'Electric Kettle', details: ['1.7L', 'Auto Shut-off', 'Cordless', 'Stainless Steel'] },
        ],
      },
      {
        id: 'sc6',
        name: 'Cleaning',
        items: [
          { id: 'i9', name: 'Vacuum Cleaner Pro', details: ['1200W', 'Bagless', 'HEPA Filter', 'Cordless'] },
          { id: 'i21', name: 'Robot Vacuum', details: ['Smart Mapping', 'Recharge & Resume', 'WiFi Control', 'White'] },
          { id: 'i44', name: 'Steam Mop', details: ['1500W', 'Lightweight', 'Detachable Water Tank', 'Blue'] },
        ],
      },
      {
        id: 'sc9',
        name: 'Heating & Cooling',
        items: [
          { id: 'i22', name: 'Portable Air Conditioner', details: ['12000 BTU', 'Remote Control', 'Energy Star', 'White'] },
          { id: 'i23', name: 'Electric Heater', details: ['1500W', 'Thermostat', 'Overheat Protection', 'Black'] },
          { id: 'i45', name: 'Ceiling Fan', details: ['52 inch', '3 Speeds', 'Remote Control', 'Brown'] },
          { id: 'i46', name: 'Humidifier', details: ['2L Tank', 'Quiet Operation', 'Auto Shut-off', 'White'] },
        ],
      },
    ],
  },
  {
    id: 'c4',
    name: 'Sports & Outdoors',
    subcategories: [
      {
        id: 'sc12',
        name: 'Fitness Equipment',
        items: [
          { id: 'i47', name: 'Treadmill', details: ['Max Speed 12 mph', 'Incline', 'LCD Display', 'Foldable'] },
          { id: 'i48', name: 'Dumbbell Set', details: ['Adjustable', '5-50 lbs', 'Rubber Coated', 'Ergonomic Grip'] },
          { id: 'i49', name: 'Yoga Mat', details: ['Non-slip', '6mm Thickness', 'Lightweight', 'Blue'] },
        ],
      },
      {
        id: 'sc13',
        name: 'Outdoor Gear',
        items: [
          { id: 'i50', name: 'Camping Tent', details: ['4 Person', 'Waterproof', 'Lightweight', 'Easy Setup'] },
          { id: 'i51', name: 'Hiking Backpack', details: ['50L Capacity', 'Multiple Pockets', 'Water Resistant', 'Adjustable Straps'] },
          { id: 'i52', name: 'Sleeping Bag', details: ['Temperature Rating 20°F', 'Lightweight', 'Compact', 'Navy Blue'] },
        ],
      },
    ],
  },
  {
    id: 'c5',
    name: 'Books',
    subcategories: [
      {
        id: 'sc14',
        name: 'Fiction',
        items: [
          { id: 'i53', name: 'Mystery Novel', details: ['Paperback', '300 pages', 'Author: John Doe', 'Published 2023'] },
          { id: 'i54', name: 'Sci-Fi Epic', details: ['Hardcover', '450 pages', 'Author: Jane Smith', 'Published 2024'] },
          { id: 'i55', name: 'Romantic Comedy', details: ['Ebook', '250 pages', 'Author: Emily Rose', 'Published 2022'] },
        ],
      },
      {
        id: 'sc15',
        name: 'Non-Fiction',
        items: [
          { id: 'i56', name: 'History of Art', details: ['Hardcover', '500 pages', 'Author: Mark Twain', 'Published 2020'] },
          { id: 'i57', name: 'Science Explained', details: ['Paperback', '350 pages', 'Author: Albert Newton', 'Published 2021'] },
          { id: 'i58', name: 'Self Help Guide', details: ['Ebook', '200 pages', 'Author: Mary Lou', 'Published 2023'] },
        ],
      },
    ],
  },
  {
    id: 'c6',
    name: 'Beauty & Personal Care',
    subcategories: [
      {
        id: 'sc16',
        name: 'Makeup',
        items: [
          { id: 'i59', name: 'Lipstick Set', details: ['12 Shades', 'Matte Finish', 'Long-lasting', 'Cruelty Free'] },
          { id: 'i60', name: 'Foundation', details: ['Liquid', 'SPF 15', '24 Hour Wear', 'Shade: Medium'] },
        ],
      },
      {
        id: 'sc17',
        name: 'Skincare',
        items: [
          { id: 'i61', name: 'Moisturizer', details: ['For Dry Skin', 'SPF 20', 'Non-greasy', 'Dermatologist Tested'] },
          { id: 'i62', name: 'Sunscreen', details: ['SPF 50', 'Water Resistant', 'Broad Spectrum', 'For All Skin Types'] },
        ],
      },
      {
        id: 'sc18',
        name: 'Haircare',
        items: [
          { id: 'i63', name: 'Shampoo', details: ['For Color-treated Hair', 'Sulfate Free', '500ml'] },
          { id: 'i64', name: 'Hair Dryer', details: ['1800W', 'Ionic Technology', '3 Heat Settings', 'Lightweight'] },
        ],
      },
    ],
  },
];


export default categories;
