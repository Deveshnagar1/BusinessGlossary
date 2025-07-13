# Genius Business Glossary

This project is a modern, responsive business glossary web application for managing and exploring business terms, definitions, and data governance features. It supports CSV import, executive/developer views, AI-powered insights, and more.

## Features
- Import and display glossary data from CSV
- Table and card views
- Responsive, attractive UI with Tailwind CSS
- AI-powered insights modal
- Data governance and quality metrics
- Expandable definitions
- Filtering, searching, and pagination

## Getting Started
1. Install dependencies: `npm install`
2. Start the app: `npm run dev`
3. Place your CSV file in the `public` folder as `bg.csv`

## Deployment
To build and deploy the app:
1. Build the production bundle: `npm run build`
2. Preview locally: `npm run preview`
3. Deploy the contents of the `dist` folder to your preferred static hosting (e.g., Vercel, Netlify, GitHub Pages, Azure Static Web Apps).

### Deploying on AWS S3 + CloudFront
1. Build the app: `npm run build`
2. Create an S3 bucket (e.g., `business-glossary-app`).
3. Upload all files from the `dist` folder to your S3 bucket.
4. Enable static website hosting on the bucket and set `index.html` as the entry point.
5. (Optional) Set up an AWS CloudFront distribution for CDN and HTTPS:
   - Create a new CloudFront distribution.
   - Set the origin to your S3 bucket website endpoint.
   - Configure default root object as `index.html`.
   - (Optional) Add a custom domain and SSL certificate.
6. Your app will be available at the CloudFront URL or your custom domain.

### Deploying with AWS Amplify (Recommended for CI/CD)
1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to the AWS Amplify Console and click "New app" > "Host web app".
3. Connect your repository and select the branch to deploy.
4. Amplify will auto-detect the build settings (ensure build command is `npm run build` and output directory is `dist`).
5. Click "Save and deploy". Amplify will build and host your app.
6. Set up custom domains, environment variables, and branch previews as needed.
7. Every push to your repo will trigger an automatic build and deployment.

## Folder Structure
- `src/` - Source code
- `public/` - Static assets (including `bg.csv`)
- `doc/` - Project documentation

## Technologies
- React
- TypeScript
- Tailwind CSS
- Vite

## Contributing
Pull requests and suggestions are welcome!
