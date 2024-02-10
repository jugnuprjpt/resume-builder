'use client'
import React from 'react'
import DownloadIcon from "../../assets/download-icon.svg";
import html2pdf from "html2pdf.js";
import Image from "next/image";

const DownloadResume = () => {
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
    return (
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
    )
}

export default DownloadResume