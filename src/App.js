import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";

import "./App.css";

function App() {
  const viewer = useRef(null);
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("");
  
  const [annots, setAnnotations] = useState( JSON.parse(localStorage.getItem("annots")) || []);
  localStorage.setItem("annots", JSON.stringify(annots));

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
                
                data = {
                  x: annot.getX(),
                  y: annot.getY(),
                  width: annot.getWidth(),
                  hight: annot.getHeight(),
                  label: status,
                };


                
                setAnnotations(annots => [...annots,  data]);
                
               
              }
            });
          }
        }
        );

        documentViewer.on("documentLoaded", () => {
          annots.forEach((annot) => {
            const rectangle = new Annotations.RectangleAnnotation();
            rectangle.PageNumber = 1;
            rectangle.X = annot.x;
            rectangle.Y = annot.y;
            rectangle.Width = annot.width;
            rectangle.Height = annot.hight;
            rectangle.StrokeColor = new Annotations.Color(0, 255, 0, 3);
            rectangle.Author = "Me";
            rectangle.Label = annot.label;
            annotationManager.addAnnotation(rectangle);
            annotationManager.redrawAnnotation(rectangle);

            annotationManager.selectAnnotation(rectangle);

          });

        });



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
                  <p>x: {Math.round(annot.x)},</p>
                  <p>y: {Math.round(annot.y)}, </p>
                  <p>width: {Math.round(annot.width)}, </p>
                  <p>hight: {Math.round(annot.hight)}</p>
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
