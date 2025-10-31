export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'technical' | 'creative';
  techStack?: string[];
  links: {
    github?: string;
    live?: string;
    youtube?: string;
    other?: string[];
  };
  certificateUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'technical' | 'creative';
  date: Date;
  certificateUrl?: string;
  links?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  type: 'technical' | 'creative';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreativeHighlight {
  id: string;
  title: string;
  description: string;
  mediaType: 'video' | 'image' | 'audio';
  mediaUrl: string;
  date: Date;
  links?: string[];
}