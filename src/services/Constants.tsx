import {LayoutDashboard,Calendar,List,WalletCards,Settings} from "lucide-react";
import type{ LucideIcon } from "lucide-react";

export interface SideBarOption {
  name: string;
  icon: LucideIcon;
  path: string;
}

export const SideBarOptions:SideBarOption[]= [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/home/dashboard"
    },
    {
        name: "Scheduled Interview",
        icon: Calendar,
        path: "/scheduled-interview"
    },
    {
        name: "All Interview",
        icon: List,
        path: "/all-interview"
    },
    {
        name: "Billing",
        icon: WalletCards,
        path: "/billing"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
]

export const Question_Prompt =`You are an expert interviewer. Based on the following input, generate a list of interview questions.

Input:
- Job Type: {{jobType}}
- Job Description: {{jobDescription}}
- Interview Duration: {{interviewDuration}}
- Interview Type: {{interviewType}} 

Guidelines:
1. Tailor questions to match the job type and job description.
2. Adjust the number of questions to fit within the interview duration. 
   - Short interviews (5–15 minutes): 3–5 focused questions.
   - Medium interviews (30 minutes): 6–10 questions.
   - Long interviews (60+ minutes): 12–15 questions.
3. Align the question style with the interview type (e.g., Technical, Behavioral, HR, Case Study, System Design).
4. Provide a mix of easy, medium, and challenging questions.
5. Each question must be tagged with one of these categories:
   - "behavioral"
   - "technical"
   - "leadership"
   - "problem-solving"
6. Output strictly in **JSON array format**, where each item is an object with:
   - question → the question string
   - type → one of ["behavioral", "technical", "leadership", "problem-solving"]

Output Example:
[
  {
    "question": "Tell me about a time you faced a conflict in a team and how you resolved it.",
    "type": "behavioral"
  },
  {
    "question": "How do you optimize MongoDB queries for better performance?",
    "type": "technical"
  },
  {
    "question": "Describe a situation where you had to motivate your team under tight deadlines.",
    "type": "leadership"
  },
  {
    "question": "How would you design a scalable system for real-time chat?",
    "type": "problem-solving"
  }
]

`