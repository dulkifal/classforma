import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";

import "./App.css";

function App() {
  const viewer = useRef(null);
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("");
  
  const [annots, setAnnotations] = useState(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: file,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      let data = {}
      annotationManager.addEventListener(
        "annotationChanged",
        (annotations, action) => {
          if (action === "add") {
            annotations.forEach((annot) => {
              if (annot instanceof Annotations.RectangleAnnotation) {
                
                data.x = annot.getRect().x1
                data.y = annot.getRect().y1
                data.width = annot.getRect().x2 - annot.getRect().x1
                data.height = annot.getRect().y2 - annot.getRect().y1
                data.label = status

                
                setAnnotations((annots) => [...annots,  data]);
                
               localStorage.setItem('data', JSON.stringify(data))
              }
            });
          }
        }
        );
    });
  }, [file]);

  const LiMap = () => {
    const myArray = [
      {
        name: " Sample document 1.pdf",
        fileUrl: "./pdf/2212.08011.pdf",
      },
      {
        name: " Sample document 2.pdf",
        fileUrl: "./pdf/2212.07937.pdf",
      },
      {
        name: " Sample document 3.pdf",
        fileUrl: "./pdf/2212.07931.pdf",
      },
    ];
    return (
      <ul>
        {myArray.map((item, index) => {
          return (
            <li
              onClick={() => {
                setFile(item.fileUrl);
              }}
              key={index}
            >
              {" "}
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Documents</h1>
        <hr />
        
      </header>
      <main>
        <LiMap />
      </main>
      <div
        className="pdf-container"
        style={{
          width: "100%",
          height: "750px",
        }}
      >
        <div className="left-side">
          <div>
            <h2>Label</h2>
            <hr />
            <button
              className="title"
              onClick={() => {
                setStatus("title");
              }}
            >
              Title
            </button>
            <button
              className="author"
              onClick={() => {
                setStatus("author");
              }}
            >
              Author
            </button>
          </div>
          <div>
            <h2>Boxes</h2>
            <hr />
            {annots.map((annot, index) => {
              return (
                <div key={index} className="boxes">
                  <p>x: {Math.round(annot.x1)},</p>
                  <p>y: {Math.round(annot.y1)}, </p>
                  <p>width: {Math.round(annot.x2 - annot.x1)}, </p>
                  <p>hight: {Math.round(annot.y2 - annot.y1)}</p>
                   {annot.label === "title" ? (
                    <button className="title">Title</button>
                  ) : (
                    <button className="author">Author</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {file && (
          <div className="MyComponent" style={{ width: "100%" }}>
            <div
              className="webviewer"
              ref={viewer}
              style={{ height: "100vh" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
