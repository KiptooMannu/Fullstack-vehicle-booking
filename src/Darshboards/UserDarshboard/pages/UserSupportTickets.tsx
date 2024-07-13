import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSupportTicket, useGetSupportTicketsByUserIdQuery, useCreateSupportTicketMutation } from '../../../Features/SupportTickets/SupportAPI';
import './UserSupportTickets.scss'; // Import your styles here

const supportTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Description is required'),
});

type SupportTicketFormValues = z.infer<typeof supportTicketSchema>;

const UserSupportTickets: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.user?.userId;
  const { data: tickets, error, isLoading } = useGetSupportTicketsByUserIdQuery(Number(userId));
  const [createSupportTicket] = useCreateSupportTicketMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<SupportTicketFormValues>({
    resolver: zodResolver(supportTicketSchema),
  });

  const onSubmit = async (data: SupportTicketFormValues) => {
    try {
      await createSupportTicket({ userId, ...data });
      alert('Support ticket created successfully');
    } catch (error) {
      console.error('Failed to create support ticket', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching support tickets.</div>;
  }

  return (
    <div className="support-tickets">
      <h2>User Support Tickets</h2>
      <button onClick={() => document.getElementById('create-ticket-form')?.classList.toggle('hidden')}>
        Create New Support Ticket
      </button>
      <div id="create-ticket-form" className="create-ticket-form hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Subject</label>
            <input type="text" {...register('subject')} />
            {errors.subject && <p>{errors.subject.message}</p>}
          </div>
          <div>
            <label>Description</label>
            <textarea {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {tickets && tickets.length > 0 ? (
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket: TSupportTicket) => (
              <tr key={ticket.ticketId}>
                <td>{ticket.subject}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No support tickets found for this user.</p>
      )}
    </div>
  );
};

export default UserSupportTickets;
