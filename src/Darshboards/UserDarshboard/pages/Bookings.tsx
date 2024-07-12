// import React from 'react';
import { useGetSupportTicketsByUserIdQuery } from '../../../Features/SupportTickets/SupportAPI';
// import './path-to-your-styles.css';

const UserSupportTickets = () => {
  // Retrieve user ID from local storage
const userItem = localStorage.getItem('user');
const userObject = JSON.parse(userItem);
  
  // Access the userId property
  const userId = userObject.user.userId;

  // Use the query hook with the user ID
  const { data: tickets, error, isLoading } = useGetSupportTicketsByUserIdQuery(Number(userId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching support tickets.</div>;
  }

  return (
    <div className="support-tickets">
      <h2>User Support Tickets</h2>
      <ul>
        {tickets?.map(ticket => (
          <li key={ticket.ticketId}>
            <h3>{ticket.subject}</h3>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(ticket.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSupportTickets;
