"use client";
import React from "react";
import html2pdf from "html2pdf.js";
import LinkedIcon from "../../assets/linked.svg";
import Image from "next/image";
import DownloadIcon from "../../assets/download-icon.svg";
import useGetUserInfo from "../hooks/getUserInfo";
import PageLoader from "../component/PageLoader";

const page = () => {
  const {
    userDetails: { details: userInfo },
    loading,
  } = useGetUserInfo();

  const convertToPdf = async () => {
    const element = document.getElementById("pdf-content"); // Replace 'pdf-content' with the ID of the HTML element you want to convert
    const pdfOptions = {
      margin: 0,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // html2pdf(element, pdfOptions);
    await html2pdf().from(element).set(pdfOptions).save();
  };
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="bg-gray-100 p-4" id="pdf-content">
          <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
            {/* <!-- top content --> */}
            <div
              className="flex rounded-t-lg bg-[#8e4d57] sm:px-2 w-full"
              id="pdf-content"
            >
              <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                {/* <img src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo" /> */}
              </div>

              <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl text-white">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
                <p className="text-heading text-white">{userInfo?.role}</p>
              </div>
            </div>

            {/* <!-- main content --> */}
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:mt-10">
                <div className="flex flex-col sm:w-1/3">
                  {/* <!-- My contact --> */}
                  <div className="py-3 sm:order-none order-3">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      My Contact
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div>
                      <div className="flex items-center my-1">
                        <a className="w-6 text-gray-700 hover:text-orange-600">
                          <Image
                            src={LinkedIcon}
                            height={14}
                            width={14}
                            alt="linkedIcon"
                          />
                        </a>
                        <div className="ml-2 truncate">{userInfo?.email}</div>
                      </div>
                      <div className="flex items-center my-1">
                        <a
                          className="w-6 text-gray-700 hover:text-orange-600"
                          aria-label="Visit TrendyMinds YouTube"
                          href=""
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="h-4"
                          >
                            <path
                              fill="currentColor"
                              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                            ></path>
                          </svg>
                        </a>
                        <div>{userInfo?.mobileNumber}</div>
                      </div>
                      <div className="flex items-center my-1">
                        <a
                          className="w-6 text-gray-700 hover:text-orange-600"
                          aria-label="Visit TrendyMinds Facebook"
                          href=""
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="h-4"
                          >
                            <path
                              fill="currentColor"
                              d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                            ></path>
                          </svg>
                        </a>
                        <div>sale galli latur</div>
                      </div>
                      <div className="flex items-center my-1">
                        <a
                          className="w-6 text-gray-700 hover:text-orange-600"
                          aria-label="Visit TrendyMinds Twitter"
                          href=""
                          target="_blank"
                        >
                          <svg
                            className="h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                            ></path>
                          </svg>
                        </a>
                        <div>amitpachange21</div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Skills --> */}
                  <div className="py-3 sm:order-none order-2">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      Skills
                    </h2>
                    <div className="border-2 w-20 border-top-color mb-2"></div>

                    {userInfo?.skills?.map((item, i) => (
                      <div className="ml-2" key={i}>
                        {item?.skillName}
                      </div>
                    ))}
                  </div>

                  {/* <!-- Education Background --> */}
                  <div className="py-3 sm:order-none order-1">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      Education Background
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col space-y-1">
                      {userInfo?.education?.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <p className="text-sm font-medium">
                            <span className="text-green-700">
                              {item?.schoolName}
                            </span>
                          </p>
                          <p className="text-sm font-medium">
                            <span>{item?.degree}</span>
                          </p>
                          <p className="font-bold text-xs text-gray-700 mb-2">
                            {item?.startDate} to {item?.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
                  {/* <!-- About me --> */}
                  <div className="py-3">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      About Me
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>
                    <p>{userInfo?.aboutMe}</p>
                  </div>

                  {/* <!-- Professional Experience --> */}
                  <div className="py-3">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      Professional Experience
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col">
                      {userInfo?.experience?.map((item, i) => (
                        <div className="flex flex-col" key={i}>
                          <p className="text-lg font-bold text-gray-700">
                            {item?.companyName}
                          </p>
                          <p className="font-semibold text-sm text-gray-700 mt-2 mb-1">
                            {item?.jobTitle}
                          </p>
                          <p className="font-semibold text-sm text-gray-700">
                            {item?.startDate} to {item?.endDate}
                          </p>

                          {/* <ul className="text-sm list-disc pl-4 space-y-1">
                          <li>Working on customer facing product</li>
                          <li>Deliverying highly efficient solutions</li>
                          <li>Solving critical bugs</li>
                        </ul> */}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <!-- Projects --> */}
                  <div className="py-3">
                    <h2 className="text-lg font-poppins font-bold text-top-color">
                      Projects
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col">
                      {userInfo?.project?.map((item, i) => (
                        <div className="flex flex-col" key={i}>
                          <p className="text-lg font-semibold text-gray-700">
                            {item?.title}
                          </p>
                          <p className="font-normal text-sm text-gray-700 mb-1 pl-2">
                            {item?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={convertToPdf}
            className="bg-red-500 p-4 h-50 w-50 rounded-full fixed right-4 bottom-4"
          >
            <Image
              src={DownloadIcon}
              height={20}
              width={20}
              alt="DownloadIcon"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default page;
