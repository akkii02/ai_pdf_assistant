import { useState } from "react";
import styles from "./Navbar.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io"; // Import cross icon
import { CiFileOn } from "react-icons/ci";
import logo from "../../photo/AI Planet Logo.png"

const Navbar = ({ setPdfContent }) => {
    const [pdfName, setPdfName] = useState(null); // To store the PDF name
    const [isUploaded, setIsUploaded] = useState(false); // To show if PDF is uploaded

    const uploadHandler = () => {
        const fileUpload = document.getElementById("fileUpload");
        fileUpload.click(); // Trigger the hidden file input click
    };

    const pdfHandler = async (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Append the file to FormData

            try {
                // Send the file to the server using fetch
                const response = await fetch('https://ai-pdf-backend.vercel.app/upload', {
                    method: 'POST',
                    body: formData, // Send the FormData directly
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); // Parse the JSON response

                // Handle the server response
                if (data.success) {
                    console.log('PDF uploaded and processed:', data.data);

                    // Set the PDF name for the preview
                    setPdfName(file.name);
                    setIsUploaded(true); // Show PDF uploaded message

                    // Use the setPdfContent function to update the pdfContent state in App.js
                    setPdfContent(data.data);
                } else {
                    console.error('Error uploading PDF:', data.message);
                }
            } catch (error) {
                console.error('Error occurred during PDF upload:', error);
            }
        }
    };

    const removePdfHandler = () => {
        setPdfName(null); // Clear the PDF name to remove the preview
        setIsUploaded(false); // Reset the uploaded state
        setPdfContent(null); // Reset the pdfContent in App.js
    };

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img src={logo} alt="img"/>
                </div>
                <div className={styles.uploadSection}>
                    
                    {isUploaded && (
                        <>
                        <span style={{border:"1px solid  #0FA958",padding:"4px",borderRadius:"5px"}}>
                        <CiFileOn color=" #0FA958"/>
                        </span>
                        <div className={styles.pdfUploaded}>
                            <span>PDF Uploaded</span>
                            <IoIosCloseCircleOutline onClick={removePdfHandler} className={styles.removeIcon} />
                        </div>
                        </>
                    )}
                    <button onClick={uploadHandler}>
                        <IoIosAddCircleOutline /> Upload PDF
                    </button>
                    <input onChange={pdfHandler} id="fileUpload" type="file" accept=".pdf" style={{ display: "none" }} />
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
