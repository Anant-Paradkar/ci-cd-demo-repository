/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItems } from '../apis/api-utils'
import InfiniList from './InfiniList'

type UsersPageProps = {
  serverAddress: string,
}

type User = { Loading: 'Please wait...' }
  | { Error: 'Failed to fetch' }
  | {
    id: number,
    user_name: string,
    user_address: string
  }

const loadingDefault: User = { Loading: 'Please wait...' }
const errorDefault: User = { Error: 'Failed to fetch' }

const UsersPage = ({ serverAddress }: UsersPageProps) => {
  const { pathname } = useLocation()
  const [currentUsers, setUsers] = useState<Array<User>>([loadingDefault])

  useEffect(() => {
    getItems(serverAddress, 'users')
      .then((usersList) => {
        setUsers(usersList)
      })
      .catch((e) => {
        setUsers([errorDefault])
      })
  }, [])

  return (
    <div className='usersPage dataPage'>
      <h2>This is the Users Page at path "{pathname}"</h2>
      <InfiniList
        listOfItems={currentUsers}
        listName='users'
        idKey='id' />
    </div>
  )
}

export default UsersPage
