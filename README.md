# Real-Time Shipment Tracking System

**Students:** [Your Name] - [Your ID]  
**Course:** Distributed Systems  
**Assignment:** Exercise #5 - Real-Time Shipment Tracking

## Project Description

This is a distributed shipment tracking system that manages deliveries between businesses and customers across Israel. The system supports real-time tracking of millions of users simultaneously, providing a smooth and reliable user experience with high resilience, scalability, and data security. Built using a client-server architecture with REST API.

The system focuses on supply networks (businesses that initiate shipments) and end customers, allowing businesses to create shipments for end customers and track their delivery status in real-time.

## Features

### Backend (Node.js + Express + MongoDB)
- **Company Management**: Create and manage shipping companies
- **Customer Management**: Create and manage end customers with address validation
- **Package Tracking**: Create packages, track delivery status, and manage delivery routes
- **Location Services**: Integration with LocationIQ API for address geocoding
- **Real-time Updates**: Track package locations and delivery status
- **RESTful API**: Complete REST API following best practices

### Frontend (jQuery + AJAX)
- **Company Dashboard**: View all companies with package management
- **Package Management**: Create, view, and track packages for each company
- **Customer Management**: Add and manage customers with form validation
- **Interactive Maps**: View package delivery routes using Geoapify maps
- **Location Search**: Search and add locations to package routes
- **Responsive Design**: Modern, user-friendly interface

## Technical Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, jQuery, AJAX
- **Validation**: Yup, jQuery Validate
- **Maps**: Geoapify Static Maps API
- **Geocoding**: LocationIQ API
- **Database**: MongoDB with Mongoose ODM

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- LocationIQ API key (for geocoding services)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Tracking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/shipment_tracking
   LOCATIONIQ_API_KEY=your_locationiq_api_key_here
   PORT=3001
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - API Base URL: http://localhost:3001

## API Endpoints

### Companies
- `POST /buisness` - Create a new company
- `GET /buisness` - Get all companies

### Customers
- `POST /customers` - Create a new customer
- `GET /customers` - Get all customers

### Packages
- `POST /packages` - Create a new package
- `GET /packages/:companyId` - Get packages by company
- `PUT /packages/:packageId/path` - Add location to package route
- `GET /packages/search/location` - Search location using LocationIQ

## Database Schema

### Company Collection
```javascript
{
  name: String (required),
  site_url: String (required, URL validation),
  createdAt: Date,
  updatedAt: Date
}
```

### Customer Collection
```javascript
{
  name: String (required),
  email: String (required, email validation),
  address: {
    street: String (required),
    number: Number (required),
    city: String (required),
    lon: Number (optional),
    lat: Number (optional)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Package Collection
```javascript
{
  prod_id: String (required),
  name: String (required),
  start_date: Number (required, timestamp),
  eta: Number (required, timestamp),
  status: String (enum: ['packed', 'shipped', 'intransit', 'delivered']),
  path: [{
    lat: Number (required),
    lon: Number (required)
  }],
  buisness_id: ObjectId (ref: 'Company'),
  customer_id: ObjectId (ref: 'Customer'),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Creating a Company
```javascript
POST /buisness
{
  "name": "Amazon Israel",
  "site_url": "https://amazon.co.il"
}
```

### Creating a Customer
```javascript
POST /customers
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "Herzl",
    "number": 123,
    "city": "Tel Aviv"
  }
}
```

### Creating a Package
```javascript
POST /packages
{
  "prod_id": "PROD123",
  "name": "Laptop",
  "start_date": 1640995200,
  "eta": 1641081600,
  "status": "packed",
  "buisness_id": "company_id_here",
  "customer_id": "customer_id_here"
}
```

### Adding Location to Package Route
```javascript
PUT /packages/package_id_here/path
{
  "lat": 32.0853,
  "lon": 34.7818
}
```

## Testing

The project includes a Postman collection (`ex525_b.postman_collection.json`) with pre-configured tests for all API endpoints. Import this collection into Postman to test the API functionality.

## Features Implemented

✅ **Required Features:**
- Company creation and management
- Customer creation and management  
- Package creation with business and customer linking
- Location addition to package routes
- Package listing by company
- Company listing
- Customer listing
- Frontend with jQuery and AJAX
- Form validation (client and server-side)
- RESTful API design
- MongoDB integration with Mongoose
- Input validation and error handling

✅ **Bonus Features:**
- Advanced customer selection with dropdown
- Interactive maps for route visualization
- Location search using LocationIQ API
- Modern, responsive UI design
- Real-time package status tracking
- Comprehensive error handling

## Security & Validation

- Input validation using Yup schemas
- Client-side validation with jQuery Validate
- MongoDB injection protection via Mongoose
- CORS configuration for cross-origin requests
- Error handling and user feedback

## Performance Considerations

- Database indexing on frequently queried fields
- Efficient queries with population for related data
- Optimized frontend with minimal DOM manipulation
- Caching strategies for location data

## Future Enhancements

- Real-time updates using WebSockets
- Mobile application support
- Advanced analytics and reporting
- Multi-language support
- Push notifications for delivery updates
- Integration with external shipping APIs

## License

This project is created for educational purposes as part of the Distributed Systems course. 