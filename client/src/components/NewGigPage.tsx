/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import InfiniNewItemForm from './InfiniNewItemForm'

type NewGigPageProps = {
  serverAddress: string,
}

const NewGigPage = ({ serverAddress }: NewGigPageProps) => {
  const { pathname } = useLocation()

  const gigFields = [ 'location', 'artist', 'date_time' ]
  const sampleGig = {
    location: 'The Wardrobe - Leeds',
    artist: 'Duran Duran',
    date_time: '2022-11-21 19:30:00',
  }

  return (
    <div className='newGigPage dataPage'>
      <h2>This is the New Gig Page at path "{pathname}"</h2>
      <p>It submits data to postgres via apigw + lambda.</p>
      <InfiniNewItemForm
        serverAddress={serverAddress}
        apiPath='gigs' 
        itemType='Gig'
        fieldList={gigFields} 
        sampleItem={sampleGig}
      />
    </div>
  )
}

export default NewGigPage
