# Portfolio Website

This is a personal portfolio website that showcases projects and includes a blog section for sharing insights and experiences.

## Features

- **Responsive Design**: Fully responsive for all devices.
- **Portfolio Section**: Showcases your projects with descriptions and links.
- **Blog Section**: Read and share posts on various topics.
- **Contact Form**: Visitors can reach out directly.
- **About Page**: Information about your background and skills.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Material Tailwind React

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd powellkerry.github.io
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The site will open automatically at `http://localhost:5173` (default Vite port).

4. **Build for production:**
   ```sh
   npm run build
   ```
   The output will be in the `dist/` folder.

## Folder Structure

- `src/` — Source code
  - `components/` — Reusable UI components
    - `Blog/` — Blog-related components
  - `pages/` — Page components for routing
  - `styles/` — CSS and Tailwind styles
  - `types/` — TypeScript types and interfaces
- `public/` — Static files (images, data, etc.)
  - `data/` — JSON data files (e.g., blog posts)
  - `gallery/` — Image gallery assets
- `package.json` — Project dependencies and scripts
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

## Notes

- **Data files:** Place all JSON and static data in the `public/data/` directory. Access them in code using `fetch(`${import.meta.env.BASE_URL}data/filename.json`)` for correct local and production loading.
- **Routing:** The app uses `HashRouter` for client-side routing. Blog post URLs are of the form `/#/blog/1`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.