# Norwegian Address Search Frontend

A modern React-based frontend application that provides real-time address search functionality for Norwegian addresses. Built with **Next.js 16**, **React 19**, and **Zustand** for state management, this application delivers a smooth, responsive user experience with real-time search capabilities as users type.

## 🎯 Project Overview

This single-page application implements an intelligent address search field that connects to a Norwegian address API. The app features a custom-built autocomplete component with debounced search, loading states, error handling, and responsive design optimized for desktop browsers (Chrome, Firefox, and IE).

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Main page with search functionality
├── components/
│   ├── shared/
│   │   ├── CloseButton.tsx      # Reusable close button component
│   │   ├── LoadingSpinner.tsx   # Loading spinner component
│   │   └── autocomplete/        # Atomic autocomplete components
│   │       ├── Autocomplete.tsx # Main autocomplete orchestrator
│   │       ├── Input.tsx        # Search input component
│   │       └── DropdownList.tsx # Results dropdown component
│   └── types/
│       └── index.ts            # Component type definitions
├── hooks/
│   └── useSearch.ts       # Custom hook for search logic
├── store/
│   ├── appStore.ts        # Zustand store for state management
│   └── index.ts          # Store exports
├── types/                 # TypeScript type definitions
│   ├── address.ts        # Address interface
│   ├── api.ts           # API response types
│   ├── appStore.ts      # Store types
│   └── useSearch.ts     # Hook types
├── constants/
│   └── apis.ts          # API configuration
├── __tests__/
│   ├── components/      # Component tests
│   ├── hooks/          # Hook tests
│   ├── store/          # Store integration tests
│   └── constants/      # Shared test utilities
└── public/
    └── icons/          # SVG icons
```

## 🧠 Application Logic

The application follows a clean, modular architecture:

1. **State Management**: Zustand store manages global state, API calls, and loading states
2. **Search Logic**: Custom `useSearch` hook handles debouncing, API integration, and user interactions
3. **UI Components**: Atomic component architecture with `<Autocomplete>`, `<Input>`, and `<DropdownList>` components
4. **Type Safety**: Full TypeScript implementation ensures robust development experience
5. **Error Handling**: Comprehensive error states and user feedback via toast notifications

## 🔍 The Autocomplete Component System

### **Atomic Component Architecture:**

The autocomplete functionality is built using **atomic design principles** with three focused components:

#### **1. `<Autocomplete>` - Main Orchestrator**

- **Role**: Container component that manages component composition and interactions
- **Responsibilities**: Click-outside handling, component layout, state coordination
- **Location**: `components/shared/autocomplete/Autocomplete.tsx`

#### **2. `<Input>` - Search Input Component**

- **Role**: Handles user input and keyboard interactions
- **Responsibilities**: Text input, keyboard events (Escape), input validation
- **Location**: `components/shared/autocomplete/Input.tsx`

#### **3. `<DropdownList>` - Results Display Component**

- **Role**: Renders search results in a dropdown format
- **Responsibilities**: Item rendering, click selection, scrollable results
- **Location**: `components/shared/autocomplete/DropdownList.tsx`

### **Component Features:**

- **Real-time Search**: Updates results automatically as users type (300ms debounce)
- **Visual Feedback**: Integrated loading spinners, clear buttons, and search icons
- **Keyboard Navigation**: Supports Escape key to close dropdown
- **Click Outside**: Automatically closes dropdown when clicking elsewhere
- **Responsive Display**: Shows street name, postal code, and city for each result
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

### **Usage Example:**

```tsx
<Autocomplete
  searchTerm={searchTerm} // Current search input
  items={addresses} // Array of address results
  isLoading={isLoading} // Loading state
  showDropdown={showDropdown} // Dropdown visibility
  setShowDropdown={setShowDropdown} // Dropdown state setter
  handleInputChange={handleInputChange} // Input change handler
  handleItemSelect={handleItemSelect} // Item selection handler
  clearInputValue={clearInputValue} // Clear search handler
  renderItem={(
    address // Custom result renderer
  ) => (
    <div>
      <div className='font-medium'>{address.street}</div>
      <div className='text-xs text-gray-500'>{address.postNumber}</div>
      <div className='text-sm text-gray-600'>{address.city}</div>
    </div>
  )}
