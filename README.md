# Personal Finance Advisor

A full-stack application that provides personalized financial advice using Next.js, FastAPI, and Google Gemini AI.

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

6. Start the FastAPI server:
   ```bash
   python main.py
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

Please analyze the situation thoroughly and provide comprehensive advice that includes:

1. BUDGET BREAKDOWN:
   - Create a detailed monthly budget with specific percentages and dollar amounts for each category
   - Include essential categories: Housing, Food, Transportation, Utilities, Insurance, Debt Repayment, Savings
   - Add context-specific categories based on the query (e.g., childcare, education)
   - If income is mentioned, base calculations on actual numbers
   - If income is not mentioned, use percentages and general guidelines

2. DEBT MANAGEMENT:
   - Prioritize debt repayment strategies (avalanche or snowball method)
   - Recommend specific payment amounts for each debt
   - Suggest refinancing or consolidation options if appropriate
   - Calculate potential interest savings with accelerated payments

3. SAVINGS PLAN:
   - Emergency fund recommendations (specific dollar amount)
   - Short-term savings goals with timeframes
   - Long-term savings strategies
   - Appropriate account types for different goals (HYSA, CDs, etc.)

4. INVESTMENT GUIDANCE:
   - Asset allocation suggestions based on age, goals, and risk tolerance
   - Specific investment vehicle recommendations (401(k), IRA, taxable accounts)
   - Tax optimization strategies
   - Dollar-cost averaging or lump sum recommendations

5. COST-SAVING MEASURES:
   - Specific actionable tips to reduce expenses in major categories
   - Income expansion opportunities if relevant
   - Services or subscriptions to consider cutting
   - Cost comparison resources

6. REGION-SPECIFIC ADVICE:
   - If a location is mentioned, include cost of living context
   - Local programs or resources that might help
   - State/local tax considerations

7. NEXT STEPS:
   - Provide a clear, prioritized action plan with 3-5 immediate steps
   - Include timeframes for implementation
   - Suggest free or low-cost tools/apps to help with financial management

Format your response using markdown with clear headings, bullet points, and tables where appropriate.
Include specific numbers and percentages whenever possible.

Important: Be specific and actionable. Avoid generic advice like "cut expenses" - instead say "reduce dining out from $400 to $200 monthly" or similar concrete guidance.

Also, include a JSON object for a budget breakdown that could be used to create a chart.
```

## Project Structure

- `/app` - Next.js pages and components
- `/components` - UI components using shadcn/ui
- `/backend` - FastAPI server and API endpoints

## Future Enhancements

- User authentication to save personalized advice
- Financial goal tracking
- Bill payment reminders
- Custom budget templates
- Investment portfolio visualization

