/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItems } from '../apis/api-utils'
import InfiniList from './InfiniList'

type GigDataPageProps = {
  serverAddress: string,
}

type GigData = { Loading: 'Please wait...' }
  | { Error: 'Failed to fetch' }
  | { Warning: 'No data found' }
  | {
    gig_id: number,
    location: string,
    data: any,
  }

const loadingDefault: GigData = { Loading: 'Please wait...' }
const warningDefault: GigData = { Warning: 'No data found' }
const errorDefault: GigData = { Error: 'Failed to fetch' }

const GigDataPage = ({ serverAddress }: GigDataPageProps) => {
  const { pathname } = useLocation()

  const [currentGigData, setGigData] = useState<Array<GigData>>([loadingDefault])
  useEffect(() => {
    getItems(serverAddress, 'gigdata')
      .then((gigsDataItems) => {
        if (gigsDataItems.Items.length) {
          setGigData(gigsDataItems.Items)
        } else {
          setGigData([warningDefault])
        }
      })
      .catch((e) => {
        setGigData([errorDefault])
      })
  }, [])

  return (
    <div className='gigdataPage dataPage'>
      <h2>This is the Gigs Data Page at path "{pathname}"</h2>
      <p>The data is from dynamo via apigw + lambda</p>
      <InfiniList
        listOfItems={currentGigData}
        listName='gigdata'
        idKey='gig_id' />
    </div>
  )
}

export default GigDataPage
