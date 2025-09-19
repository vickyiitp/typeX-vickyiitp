# TypeX 2025 - Futuristic Typing Trainer

A futuristic typing trainer and challenge platform that combines modern UI/UX trends with gamified multi-level training, real-time analytics, achievements, and AI-driven feedback.

This project is a fully client-side application built with React and TypeScript, using in-browser transpilation for simplicity. It leverages the Google Gemini API for AI-powered features and local storage to persist user data, making it fast, offline-capable, and easy to deploy.

## Features

- **Gamified Progression:** Level up, earn XP, and unlock achievements.
- **AI-Powered Feedback:** Get personalized coaching from an AI assistant after each test.
- **Dynamic Challenges:** Generate infinite typing tests with adjustable difficulty and duration.
- **Custom Tests:** Paste your own text to practice with.
- **Real-time Analytics:** Track your WPM, accuracy, and errors as you type.
- **Modern UI/UX:** A sleek, cyberpunk-themed interface with light and dark modes.
- **Fully Responsive:** Works beautifully on desktop and mobile devices.
- **No Backend Needed:** All data is stored in the browser's local storage.

---

## How to Deploy for Free (Recommended)

The best way to deploy this application is using a service like **Vercel** or **Netlify**. They offer generous free tiers and make it incredibly easy to manage the environment variables required for the Gemini API key.

### Deploying on Vercel

1.  **Fork/Clone this Repository:** Get a copy of this project into your own GitHub account.
2.  **Sign up for Vercel:** Go to [Vercel.com](https://vercel.com) and sign up with your GitHub account.
3.  **Create a New Project:**
    *   From your Vercel dashboard, click "Add New... -> Project".
    *   Import the GitHub repository you just created.
4.  **Configure the Project:**
    *   Vercel will automatically detect that this is a static site. You do **not** need to specify a build command or output directory.
    *   Go to the **"Environment Variables"** section.
    *   Add a new variable:
        *   **Name:** `API_KEY`
        *   **Value:** Paste your Google Gemini API key here.
    *   **Important:** Ensure the key is available on the client by **NOT** checking the "Secret" box if Vercel provides such an option. The application requires this variable to be accessible in the browser.
5.  **Deploy:**
    *   Click the "Deploy" button.
    *   Vercel will build and deploy your site, providing you with a public URL.

Your application is now live! The `process.env.API_KEY` in the code will automatically pick up the value you set in the Vercel project settings.
