import { useEffect, useState } from 'react'
import { pingApi } from '../apis/api-utils'

const stackName = process.env.VITE_STACK_NAME || 'NO_GIGS_STACK_NAME'

type HomePageProps = {
  serverAddress: string,
}

const HomePage = ({ serverAddress }: HomePageProps) => {

  const [ success, setSuccess ] = useState(false)
  useEffect(() => {
    pingApi(serverAddress, 'healthcheck')
      .then(() => {
        setSuccess(true)
      })
      .catch((e) => {
        console.error(e)
        setSuccess(false)
      })
  }, [ serverAddress ])

  return (
    <div className='homePage dataPage'>
      <h2>Welcome to {stackName}!</h2>
      <h2>Your one-stop gig shop!</h2>
      <p>Server: {serverAddress}</p>
      <p>This app is static react from S3. The healthcheck is via apigw + lambda.</p>
      <p className='home-page-health'>Healthcheck:&nbsp;
        <span className={`healthcheck-${success}`}>{success ? 'SUCCESS' : 'FAILED'}</span>
      </p>
    </div>
  )
}

export default HomePage
