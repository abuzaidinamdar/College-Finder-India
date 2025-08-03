import { GoogleGenerativeAI } from '@google/generative-ai';
import { College } from '../App';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export class GeminiCollegeService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  async searchColleges(location: string): Promise<College[]> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    try {
      const prompt = `
        Find ALL available IT and Management colleges in ${location}, India. Please provide a comprehensive list of educational institutions including universities, colleges, institutes, and schools that offer IT or Management courses.
        
        [
          {
            "name": "Exact college name",
            "address": "Complete postal address",
            "contactDetails": {
              "phone": "Phone number with country code",
              "email": "Official email address",
              "website": "Official website URL"
            },
            "coursesAvailable": [
              "List specific IT and Management courses offered"
            ],
            "fees": [
              {
                "course": "Course name", 
                "amount": "Fee amount in Indian Rupees"
              }
            ],
            "type": "IT" or "Management" or "Both"
          }
        ]
        
        Requirements:
        - Find AT LEAST 20-30 colleges, include ALL available institutions in ${location}
        - Include ALL types: Government, Private, Deemed, Autonomous, State Universities
        - Include technical institutes, engineering colleges, management institutes
        - Include both undergraduate and postgraduate institutions
        - Cover all categories:
          * Central Universities (if any)
          * State Universities  
          * Private Universities
          * Deemed Universities
          * Engineering Colleges
          * Management Institutes
          * Technical Institutes
          * Polytechnics offering degree courses
          * Professional colleges
        - Include famous institutions like IITs, NITs, IIMs, IIITs if present
        - Include all local colleges and universities
        - Provide actual contact details for each
        - Include current 2024-25 fee structures
        - Focus on institutions offering:
          * IT/Computer courses: B.Tech CSE, B.Tech IT, BCA, MCA, M.Tech, Data Science, AI/ML, Cyber Security
          * Management courses: MBA, BBA, PGDM, Executive MBA, Hospital Management, Hotel Management
        - Don't limit the search, provide extensive coverage of ${location}
        
        Return only the JSON array, no markdown formatting or extra text. Make the list as comprehensive as possible.
      `;

      console.log('Sending request to Gemini AI for location:', location);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      console.log('Raw Gemini response:', text);
      
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }
      
      try {
        const colleges = JSON.parse(text);
        
        if (Array.isArray(colleges) && colleges.length > 0) {
          console.log(`Successfully parsed ${colleges.length} colleges from Gemini AI`);
          
          const validColleges = colleges.filter(college => 
            college.name && 
            college.address && 
            college.coursesAvailable && 
            Array.isArray(college.coursesAvailable) &&
            college.fees &&
            Array.isArray(college.fees)
          ).map(college => ({
            ...college,
            contactDetails: college.contactDetails || {},
            type: college.type || 'Both'
          }));
          
          if (validColleges.length > 0) {
            return validColleges;
          }
        }
        
        throw new Error('No valid colleges found in response');
        
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        console.error('Response text:', text);
        
        return await this.searchCollegesSimple(location);
      }
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      
      return await this.searchCollegesSimple(location);
    }
  }

  private async searchCollegesSimple(location: string): Promise<College[]> {
    try {
      const prompt = `List ALL colleges and universities in ${location}, India that offer IT or Management courses. Include government, private, deemed universities, engineering colleges, management institutes. Provide at least 15-20 institutions. For each college, provide: name, address, phone, email, website, courses offered, and fees. Format as JSON array with complete information.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }
      
      const colleges = JSON.parse(text);
      
      if (Array.isArray(colleges) && colleges.length > 0) {
        return colleges.map(college => ({
          name: college.name || `College in ${location}`,
          address: college.address || `${location}, India`,
          contactDetails: {
            phone: college.phone || college.contactDetails?.phone || "Contact college directly",
            email: college.email || college.contactDetails?.email || "Not available",
            website: college.website || college.contactDetails?.website || "Not available"
          },
          coursesAvailable: college.courses || college.coursesAvailable || [
            "B.Tech Computer Science",
            "MBA",
            "BBA"
          ],
          fees: college.fees || [
            { course: "B.Tech", amount: "₹1,50,000 - ₹3,00,000 per year" },
            { course: "MBA", amount: "₹2,00,000 - ₹5,00,000 per year" }
          ],
          type: college.type || "Both"
        }));
      }
      
      throw new Error('No colleges found');
      
    } catch (error) {
      console.error('Simple search also failed:', error);
      throw new Error(`Unable to find colleges in ${location}. Please check your internet connection and API key, or try a different location.`);
    }
  }
}

export const geminiService = new GeminiCollegeService();
