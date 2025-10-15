import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="prose mx-auto text-left">
      <h1>Welcome to Jarurat Care</h1>
      <p>
        Jarurat Care is a simple patient records dashboard demo. Use the Patients page to
        view, search and add patient records. This project uses React, Redux Toolkit and Tailwind for styling.
      </p>
      <p>
        <Link to="/patients" className="text-blue-600">Go to Patients →</Link>
      </p>
    </div>
  )
}

export default Home
