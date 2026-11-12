export interface Project {
    id: string;
    title: string;
    startDate: string;
    completionDate?: string;
    tagline: string[];
    content: string;
}