"use client";
import React from "react";
import html2pdf from "html2pdf.js";
import email from "../../assets/email.svg";
import call from "../../assets/call.svg";
import Image from "next/image";
import DownloadIcon from "../../assets/download-icon.svg";
import useGetUserInfo from "../hooks/getUserInfo";
import PageLoader from "../component/PageLoader";

const page = () => {
  const {
    userDetails: { details: userInfo },
    loading,
  } = useGetUserInfo();

  // ---------------- download function-------------

  const convertToPdf = async () => {
    const element = document.getElementById("pdf-content");
    const pdfOptions = {
      margin: 0,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    await html2pdf().from(element).set(pdfOptions).save();
  };

  // -----------------------------------------------------------

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="bg-gray-100 p-4" id="pdf-content">
          <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
            {/* <!-- Heading start --> */}

            <div
              className="flex rounded-t-lg bg-[#8e4d57] sm:px-2 w-full"
              id="pdf-content"
            >
              <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3"></div>

              <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl text-white">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
                <p className="text-heading text-white p-2 text-2xl">
                  {userInfo?.role}
                </p>
              </div>
            </div>

            {/* <!-- Heading End --> */}

            {/* {/* {/* --------------------------------------------------------------- */}

            {/* <!-- main content --> */}

            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:mt-10">
                <div className="flex flex-col sm:w-1/3">
                  {/* <!-- My contact --> */}

                  <div className="py-3 sm:order-none order-3">
                    <h2 className="font-poppins font-bold text-top-color text-xl">
                      My Contact
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div>
                      <div className="flex items-center my-1">
                        <a className="w-6 text-gray-700 hover:text-orange-600">
                          <Image
                            src={email}
                            height={18}
                            width={18}
                            alt="email"
                          />
                        </a>
                        <div className="ml-2 truncate text-lg p-2">
                          {userInfo?.email}
                        </div>
                      </div>
                      <div className="flex items-center my-1 ">
                        <a className="w-6 text-gray-700 hover:text-orange-600">
                          <Image src={call} height={18} width={18} alt="call" />
                        </a>
                        <div className="text-lg ml-1 p-2">
                          {userInfo?.mobileNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------------------------- */}

                  {/* <!-- Skills --> */}

                  <div className="py-3 sm:order-none order-2">
                    <h2 className="text-xl font-poppins font-bold text-top-color">
                      Skills
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    {userInfo?.skills?.map((item, i) => (
                      <div className="ml-2" key={i}>
                        {item?.skillName}
                      </div>
                    ))}
                  </div>

                  {/* ------------------------------------------------------------------------------- */}

                  {/* <!-- Education Background --> */}

                  <div className="py-3 sm:order-none order-1">
                    <h2 className="text-xl font-poppins font-bold text-top-color">
                      Education Background
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col space-y-1">
                      {userInfo?.education?.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <p className="text-sm font-medium">
                            <span className="text-green-700 text-lg p-0">
                              {item?.schoolName}
                            </span>
                          </p>
                          <p className="text-lg font-medium p-0">
                            <span>{item?.degree}</span>
                          </p>
                          <p className="font-bold text-lg text-gray-700 mb-2 p-0">
                            {item?.startDate} to {item?.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------------------------- */}

                <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
                  {/* <!-- About me --> */}

                  <div className="py-3">
                    <h2 className="text-xl font-poppins font-bold text-top-color">
                      About Me
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>
                    <p className="text-lg">{userInfo?.aboutMe}</p>
                  </div>

                  {/* ------------------------------------------------------------------------------- */}

                  {/* <!-- Professional Experience --> */}

                  <div className="py-3">
                    <h2 className="text-xl font-poppins font-bold text-top-color">
                      Professional Experience
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col">
                      {userInfo?.experience?.map((item, i) => (
                        <div className="flex flex-col" key={i}>
                          <p className="text-lg font-bold text-gray-700">
                            {item?.companyName}
                          </p>
                          <p className="font-semibold text-lg text-gray-700 mt-2 mb-1">
                            {item?.jobTitle}
                          </p>
                          <p className="font-semibold text-lg text-gray-700">
                            {item?.startDate} to {item?.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ------------------------------------------------------------------------------- */}

                  {/* <!-- Projects --> */}

                  <div className="py-3">
                    <h2 className="text-xl font-poppins font-bold text-top-color">
                      Projects
                    </h2>
                    <div className="border-2 w-20 border-top-color my-3"></div>

                    <div className="flex flex-col">
                      {userInfo?.project?.map((item, i) => (
                        <div className="flex flex-col" key={i}>
                          <p className="text-lg font-semibold text-gray-700">
                            {item?.title}
                          </p>
                          <p className="font-normal text-lg text-gray-700 mb-1 pl-2">
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
