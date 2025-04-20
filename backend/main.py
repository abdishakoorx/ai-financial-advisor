from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

# Configure API
app = FastAPI(
    title="Personal Finance Advisor API",
    description="API for the Personal Finance Advisor application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Warning: GEMINI_API_KEY not found in environment variables")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.0-flash')
except Exception as e:
    print(f"Error configuring Gemini API: {e}")

# Models
class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    response: str
    budget_breakdown: Optional[dict] = None

# Routes
@app.get("/")
def read_root():
    return {"message": "Personal Finance Advisor API"}

@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    try:
        if not request.query:
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Modify the prompt to request a simpler format for budget data
        prompt = f"""
            I need you to act as a professional financial advisor and provide detailed, personalized financial advice based on the following query:

            "{request.query}"

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
        """
        
        # Call Gemini API
        response = model.generate_content(prompt)
        result = response.text
        
        # Print the raw response for debugging
        print("Raw response received:")
        print(result[:200] + "..." if len(result) > 200 else result)  # Print just the first 200 chars for brevity
        
        # Extract budget data using a simpler pattern
        budget_breakdown = {}
        budget_pattern = r'BUDGET_DATA\s+((?:.*?: \d+\s*)+)'
        budget_match = re.search(budget_pattern, result, re.DOTALL)
        
        if budget_match:
            budget_text = budget_match.group(1)
            print("Extracted budget text:", budget_text)
            
            # Parse each line of budget data
            for line in budget_text.strip().split('\n'):
                if ':' in line:
                    category, percentage = line.split(':', 1)
                    try:
                        budget_breakdown[category.strip()] = float(percentage.strip())
                    except ValueError:
                        print(f"Could not parse percentage from line: {line}")
            
            # Remove the budget data section from the response
            result = result.replace(budget_match.group(0), '')
            result = result.strip()
            
            print(f"Parsed budget breakdown: {budget_breakdown}")
        else:
            print("No budget data section found in the response")
        
        return {"response": result, "budget_breakdown": budget_breakdown}
    
    except Exception as e:
        print(f"Error processing query: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing your query: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)