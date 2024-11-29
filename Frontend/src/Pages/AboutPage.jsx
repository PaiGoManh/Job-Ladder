import React from 'react';
import Footer1 from '../Components/Footer1';

const AboutPage = () => {
  return (
    <>
    <div>
      <header className="bg-blue-600 text-white py-6">
        <nav className="mx-auto flex justify-between items-center">
          <img
            style={{ width: '200px', height: '150px', paddingLeft: '50px' }}
            src="/src/Images/JOB LADDER.jpg"
            alt="Job Ladder Logo"
          />
          <a
            href="#"
            className="animate-bounce mr-96 text-5xl font-extrabold text-white"
          >
            JOB LADDER
          </a>
          <ul className="flex items-center">
            <li>
              <a
                href="/signup"
                className="font-extrabold text-3xl mr-20"
              >
                JOIN JOB LADDER
              </a>
            </li>
          </ul>
        </nav>
      </header>
    
    </div>
  <br />
    

    <Footer1/>


    </>
    
  );
};

export default AboutPage;
