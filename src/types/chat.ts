
export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'greeting' | 'faq' | 'no-match' | 'ticket-created' | 'suggestion';
  ticketId?: string;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  status: 'Pending' | 'Auto-Closed' | 'Resolved';
  timestamp: string;
  chatTranscript?: string;
}

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category?: string;
  keywords: string[];
}
