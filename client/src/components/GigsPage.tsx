/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItems } from '../apis/api-utils'
import InfiniList from './InfiniList'

type GigsPageProps = {
  serverAddress: string,
  flyersAddress: string,
}

type Gig = {
  id: number,
  location: string,
  artist: string,
  date_time: string,
}
type LoadingDefaultType = { Loading: 'Please wait...' }
const loadingDefault: LoadingDefaultType = { Loading: 'Please wait...' }
type ErrorDefaultType = { Error: 'Failed to fetch' }
const errorDefault: ErrorDefaultType = { Error: 'Failed to fetch' }

type GigPageData = Gig | LoadingDefaultType | ErrorDefaultType

const isGig = (candidate: GigPageData): candidate is Gig => (candidate as any)['location']

const GigsPage = ({ serverAddress, flyersAddress }: GigsPageProps) => {
  const { pathname } = useLocation()

  const [currentGigs, setGigs] = useState<Array<GigPageData>>([loadingDefault])
  useEffect(() => {
    getItems(serverAddress, 'gigs')
      .then((gigsList) => {
        setGigs(gigsList)
      })
      .catch((e) => {
        setGigs([errorDefault])
      })
  }, [])

  return (
    <div className='gigsPage dataPage'>
      <h2>This is the Gigs Page at path "{pathname}"</h2>
      <p>The data is from postgres via apigw + lambda. The flyers are in a separate s3 bucket.</p>
      <InfiniList
        listOfItems={currentGigs}
        listName='gigs'
        idKey='id'
        addFlyerLink={currentGigs && currentGigs.length && isGig(currentGigs[0]) ? true : false}
        flyersAddress={flyersAddress} />
    </div>
  )
}

export default GigsPage
