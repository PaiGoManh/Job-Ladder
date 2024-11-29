import React from 'react'

const AddPage = () => {
  return (
    
    
<div
      className="bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/2 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300"
    >
      <form className="space-y-6">
        <h2 className="text-center text-3xl font-bold text-blue-600 mb-8">
          ADD PAGE
        </h2>

        <div className="space-y-2">
          <label for="bookName" className="block text-lg text-blue-700"
            >Book Name:</label >
          <input
            type="text"
            id="bookName"
            placeholder="Enter book name"
            requiblue
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="space-y-2">
          <label for="authorName" className="block text-lg text-blue-700"
            >Author Name:</label>
          <input
            type="text"
            id="authorName"
            placeholder="Enter author name"
            requiblue
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="space-y-2">
          <label for="chooseBook" className="block text-lg text-blue-700"
            >Choose ITEM:</label >
          <input
            type="file"
            id="chooseBook"
            requiblue
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="space-y-2">
          <label for="description" className="block text-lg text-blue-700"
            >Description:</label>
          <textarea
            id="description"
            placeholder="Enter book description"
            requiblue
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-32"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Add Book"
            className="bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
          />
        </div>
      </form>
    </div>










  )
}

export default AddPage