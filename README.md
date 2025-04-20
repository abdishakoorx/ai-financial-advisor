# Personal Finance Advisor
A full-stack application that provides personalized financial advice using Next.js, FastAPI, and Google Gemini AI.

![Personal Finance Advisor App](./screenshots/homepage-lg.png)

## Features
- Ask questions about budgeting, debt management, savings, and investments
- Get detailed financial advice tailored to your specific situation
- Visual budget breakdown with interactive charts
- View history of previous queries
- Responsive design for all devices

## Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS, shadcn/ui, Recharts
- **Backend**: Python FastAPI
- **AI**: Google Gemini API

## Screenshots

### Homepage
<div align="center">
  <img src="./screenshots/homepage-lg.png" alt="Homepage (Desktop)" width="600"/>
  <p><em>Homepage - Desktop View</em></p>
  
  <img src="./screenshots/homepage-sm.png" alt="Homepage (Mobile)" width="300"/>
  <p><em>Homepage - Mobile View</em></p>
</div>

### History Page
<div align="center">
  <img src="./screenshots/history-lg.png" alt="History Page (Desktop)" width="600"/>
  <p><em>History Page - Desktop View</em></p>
  
  <img src="./screenshots/history-sm.png" alt="History Page (Mobile)" width="300"/>
  <p><em>History Page - Mobile View</em></p>
</div>

### About Page
<div align="center">
  <img src="./screenshots/about-lg.png" alt="About Page (Desktop)" width="600"/>
  <p><em>About Page - Desktop View</em></p>
  
  <img src="./screenshots/about-sm.png" alt="About Page (Mobile)" width="300"/>
  <p><em>About Page - Mobile View</em></p>
</div>

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Google Gemini API key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```
   > **Note:** You can get your Gemini API key by visiting [Google AI Studio](https://aistudio.google.com/app/apikey). Sign in with your Google account and create a new API key.

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the root directory and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Prompt Engineering
The application uses a detailed prompt to generate personalized financial advice:
```
I need you to act as a professional financial advisor and provide detailed, personalized financial advice based on the following query:
"{user_query}"
Provide clear, actionable financial advice with:
## FINANCIAL SNAPSHOT
- Quick assessment of the current situation
- Key priorities based on their query
## BUDGET BREAKDOWN
- Create a practical monthly budget with specific amounts
- Focus on essential categories relevant to their situation
- Use actual numbers if income is mentioned, otherwise use percentages
## ACTION PLAN
- 3-5 specific, immediate steps they should take
- Include exact dollar amounts and timeframes
- Recommend free tools/apps to help implementation
## NEXT LEVEL STRATEGIES
- 2-3 advanced tactics to accelerate their financial progress
- Specific investment recommendations based on their goals
- One unique insight most advisors wouldn't mention
Format your response with clear headings, bullet points, and minimal text. Be conversational and encouraging.
At the end, include a simple budget breakdown formatted exactly like this:
BUDGET_DATA
Housing: 30
Food: 15
Transportation: 10
Utilities: 5
Insurance: 10
Debt: 15
Savings: 10
Other: 5
Adjust categories and percentages based on their situation. The percentages must add up to 100%.
```

## Project Structure
- `/app` - Next.js pages and components
- `/components` - UI components using shadcn/ui
- `/backend` - FastAPI server and API endpoints
- `/screenshots` - Application screenshots for documentation

## Future Enhancements
- User authentication to save personalized advice
- Financial goal tracking
- Bill payment reminders
- Custom budget templates
- Investment portfolio visualization

