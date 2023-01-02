import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";

import "./App.css";
 
function App() {
  const viewer = useRef(null);
  const [file, setFile] = useState("");

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
                console.log(annot.getRect());
                // store x and y of rectangle in local storage
                localStorage.setItem("x", annot.getRect().X);
                localStorage.setItem("y", annot.getRect().Y);
              }
            });
            // console x and y of rectangle
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
      {myArray.map((item) => {
        return (
          <li
            onClick={() => {
              setFile(item.fileUrl);
            }}
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
            <button className="title">Title</button>
            <button className="author">Author</button>
          </div>
          <div>
            <h2>Boxes</h2>
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

