# ⭐ The Rising Star

### A Creative Studio Booking & Management Platform

The Rising Star is a modern, full-stack creative studio marketplace designed for photographers, filmmakers, podcasters, musicians, and other creative professionals.

The platform connects studio owners with creators, allowing users to discover creative spaces, explore studio facilities, check availability, and book their preferred workspaces through an easy-to-use interface.

🌐 **Live Website:** [Add Your Live Website URL Here]

---

## ✨ Key Features

- **User Authentication:** Secure email/password authentication and Google social login using Better Auth.
- **Studio Management:** Studio owners can add, update, and delete their studio listings.
- **Explore Studios:** Discover creative workspaces with dynamic studio listings and category-based browsing.
- **Studio Details:** View complete studio information, amenities, host details, images, and booking options.
- **Booking Management:** Book studio spaces and manage reservations through a personalized booking dashboard.
- **Double Booking Prevention:** Prevent conflicting reservations by checking existing confirmed bookings.
- **Secure Authorization:** Protect private routes and server-side operations using JWT and HTTPOnly cookies.
- **Image Upload:** Upload and manage studio images using ImgBB.
- **Wishlist:** Save favorite studios for future reference.
- **PDF Booking Invoice:** Generate downloadable booking receipts.
- **Theme Customization:** Switch between light and dark themes.
- **Responsive Design:** Optimized user experience across mobile, tablet, and desktop devices.
- **Modern Notifications:** Interactive toast notifications and custom confirmation dialogs.
- **Loading Experience:** Branded loading states, skeletons, and user-friendly empty states.

---

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- DaisyUI / HeroUI
- React Icons / Iconify
- Sonner
- Swiper.js

### Authentication & Security
- Better Auth
- JWT
- HTTPOnly Cookies
- Google OAuth

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- JSON Web Token (JWT)

### Tools & Services
- Git & GitHub
- Vercel
- ImgBB
- MongoDB Atlas
- VS Code

---

## 📂 Project Structure

```text
the-rising-star/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   ├── .env.local
│   ├── package.json
│   └── README.md
│
└── server/
    ├── index.js
    ├── routes/
    ├── middleware/
    ├── .env
    └── package.json
```

*Note: Adjust the structure according to your actual project folders.*

---

## ⚙️ Local Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (LTS)
- npm
- Git
- MongoDB Atlas account or local MongoDB installation

### 1. Clone the Repository

```bash
git clone YOUR_CLIENT_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the client root directory.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

Create a `.env` file in the server root directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
IMAGE_BB_API=your_imgbb_api_key
CLIENT_URL=http://localhost:3000
```

Configure the actual environment variable names according to your application.

**Important:** Never commit `.env` or `.env.local` files to GitHub.

### 4. Start the Backend Server

Navigate to the server directory:

```bash
cd server
npm install
npm run dev
```

The backend server will run at:


https://the-rising-star-server.vercel.app/


### 5. Start the Frontend Application

Open another terminal and navigate to the client directory:

```bash
cd client
npm install
npm run dev
```

The frontend application will run at:


https://my-the-rising-star.vercel.app/


---

## 🔐 Examiner Test Credentials

The following credentials can be used to test the application.

**Test Account**

- Email: `nadimul5@gmail.com`
- Password: `Nadimul1234`

*Google Login is also available.*

---

## 📌 Main Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Homepage | Public |
| `/studios` | Explore Studios | Public |
| `/studios/[id]` | Studio Details | Public |
| `/login` | User Login | Public |
| `/sign-up` | User Registration | Public |
| `/add-studio` | Add New Studio | Private |
| `/my-listings` | Manage Studio Listings | Private |
| `/studios/edit/[id]` | Update Studio | Private |
| `/my-bookings` | Manage Bookings | Private |

---

## 🔒 Security & Booking Features

- Protected server-side API endpoints.
- JWT-based authentication with HTTPOnly cookies.
- Server-side authorization and ownership verification.
- Booking conflict detection to prevent double bookings.
- Secure studio listing management.
- User-specific booking and wishlist management.

---

## 🎨 UI & User Experience

- Modern and responsive user interface.
- Consistent typography and reusable components.
- Light and dark theme customization.
- Interactive studio cards and category browsing.
- Custom 404 Not Found page.
- Branded loading states and skeleton loaders.
- Modern toast notifications and confirmation modals.
- User-friendly empty states.

---

## 👨‍💻 Developer

**Nadimul Islam**

- GitHub: [Add Your GitHub Profile]
- LinkedIn: [Add Your LinkedIn Profile]
- Portfolio: [Add Your Portfolio URL]

---

## 📄 License

This project was developed for educational purposes as a full-stack web development assignment.

---

### ⭐ Thank You for Visiting The Rising Star!

Discover creative spaces. Book your perfect studio. Bring your ideas to life.