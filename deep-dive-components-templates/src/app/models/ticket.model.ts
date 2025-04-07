export type Ticket = {
  id: string;
  title: string;
  request: string;
  status: 'opened' | 'closed';
}

export type NewTicket = Omit<Ticket, 'id' | 'status'>