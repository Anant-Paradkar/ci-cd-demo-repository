/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import InfiniNewJsonItemForm from './InfiniNewJsonItemForm'

type NewGigDataPageProps = {
  serverAddress: string,
}

const NewGigDataPage = ({ serverAddress }: NewGigDataPageProps) => {
  const { pathname } = useLocation()

  const sampleGig = JSON.stringify({
    'gig_id': 1,
    'location': 'The Wardrobe',
    'data': {
      'menu': {
        'Cheese Sandwich': 7.49
      },
      'drinks': {
        'Fizzy-pop': 6.99
      }
    }
  })
  console.log('sampleGig', sampleGig)

  return (
    <div className='newGigPage dataPage'>
      <h2>This is the New Gig Data Page at path "{pathname}"</h2>
      <p>It submits data to dynamo via apigw + lambda.</p>
      <InfiniNewJsonItemForm
        serverAddress={serverAddress}
        apiPath='gigdata'
        itemType='Gig-Data'
        sampleItem={sampleGig}
      />
    </div>
  )
}

export default NewGigDataPage
