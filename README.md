# Contract UI Generator

A Next.js application that generates and manages user interfaces for smart contracts using AI. This project allows users to create, view, and interact with contract UIs across different addresses.

## Features

- 🤖 AI-powered UI generation for smart contracts
- 🔍 Search and filter contracts by address
- 📜 View contract history and previous generations
- ⚡ Real-time UI updates and previews
- 🔄 Version history for each contract UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- An Upstash Redis database
- Environment variables set up (see below)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Connect your wallet using the Connect button
2. Enter a contract address to generate a UI
3. View and interact with generated UIs
4. Browse previous generations in the contract history
5. Search for specific contracts using the filter

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Upstash Redis](https://upstash.com/) - Database
- TypeScript - Language
- AI Integration - UI Generation
- Web3 Integration - Blockchain interaction

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and database operations
- `/public` - Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license here]
