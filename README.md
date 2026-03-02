# Front-End Web Application

This project is a React application built with [Vite](https://vitejs.dev/) and TypeScript. It provides basic pages for managing cars and people using simple components.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JoaquimPassareli/front-web.git
   cd front-web
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` by default.

## 🗂 Project Structure

```
public/             # Static assets
src/                # Source files
  assets/           # Images and other assets
  components/       # React components
    PageCarros.tsx  # Car management page
    PagePessoas.tsx # People management page
  types/            # TypeScript type definitions
    TypesCarros.ts
    TypesPessoas.ts
  App.tsx           # Root component
  main.tsx          # App entry point

vite.config.ts      # Vite configuration
tsconfig.json        # TypeScript configuration
```

## 📦 Technologies

- React
- TypeScript
- Vite
- ESLint

## 🛠 Features

- Two main pages: **Cars** and **People**
- Type definitions to ensure type safety
- Simple, responsive layout using CSS files

## ✅ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## 💡 Tips

- Modify or extend pages in `src/components`
- Add additional types to `src/types` as needed
- Use Vite's fast refresh for rapid development feedback

## 📄 License

This project is open source and available under the MIT License.

---

Feel free to contribute or reach out with questions!
