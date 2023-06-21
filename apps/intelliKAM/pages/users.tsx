import React, { useEffect, useState } from 'react'
import Button, { ButtonKind, ButtonSize } from '../common/Button'
import AddUserDialog from '../components/AddUserDialog'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Users() {
  const router = useRouter()
  const [isLtStaff, setIsLtStaff] = useState(false)
  const [userList, setUserList] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const { data: session, status }: any = useSession()

  console.log('session====', session)

  const getUsers = async () => {
    const res = await fetch(
      `/api/userslist?accountNumber=${session.user.account}&userId=${session.user.id}`
    )
    const { data } = await res.json()
    setUserList(data)
  }

  useEffect(() => {
    if (session && status === 'authenticated') {
      getUsers()
      if (router && router.query.hasOwnProperty('account')) {
        setIsLtStaff(false)
      } else {
        setIsLtStaff(true)
      }
    }
  }, [session, status])

  return (
    <div>
      <div className="w-1/2 m-auto pt-5">
        <div className="user-head">
          <h1 className="mb-2">Users</h1>
          <Button
            kind={ButtonKind.primaryCta}
            size={ButtonSize.medium}
            onClick={() => setShowDialog(true)}
          >
            Add User
          </Button>
          <Button
            kind={ButtonKind.primaryCta}
            size={ButtonSize.medium}
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }
          >
            Logout
          </Button>
        </div>
        {isLtStaff ? (
          <table>
            <tr>
              <th>Customer Name</th>
              <th>Account Number</th>
              <th>Number of Users</th>
            </tr>

            {userList.map((user: any, index) => {
              return (
                <tr key={index}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.accountNumber}</td>
                  <td>{user.totalUserCount}</td>
                </tr>
              )
            })}
          </table>
        ) : (
          <table>
            <tr>
              <th>User Name</th>
              <th>email</th>
            </tr>

            {userList.map((user: any, index) => {
              return (
                <tr key={index}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                </tr>
              )
            })}
          </table>
        )}
      </div>
      <AddUserDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      <style>
        {`
        .user-head {
          display:flex;
          justify-content: space-between;
        }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #dddddd;
      }
      `}
      </style>
    </div>
  )
}
