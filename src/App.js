import { useState } from "react";
// import ShowPdf from "./showpdf";

//  import Default class form annotate
import Annote from "./annotate";




import "./App.css";
function App() {
  const [sam, setFile] = useState("");

  const [page, setPage] = useState(1);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Documents</h1>
      </header>
      <main>
        <ul>
          <li
            onClick={() => {
              setFile("./pdf/2212.08011.pdf");
            }}
          >
            {" "}
            Sample document 1.pdf
          </li>
          <li
            onClick={() => {
              setFile("./pdf/2212.07937.pdf");
            }}
          >
            {" "}
            Sample document 2.pdf
          </li>
          <li
            onClick={() => {
              setFile("./pdf/2212.07931.pdf");
            }}
          >
            {" "}
            Sample document 3.pdf
          </li>
        </ul>
      </main>
      <div className="pdf-container"
        style={{
          width: "100%",
          height: "750px",
        }}
      >
        <div className="left-side">
          <div>
            <h2>Label</h2>
            <hr />

           <h3 className="title">Title</h3>

           <h3 className="author">Author</h3>


          </div>
          <div >
            <h2>Boxes</h2>
            <hr />

          </div>

        </div>

        {/* {sam && <ShowPdf file={sam} />} */}
       
      </div>
        {sam && <Annote file={sam} />}
    </div>
  );
}

export default App;
