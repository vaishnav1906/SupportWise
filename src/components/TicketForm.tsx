
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Ticket, X } from "lucide-react";

interface TicketFormProps {
  query: string;
  onTicketCreated: (ticketId: string, userInfo: any) => void;
  onCancel: () => void;
}

export const TicketForm = ({ query, onTicketCreated, onCancel }: TicketFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: query
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateTicketId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `USER${year}-${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ticketId = generateTicketId();
    
    // Store ticket in localStorage (in real app, this would be sent to backend)
    const ticket = {
      id: ticketId,
      ...formData,
      status: "Pending",
      timestamp: new Date().toISOString()
    };
    
    const existingTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    existingTickets.push(ticket);
    localStorage.setItem('supportTickets', JSON.stringify(existingTickets));

    onTicketCreated(ticketId, formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="m-4 p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            Create Support Ticket
          </h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
        Please provide your contact information so our support team can assist you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
              className="bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              required
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div>
          <Label htmlFor="description">Issue Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your issue in detail..."
            rows={4}
            className="bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Creating Ticket..." : "Create Ticket"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
