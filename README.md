# CareerSync-AI

# 📦 Project Dependencies

This project is built using **Spring Boot 4.1.0** and **Java 21**. Below are the dependencies used and their purpose.

| Dependency | Purpose | Why It's Used |
|------------|---------|---------------|
| `spring-boot-starter-data-jpa` | Spring Data JPA + Hibernate | Provides JPA, Hibernate ORM, Repository support, Entity mapping, CRUD operations, JPQL, and transaction management. |
| `spring-boot-starter-validation` | Jakarta Bean Validation | Validates incoming request data using annotations such as `@NotNull`, `@NotBlank`, `@Email`, `@Size`, and `@Pattern`. |
| `spring-boot-starter-webmvc` | Spring MVC | Enables building RESTful APIs using `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, etc. Also includes an embedded Tomcat server. |
| `mysql-connector-j` | MySQL JDBC Driver | Allows the application to connect and communicate with a MySQL database. |
| `lombok` | Boilerplate Code Generator | Reduces repetitive code by generating getters, setters, constructors, builders, and more through annotations. |
| `spring-boot-starter-data-jpa-test` | JPA Testing | Provides utilities for testing repositories and database operations using JPA. |
| `spring-boot-starter-validation-test` | Validation Testing | Supports unit testing of validation annotations and constraints on DTO classes. |
| `spring-boot-starter-webmvc-test` | Spring MVC Testing | Provides testing support for controllers using MockMvc and other Spring MVC testing utilities. |

---

# 🛠 Build Plugins

## Spring Boot Maven Plugin

**Purpose**
- Packages the application as an executable JAR.
- Simplifies running the application using Maven.
- Automatically includes all required dependencies.

### Maven Command

```bash
mvn spring-boot:run
```

---

## Maven Compiler Plugin

**Purpose**
- Compiles Java source code.
- Enables Lombok annotation processing during compilation.
- Ensures generated code is available at compile time.

---

# ✅ Features Enabled by These Dependencies

- RESTful API Development
- Spring MVC
- Spring Data JPA
- Hibernate ORM
- MySQL Database Connectivity
- Bean Validation
- Lombok Support
- Repository Layer
- Service Layer
- Controller Layer
- Transaction Management
- Unit Testing
- Controller Testing
- Validation Testing

---

# 📚 Technology Stack

- Java 21
- Spring Boot 4.1.0
- Spring MVC
- Spring Data JPA
- Hibernate
- MySQL
- Jakarta Validation
- Lombok
- Maven

---

# 🚀 Future Dependencies (Recommended)

The following dependencies can be added as the project grows:

| Dependency | Purpose |
|------------|---------|
| `spring-boot-starter-security` | Authentication & Authorization |
| `JWT Library (jjwt)` | JWT Token Generation & Validation |
| `springdoc-openapi-starter-webmvc-ui` | Swagger/OpenAPI Documentation |
| `spring-boot-starter-mail` | Email Verification & Password Reset |
| `spring-boot-starter-actuator` | Health Monitoring & Metrics |
| `ModelMapper / MapStruct` | DTO ↔ Entity Mapping |
| `Cloudinary / AWS S3 SDK` | Resume & Image Storage |
| `Apache PDFBox / OpenPDF` | PDF Resume Generation |
| `Apache POI` | Excel Import & Export |
| `Spring AI / Groq / Ollama Client` | AI-powered Resume Analysis |

---

## 📌 Current Project Status

✔ Spring Boot Setup  
✔ REST API Support  
✔ MySQL Integration  
✔ JPA & Hibernate  
✔ Validation Support  
✔ Lombok Configuration  
✔ Testing Dependencies Configured  
✔ Maven Build Configuration


# 🎨 Frontend Dependencies

The frontend of **CareerSync AI** is built using **React 19**, **Vite**, and **Tailwind CSS 4** to deliver a fast, responsive, and modern user experience.

| Dependency | Purpose | Why It's Used |
|------------|---------|---------------|
| `react` | JavaScript UI Library | Used to build reusable, component-based user interfaces with a virtual DOM for efficient rendering. |
| `react-dom` | React DOM Renderer | Renders React components into the browser DOM and manages updates efficiently. |
| `react-router-dom` | Client-Side Routing | Enables navigation between pages without full-page reloads using routes like `BrowserRouter`, `Routes`, and `Route`. |
| `tailwindcss` | Utility-First CSS Framework | Provides utility classes for rapidly building responsive and customizable user interfaces without writing custom CSS. |

---

# 🛠 Development Dependencies

| Dependency | Purpose | Why It's Used |
|------------|---------|---------------|
| `vite` | Build Tool & Development Server | Offers fast development, Hot Module Replacement (HMR), and optimized production builds. |
| `@vitejs/plugin-react` | React Plugin for Vite | Enables React support, JSX transformation, and Fast Refresh in Vite. |
| `eslint` | JavaScript Linter | Identifies code quality issues and helps maintain consistent coding standards. |
| `@eslint/js` | ESLint JavaScript Rules | Provides the recommended ESLint configuration for JavaScript projects. |
| `eslint-plugin-react-hooks` | React Hooks Linting | Ensures correct usage of React Hooks and prevents common mistakes. |
| `eslint-plugin-react-refresh` | Fast Refresh Linting | Ensures compatibility with React Fast Refresh during development. |
| `globals` | Global Variables | Provides predefined browser and Node.js global variables for ESLint. |
| `@types/react` | React Type Definitions | Supplies TypeScript type definitions for React (used by editors and tooling). |
| `@types/react-dom` | React DOM Type Definitions | Supplies TypeScript type definitions for React DOM. |

---

# 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Installs all project dependencies. |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Creates an optimized production build. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint to detect code quality issues. |

---

# ✅ Features Enabled by These Dependencies

- Modern React 19 Development
- Component-Based Architecture
- Single Page Application (SPA)
- Client-Side Routing
- Fast Development with Vite
- Hot Module Replacement (HMR)
- Responsive UI with Tailwind CSS
- Optimized Production Builds
- Code Quality with ESLint
- React Hooks Support

---

# 📚 Frontend Technology Stack

- React 19
- React DOM
- React Router DOM
- Tailwind CSS 4
- Vite
- JavaScript (ES Modules)
- ESLint

---

# 🚀 Future Dependencies (Recommended)

As the project grows, consider adding the following packages:

| Dependency | Purpose |
|------------|---------|
| `axios` | HTTP Client for API Communication |
| `react-hook-form` | Efficient Form Management |
| `zod` | Schema Validation |
| `@hookform/resolvers` | React Hook Form + Zod Integration |
| `react-hot-toast` | Toast Notifications |
| `lucide-react` | Modern SVG Icons |
| `framer-motion` | Smooth Animations |
| `@tanstack/react-query` | Data Fetching & Caching |
| `zustand` | Lightweight State Management |
| `clsx` | Conditional CSS Class Names |
| `jspdf` | PDF Generation |
| `react-dropzone` | Drag & Drop File Upload |
| `recharts` | Interactive Charts & Graphs |

---

# 📌 Current Project Status

✔ React 19 Setup  
✔ Vite Configuration  
✔ Tailwind CSS Integration  
✔ React Router DOM  
✔ ESLint Configuration  
✔ Production Build Support  
✔ Modern Frontend Architecture