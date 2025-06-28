# ~[Taipei-Day-Trip](https://taipei-day-trip-react-h281.vercel.app/)~

*"Taipei-Day-Trip" is a e-commerce tourism website that offers unique Taipei attractions, allowing customers to search for their preferences and book a one-day travel itinerary in Taipei."*

## 🛒 E-Commerce Frontend

This is the **React-based frontend** for an e-commerce platform, designed with modern UI/UX practices and powered by backend microservices built with .NET and MySQL.

## 🔧 Core Technologies & Frontend Features

- **Framework**: React
- **Deployment**: Vercel
- **UI Features**:
  - Infinite Scroll: Products load seamlessly as you scroll down, providing a continuous Browse experience.
  - Image Carousel: An interactive display for showcasing rich images of selected attractions.
  - Full-Text Search: Allows you to quickly and accurately find attractions based on keywords.
  - Third-Party Payment System: [TapPay](https://www.tappaysdk.com/taiwan-zhtw)
- **Authentication**:
  - Utilizes JWT (JSON Web Tokens) for handling user login and information security.
  - User Tokens are stored in browser cookies. All authenticated frontend requests automatically carry this token, which the backend is responsible for decoding and validating to ensure data security and accuracy.

## 🌐 Backend API Service Integration

- `/api/auth`: Handles user login, registration, and fetching member profiles.
- `/api/attraction`: Manages attraction listings, booking services, and payment processing.

## 📦 Demo

Here is website link => ~<https://taipei-day-trip-react-h281.vercel.app/>~

Test account:
- User : `test1@test.com`
- Password : `Test:123`

Test payment information:
- Credit Card : `4242-4242-4242-4242`
- Date : `12/34`
- CVV : `123`

## Features

- Infinite Scroll

- Rwd

- Full-Text Search

- Image Carousel

- Booking

- Third-Party Payment System

## Version Control
- Git / GitHub

## Contact
- Author: `Chen, Chun-Yi`
- Email: `chun.yii.chen@gmail.com`