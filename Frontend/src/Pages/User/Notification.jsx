import React from 'react'

const Notification = () => {
  return (
    <div>
        <div
      class="mx-auto mt-40 mb-4 p-4 bg-gradient-to-r from-blue-400 to-blue-800 rounded-lg shadow-lg ml-10 mr-10"
    >
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-blue-300">
          Your Notifications
        </h2>
        <p class="mt-2 text-blue-200 font-semibold">
          Manage your notifications below.
        </p>
      </div>

      <div class="mt-8 ml-10 mr-10">
        <ul id="notificationList" class="space-y-4">
          <li
            class="flex justify-between items-center bg-gradient-to-l from-blue-600 to-blue-700 p-4 rounded-md shadow"
            data-status="unread"
          >
            <div>
              <h3 class="text-xl font-bold">New Job Alert!</h3>
              <p>Frontend Developer position available at Tech Solutions.</p>
              <p class="text-blue-300 text-sm">Unread</p>
            </div>
            <div class="space-x-4">
              <button
                class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onclick="markAsRead(this)"
              >
                READ
              </button>
              <button
                class="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:scale-110 transition-transform duration-300"
                onclick="deleteNotification(this)"
              >
                DELETE
              </button>
            </div>
          </li>

          <li
            class="flex justify-between items-center bg-gradient-to-l from-blue-600 to-blue-700 p-4 rounded-md shadow"
            data-status="unread"
          >
            <div>
              <h3 class="text-xl font-bold">Application Status</h3>
              <p>Your application for Backend Engineer is under review.</p>
              <p class="text-blue-300 text-sm">Unread</p>
            </div>
            <div class="space-x-4">
              <button
                class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onclick="markAsRead(this)"
              >
                READ
              </button>
              <button
                class="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:scale-110 transition-transform duration-300"
                onclick="deleteNotification(this)"
              >
                DELETE
              </button>
            </div>
          </li>

          <li
            class="flex justify-between items-center bg-gradient-to-l from-blue-600 to-blue-700 p-4 rounded-md shadow"
            data-status="unread"
          >
            <div>
              <h3 class="text-xl font-bold">Job Interview Scheduled</h3>
              <p>Interview for UI/UX Designer scheduled for Oct 24th.</p>
              <p class="text-blue-300 text-sm">Unread</p>
            </div>
            <div class="space-x-4">
              <button
                class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onclick="markAsRead(this)"
              >
                READ
              </button>
              <button
                class="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:scale-110 transition-transform duration-300"
                onclick="deleteNotification(this)"
              >
                DELETE
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Notification