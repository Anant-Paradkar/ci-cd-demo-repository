/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { getItems } from '../apis/api-utils'
import InfiniList from './InfiniList'

type GigDataByIdPageProps = {
  serverAddress: string,
}

type GigData = { Loading: 'Please wait...', gig_id: -1, }
  | { Error: 'Failed to fetch', gig_id: -1, }
  | { Warning: 'No data found', gig_id: -1, }
  | {
    gig_id: number,
    location?: string,
    data?: any,
  }

const formDefault: GigData = { gig_id: 1, }
const warningDefault: GigData = { Warning: 'No data found', gig_id: -1, }
const errorDefault: GigData = { Error: 'Failed to fetch', gig_id: -1, }

const GigDataByIdPage = ({ serverAddress }: GigDataByIdPageProps) => {
  const { pathname } = useLocation()

  const [formData, setFormData] = useState<GigData>(formDefault)
  const [gigData, setGigData] = useState<Array<GigData>>([])

  const isValid = (data: GigData) => data && data.gig_id && data.gig_id > 0

  const handleGet = () => {
    const gigsUrl = `gigdatabyid/${formData.gig_id}`
    getItems(serverAddress, gigsUrl)
      .then((returnedData) => {
        console.log('gigdatabyid returnedData=', returnedData)
        if (returnedData.Item) {
          setGigData([returnedData.Item])
        } else {
          setGigData([warningDefault])
        }
      })
      .catch((e) => {
        setGigData([errorDefault])
      })
  }

  return (
    <div className='gigdataPage dataPage'>
      <h2>This is the Gigs Data By Id Page at path "{pathname}"</h2>
      <p>The data is from dynamo via apigw + lambda</p>
      <label htmlFor='input-json'>Json:</label>
      &nbsp;
      <input id='input-json'
        defaultValue={formData.gig_id}
        className={isValid(formData) ? 'formValid' : 'formInvalid'}
        onChange={(event) => {
          const idNumber = parseInt(event.target.value)
          if (!isNaN(idNumber)) {
            const newData: GigData = { gig_id: parseInt(event.target.value) }
            setFormData(newData)
          }
        }}
      />
      <button onClick={handleGet} className='newItemButton'>Get Gig-Data</button>
      <p>Result:</p>
      {gigData && gigData.length
        ? <InfiniList
          listOfItems={gigData}
          listName='gig-data'
          idKey='gig_id' />
        : 'NO_DATA'}
    </div>
  )
}

export default GigDataByIdPage
