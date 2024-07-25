/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InfiniList from './InfiniList'
import { getItems } from '../apis/api-utils'

type TicketsPageProps = {
  serverAddress: string,
}

type Ticket = { Loading: 'Please wait...' }
  | { Error: 'Failed to fetch' }
  | {
    gig_id: number,
    user_id: number,
  }

const loadingDefault: Ticket = { Loading: 'Please wait...' }
const errorDefault: Ticket = { Error: 'Failed to fetch' }

const TicketsPage = ({ serverAddress }: TicketsPageProps) => {
  const { pathname } = useLocation()
  const [currentTickets, setTickets] = useState<Array<Ticket>>([loadingDefault])
  useEffect(() => {
    getItems(serverAddress, 'tickets')
      .then((ticketsList) => {
        setTickets(ticketsList)
      })
      .catch((e) => {
        setTickets([errorDefault])
      })
  }, [])

  return (
    <div className='ticketsPage dataPage'>
      <h2>This is the Users Page at path "{pathname}"</h2>
      <InfiniList
        listOfItems={currentTickets}
        listName='tickets'
        idKey='composite_id' />
    </div>
  )
}

export default TicketsPage
