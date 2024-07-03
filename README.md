# E-com Store

![E-com Store](./public/Main%20Page.png)

E-com Store is a modern e-commerce website built with Next.js and Sanity.io. The website is designed to provide a seamless shopping experience, featuring various categories for different demographics.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- **Responsive Design**: Works on all devices.
- **Category Filtering**: Browse products by categories such as Male, Female, and Children.
- **Product Details**: View detailed information about each product.
- **Sanity.io Integration**: Manage content with Sanity.io.
- **Dynamic Routing**: Efficient routing for product and category pages.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MuhammadRaffey/E-Commerce-Website
   cd E-Commerce-Website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Setup Sanity.io:**

   Follow the [Sanity.io documentation](https://www.sanity.io/docs) to set up your Sanity project and dataset.

4. **Configure environment variables:**

   Create a `.env.local` file in the root of the project and add your Sanity project details:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   ```

## Usage

1. **Run the development server:**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

ecom-store/
├── public/ # Public assets
├── src/
│ ├── components/ # React components
│ ├── pages/ # Next.js pages
│ ├── styles/ # Stylesheets
│ └── utils/ # Utility functions
├── sanity/ # Sanity studio configuration
├── .env.local # Environment variables
├── next.config.mjs # Next.js configuration
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.
