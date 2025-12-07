# SpamGuard AI - Frontend

A professional, modern React application for SMS Spam Detection. Built with React 18, TypeScript, and Tailwind CSS.

## Features

- **Real-time Prediction**: Instant classification of SMS messages as Spam or Ham.
- **Explainability**: Visual highlighting of tokens that contributed to the decision (Explainable AI).
- **Confidence Visualization**: Gauge charts and confidence bars.
- **History Management**: Local storage-based history of previous predictions.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Mock Fallback**: Includes a built-in mock engine for demo purposes if the backend is offline.

## Setup & Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run Development Server**:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Configuration

Create a `.env` file in the root (if using a build tool that supports it like Vite/Next.js, otherwise configure in `constants.ts`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### API Contract

The frontend expects a POST request to `/api/predict`:

**Request:**
```json
POST /api/predict
Content-Type: application/json

{
  "text": "Congratulations! You've won a $1000 gift card."
}
```

**Response:**
```json
{
  "label": "spam",
  "probability": 0.98,
  "explanation": [
    { "token": "won", "score": 0.8 },
    { "token": "gift", "score": 0.5 }
  ],
  "timestamp": "2023-10-27T10:00:00Z"
}
```

**Note:** If the API is unreachable, the app automatically switches to "Mock Mode" using client-side logic defined in `services/api.ts` to allow for UI demonstrations.

## Deployment

### Vercel / Netlify

This project is a standard React SPA.

1.  Build the project: `npm run build`
2.  Deploy the `build` (or `dist`) folder.
3.  Ensure your backend API supports CORS for your frontend domain.

## Project Structure

- `App.tsx`: Main layout and state management.
- `components/`: Reusable UI components (InputCard, PredictionCard, etc.).
- `services/api.ts`: API integration and mock logic.
- `constants.ts`: Global constants, design tokens, and mock data.
- `types.ts`: TypeScript interfaces.

## Technology Stack

- **React 18**
- **TypeScript**
- **Tailwind CSS** (Styling)
- **Recharts** (Data Visualization)
- **Lucide / Heroicons** (Icons - custom SVGs implemented)
