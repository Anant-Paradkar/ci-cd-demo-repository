/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import InfiniNewItemForm from './InfiniNewItemForm'

type NewTicketProps = {
  serverAddress: string,
}

const NewTicketPage = ({ serverAddress }: NewTicketProps) => {
  const { pathname } = useLocation()

  const ticketFields = [ 'gig_id', 'user_id' ]
  const sampleTicket = {
    gig_id: '1',
    user_id: '2'
  }

  return (
    <div className='newTicketPage dataPage'>
      <h2>This is the New Ticket Page at path "{pathname}"</h2>
      <p>It submits data to postgres via apigw + lambda.</p>
      <InfiniNewItemForm
        serverAddress={serverAddress}
        apiPath='tickets' 
        itemType='Ticket'
        fieldList={ticketFields} 
        sampleItem={sampleTicket}
      />
    </div>
  )
}

export default NewTicketPage
