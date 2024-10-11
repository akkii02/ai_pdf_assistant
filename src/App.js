import { useState } from "react";
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';

function App() {
  const [pdfContent, setPdfContent] = useState(""); // State to store PDF content

  return (
    <>
      {/* Pass the setPdfContent function to Navbar so it can update the state */}
      <Navbar setPdfContent={setPdfContent} />
      
      {/* Pass the pdfContent to Chat so it can use it */}
      <Chat pdfContent={pdfContent} />
    </>
  );
}

export default App;
