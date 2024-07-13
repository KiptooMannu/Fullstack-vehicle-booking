import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  TSupportTicket, 
  useGetSupportTicketsByUserIdQuery, 
  useCreateSupportTicketMutation 
} from '../../../Features/SupportTickets/SupportAPI';
import '../scss/UserSupportTickets.scss'; // Import your styles here
import ReactPaginate from 'react-paginate';

const supportTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Description is required'),
});

type SupportTicketFormValues = z.infer<typeof supportTicketSchema>;

const UserSupportTickets: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.user?.userId;
  const { data: tickets, refetch, isLoading } = useGetSupportTicketsByUserIdQuery(Number(userId));
  const [createSupportTicket] = useCreateSupportTicketMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SupportTicketFormValues>({
    resolver: zodResolver(supportTicketSchema),
  });

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const ticketsPerPage = 10;
  const pageCount = Math.ceil((tickets?.length || 0) / ticketsPerPage);
  const offset = currentPage * ticketsPerPage;

  const onSubmit = async (data: SupportTicketFormValues) => {
    try {
      const ticketData = { userId, status: 'pending', ...data };
      await createSupportTicket(ticketData);
      reset(); // Reset form fields
      setShowForm(false); // Hide form
      refetch(); // Refresh tickets list
      setCurrentPage(0); // Reset to first page
    } catch (error) {
      console.error('Failed to create support ticket', error);
    }
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="support-tickets">
      <h2>User Support Tickets</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New Support Ticket'}
      </button>
      {showForm && (
        <div className="create-ticket-form">
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
      )}
      {tickets && tickets.length > 0 ? (
        <>
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
              {tickets.slice(offset, offset + ticketsPerPage).map((ticket: TSupportTicket) => (
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
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          )}
        </>
      ) : (
        <p>No support tickets found for this user.</p>
      )}
    </div>
  );
};

export default UserSupportTickets;
