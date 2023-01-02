import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";

import "./App.css";

function App() {
  const viewer = useRef(null);
  const [file, setFile] = useState("");
  const [annots, setAnnotations] = useState([]);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: file,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      annotationManager.addEventListener(
        "annotationChanged",
        (annotations, action) => {
          if (action === "add") {
            annotations.forEach((annot) => {
              if (annot instanceof Annotations.RectangleAnnotation) {
                const rect = annot.getRect();
                rect.X = Math.round(rect.X);
                rect.Y = Math.round(rect.Y);
                rect.Width = Math.round(rect.Width);
                rect.Height = Math.round(rect.Height);

                annot.setRect(rect);
                setAnnotations((annots) => [...annots, annot.getRect()]);
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
  console.log(annots);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Documents</h1>
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
                console.log(localStorage.getItem("x"));
               
              }}
            >
              Title
            </button>
            <button className="author">Author</button>
          </div>
          <div>
            <h2>Boxes</h2>
            {
              annots.map((annot, index) => {
                return (
                  <div key={index}>
                    <p>
                     x: {Math.round(annot.x1)}, 
                    </p>
                    <p>y: {Math.round(annot.y1)}, </p>
                    <p>width:  {Math.round(annot.x2 - annot.x1)}, </p>
                    <p>hight: {Math.round(annot.y2 - annot.y1)}</p>
                  </div>
                );
              })
            }
            <hr />
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