/>
```

### **Benefits of Atomic Architecture:**

- **🔄 Reusability**: Each component can be reused independently
- **🧪 Testability**: Components can be tested in isolation
- **🛠️ Maintainability**: Clear separation of concerns and responsibilities
- **📦 Bundle Optimization**: Better tree-shaking and code splitting opportunities
- **👥 Team Collaboration**: Multiple developers can work on different components simultaneously

The atomic components integrate seamlessly with the `useSearch` hook to provide debounced API calls, error handling, and state management.

## 🧪 Testing Suite

Comprehensive test coverage with **25 optimized tests** using **Vitest** and **React Testing Library**:

### **Test Categories:**

- **Store Integration Tests (6 tests)**: API integration, error handling, loading states, edge cases
- **Hook Logic Tests (6 tests)**: Search logic, debouncing, user interactions
- **Component Tests (8 tests)**: UI behavior, user interactions, accessibility
- **Snapshot Tests (5 tests)**: Visual regression prevention

### **Testing Features:**

- ✅ Real Norwegian address mock data
- ✅ API success and error scenarios
- ✅ Network timeout handling
- ✅ Debouncing functionality
- ✅ User interaction workflows
- ✅ Loading state management
- ✅ TypeScript type safety in tests

## 🚀 Scripts & Development

### **Development:**

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build production application
npm run start        # Start production server
```

### **Code Quality:**

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### **Testing:**

```bash
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:ui     # Launch Vitest UI
```

## 📦 Dependencies

### **Core Technologies:**

- **Next.js 16.0.1**: React framework with App Router
- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety and developer experience
- **Zustand 5.0.8**: Lightweight state management
- **Axios 1.13.2**: HTTP client for API requests

### **UI & Styling:**

- **Tailwind CSS 4**: Utility-first CSS framework
- **React Hot Toast 2.6.0**: Toast notifications
- **Custom SVG Icons**: Lightweight icon system

### **Development & Testing:**

- **Vitest 4.0.8**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **ESLint & Prettier**: Code quality and formatting
- **jsdom**: Browser environment simulation

## 🌐 Backend Integration

### **API Backend:**

The frontend communicates with a dedicated Node.js backend API that provides Norwegian address search functionality.

- **Repository**: [https://github.com/tornado1979/backend](https://github.com/tornado1979/backend)
- **Deployment**: [https://backend-tr57.onrender.com](https://backend-tr57.onrender.com)
- **Search Endpoint**: `GET /search/{query}`
- **Example**: [https://backend-tr57.onrender.com/search/oslo](https://backend-tr57.onrender.com/search/oslo)

### **Frontend Deployment:**

- **Repository**: [https://github.com/tornado1979/frontend](https://github.com/tornado1979/frontend)
- **Live Application**: [https://frontend-addresses.vercel.app/](https://frontend-addresses.vercel.app/)
- **Hosting**: Vercel with automatic deployments

## 🎥 Demo

See the application in action:

[📹 **View Demo Video**](https://www.loom.com/share/7cef4e83fdc04d2d91f6bcb602657daf)

_The demo video showcases the real-time address search functionality, including typing interactions, dropdown behavior, and address selection._

## ✅ Requirements Coverage

This implementation fully satisfies the technical requirements:

### **Frontend Requirements:**

- ✅ **Search Field Implementation**: Custom-built autocomplete component
- ✅ **Single-Page React App**: Next.js with React 19
- ✅ **No External Libraries**: Custom-built search component (no pre-built libraries)
- ✅ **Real-time Updates**: Debounced search updates results as user types
- ✅ **Complete Address Display**: Shows street name, postal code, and city
- ✅ **Browser Compatibility**: Optimized for Chrome, Firefox, and IE on desktop

### **Technical Excellence:**

- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Modern Architecture**: Clean separation of concerns with hooks and stores
- ✅ **Comprehensive Testing**: 23 tests covering critical functionality
- ✅ **Performance Optimized**: Debouncing, efficient re-renders, and loading states
- ✅ **Accessibility**: ARIA attributes and keyboard navigation
- ✅ **Production Ready**: Deployed with proper error handling and monitoring

## 🏃‍♂️ Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tornado1979/frontend.git
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Rename `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   **Option A - Use Deployed Backend (Recommended):**

   Edit `.env` and set the API URL to the deployed backend instance:

   ```bash
   NEXT_PUBLIC_API_URL=https://backend-tr57.onrender.com
   ```

   **Option B - Run Backend Locally:**

   If you prefer to run the backend locally:
   1. Clone the backend repository:
      ```bash
      git clone https://github.com/tornado1979/backend
      ```
   2. Follow the backend setup instructions: [Getting Started Guide](https://github.com/tornado1979/backend?tab=readme-ov-file#%EF%B8%8F-getting-started)
   3. Keep the default local API URL in `.env`:
      ```bash
      NEXT_PUBLIC_API_URL=http://localhost:8080
      ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the application

---
