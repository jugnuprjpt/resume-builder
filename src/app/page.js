import Image from 'next/image'
import React from 'react'
import landingImage from '../assets/landing-img.svg'

function page() {
  return (
    <>
      <section>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              <Image
                src={landingImage}
                height={1000}
                width={1000}
              />
            </div>
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">Create your Resume Faster then Ever</h2>
              <p className="leading-relaxed mb-8"> Leverage cutting-edge technology to expedite the resume-building process. Utilizing advanced language processing and customization capabilities, generate a professional and tailored resume faster than ever before. Streamline your job application journey with precision and speed, ensuring a standout representation of your skills and experiences.</p>

              <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2">Create Now</button>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default page
