# Terminal Portfolio

A modern, interactive terminal-themed portfolio website built with Next.js, featuring a luxury aesthetic with gold accents and smooth animations.

## 🚀 Features

- **Interactive Terminal Interface**: Navigate through portfolio content using terminal commands
- **Luxury Design**: Elegant gold and cream color scheme with sophisticated typography
- **Draggable Window**: Move the terminal window around the screen
- **Smooth Animations**: Refined transitions and effects throughout
- **Resume Download**: Direct download functionality for the resume

## 📄 Resume

The resume file (`dpark_resume.pdf`) is located in the `/public` folder and can be accessed in two ways:

1. **Via Terminal Command**: Type `/resume` in the terminal to trigger an automatic download
2. **Direct Access**: Navigate to `/dpark_resume.pdf` in your browser

### Resume Details
- **File**: `dpark_resume.pdf`
- **Location**: `/public/dpark_resume.pdf`
- **Updated**: Contains current professional experience, education, and technical skills

## 🛠️ Available Commands

Type these commands in the terminal:

- `/help` - Display all available commands
- `/about` - View profile information
- `/experience` - Browse professional experience
- `/education` - Check educational background
- `/skills` - List technical capabilities
- `/contact` - Get contact information
- `/resume` - Download resume (PDF)
- `/clear` - Clear terminal history

## 🏗️ Tech Stack

- **Framework**: Next.js 15.1.7 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury theme
- **Font**: Montserrat
- **Animations**: CSS transitions and keyframes
- **State Management**: React hooks

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dpxrk/terminal-portfolio.git
cd terminal-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
terminal-portfolio/
├── public/
│   └── park_daniel_resume.pdf    # Resume file for download
├── src/
│   └── app/
│       ├── components/           # React components
│       ├── data/                # Command definitions
│       ├── hooks/               # Custom React hooks
│       ├── types/               # TypeScript types
│       └── globals.css          # Global styles
└── README.md
```

## 🎨 Customization

### Updating Resume
1. Replace `park_daniel_resume.pdf` in the `/public` folder with your updated resume
2. Keep the same filename or update the reference in `/src/app/data/commands.ts`

### Modifying Content
- Edit command outputs in `/src/app/data/commands.ts`
- Adjust colors in `/src/app/globals.css` (CSS variables)
- Modify animations in Tailwind config

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The easiest deployment method is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on Vercel
3. Deploy with default settings

The site is production-ready and optimized for performance.

## 📧 Contact

- **Email**: danielpark0503@gmail.com
- **LinkedIn**: [linkedin.com/in/danielpark0503](https://linkedin.com/in/danielpark0503)
- **GitHub**: [github.com/dpxrk](https://github.com/dpxrk)
- **Website**: [dpxrk.vercel.app](https://dpxrk.vercel.app)

## 📄 License

This project is open source and available under the MIT License.