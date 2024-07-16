import React from 'react';
import { useGetSupportTicketsQuery, useUpdateSupportTicketMutation, TSupportTicket } from '../../../Features/SupportTickets/SupportAPI';
import './SupportTicketsTable.scss'; // Assuming you have some CSS for styling

const SupportTicketsTable: React.FC = () => {
  const { data: tickets, error, isLoading } = useGetSupportTicketsQuery();
  const [updateSupportTicket] = useUpdateSupportTicketMutation();

  const handleResolve = async (ticket: TSupportTicket) => {
    const { ticketId, userId, subject, description, status } = ticket;
    const updatedTicket = { ticketId, userId, subject, description, status: 'resolved' };
    await updateSupportTicket(updatedTicket);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tickets</div>;
  }

  return (
    <div className="ticket-table-container">
      <h2>Support Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets && tickets.map((ticket: TSupportTicket) => (
            <tr key={ticket.ticketId}>
              <td>{ticket.ticketId}</td>
              <td>{ticket.userId}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{formatDate(ticket.createdAt)}</td>
              <td>{formatDate(ticket.updatedAt)}</td>
              <td>
                {ticket.status === 'pending' ? (
                  <button onClick={() => handleResolve(ticket)}>Resolve</button>
                ) : (
                  'Resolved'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTicketsTable;
