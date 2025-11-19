import { BriefcaseBusiness, Code, Puzzle, UserRound, type LucideIcon } from "lucide-react";

export interface InterviewType {
    title: string;
    icon: LucideIcon;
}

export const InterviewTypes:InterviewType[] = [
    {
        title: "Technical",  
        icon: Code
    } ,
    {
        title:"Behaviour",
        icon:UserRound
    },
     {
        title:"Problem Solving",
        icon:Puzzle
    },
     {
        title:"Leadership",
        icon:BriefcaseBusiness
    },
]
