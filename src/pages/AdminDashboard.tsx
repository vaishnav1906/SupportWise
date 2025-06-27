import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Ticket, Users, Clock, CheckCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }

    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('supportTickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const resetAllTickets = () => {
    setTickets([]);
    localStorage.removeItem('supportTickets');
    
    toast({
      title: "Tickets Reset",
      description: "All support tickets have been cleared successfully",
    });
  };

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    
    toast({
      title: "Status Updated",
      description: `Ticket ${ticketId} marked as ${newStatus}`,
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const pendingTickets = tickets.filter(t => t.status === 'Pending').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage support tickets and monitor system activity</p>
        </div>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-red-50 dark:bg-red-900/20 backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset All Tickets
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to reset all tickets?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All support tickets will be permanently deleted from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllTickets} className="bg-red-600 hover:bg-red-700">
                  Yes, Reset All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{tickets.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{pendingTickets}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{resolvedTickets}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Support Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No tickets found. Tickets will appear here when users submit support requests.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.name}</TableCell>
                    <TableCell>{ticket.email}</TableCell>
                    <TableCell>{ticket.phone}</TableCell>
                    <TableCell className="max-w-xs truncate" title={ticket.description}>
                      {ticket.description}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={ticket.status === 'Resolved' ? 'default' : 'secondary'}
                        className={ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(ticket.timestamp)}</TableCell>
                    <TableCell>
                      {ticket.status === 'Pending' ? (
                        <Button
                          size="sm"
                          onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Resolved
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTicketStatus(ticket.id, 'Pending')}
                        >
                          Reopen
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
