import { AdminLayout } from 'layouts'
import { ICONS } from 'assets'
import { NOT_FOUND } from 'assets/animations'
import { Empty } from 'components/core'
// import { database } from 'configs'
import { useAppContext } from 'contexts'
import { useFetch, useGET } from 'hooks'
import moment from 'moment'
import { Fragment } from 'react'
import Swal from 'sweetalert2'
import { NotificationType } from 'types'

export default () => {
  const { user } = useAppContext()
  // const [notifications] = useFetch<NotificationType[]>(
  //   `notifications/${user?.uid}`
  // )
  const { data, mutate } = useGET<any[]>(`notification/getall`)
  console.log(data?.success?.data)
  const notifications: any = data?.success?.data
  const deleteAllNotifications = async () => {
    const { value } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
    if (!value) return
    // await database.ref(`notifications/${user?.uid}`).remove()
    Swal.fire('Deleted!', 'Your notifications has been deleted.', 'success')
  }
  return (
    <AdminLayout title="Notifications | Admin Panel" className="bg-white">
      <>
        <section className="px-12 py-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold leading-6 text-gray-800">
              Notifications
            </p>
            {/* <div className="flex items-center gap-2">
              <button className="shadow-md rounded-md bg-green-300 px-4 py-2">
                Read All
              </button>
              <button
                className="shadow-md rounded-md bg-red-300 px-4 py-2"
                onClick={deleteAllNotifications}
              >
                Delete All
              </button>
            </div> */}
          </div>

          {notifications?.length ? (
            <>
              {notifications?.map((item: any, i: any) => (
                // { id, title, message, createdAt, isRead }
                <Fragment key={i}>
                  <div
                    className="shadow hover:shadow-lg mt-4 flex w-full cursor-pointer items-center rounded bg-white p-3 duration-300"
                    // onClick={() => {
                    //   Swal.fire({
                    //     title: title,
                    //     html: message,
                    //     showCloseButton: true,
                    //   })
                    //   database
                    //     .ref(`notifications/${user?.uid}/${id}`)
                    //     .update({ isRead: true })
                    // }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                      <ICONS.Notification className={`h-6 w-6 text-theme `} />
                    </div>
                    <div className="flex w-full items-center justify-between pl-3">
                      <div className="grid w-4/5 gap-2">
                        <p className="font-bold text-primary">{item?.title}</p>
                        <h4 className={`text-lg leading-none text-theme `}>
                          {item?.message}
                        </h4>
                        <p className="text-sm leading-5 text-gray-500">
                          {moment(new Date(item?.createdAt)).fromNow()}
                        </p>
                      </div>
                      {/* <p className="flex cursor-pointer text-xs leading-3">
                        <ICONS.ChevronRight className={`h-6 w-6 text-black`} />
                      </p> */}
                    </div>
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <Empty title={'No notifications yet'} src={NOT_FOUND.src} />
          )}
        </section>
      </>
    </AdminLayout>
  )
}
