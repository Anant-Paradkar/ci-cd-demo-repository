/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import InfiniNewItemForm from './InfiniNewItemForm'

type NewUserPageProps = {
  serverAddress: string,
}

const NewUserPage = ({ serverAddress }: NewUserPageProps) => {
  const { pathname } = useLocation()

  const userFields = [ 'user_name', 'user_address' ]
  const sampleUser = {
    user_name: 'Mark',
    user_address: 'Leeds LS11'
  }

  return (
    <div className='newUserPage dataPage'>
      <h2>This is the New User Page at path "{pathname}"</h2>
      <p>It submits data to postgres via apigw + lambda.</p>
      <InfiniNewItemForm
        serverAddress={serverAddress}
        apiPath='users'
        itemType='User'
        fieldList={userFields}
        sampleItem={sampleUser}
      />
    </div>
  )
}

export default NewUserPage
