import styles from "./Navbar.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";

const Navbar = ({ setPdfContent }) => { // Receiving setPdfContent as a prop

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
                const response = await fetch('http://localhost:3001/upload', {
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

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    Logo
                </div>
                <div>
                    <button onClick={uploadHandler}><IoIosAddCircleOutline /> Upload PDF</button>
                    <input onChange={pdfHandler} id="fileUpload" type="file" accept=".pdf" style={{ display: "none" }} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
