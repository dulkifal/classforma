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
        initialDoc:  file,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      
 annotationManager.addEventListener('annotationChanged', (annotations, action) => {
      if (action === 'add') {
        annotations.forEach(annot => {
          if (annot instanceof Annotations.RectangleAnnotation) {
            const rect = annot.getRect();
            rect.X = Math.round(rect.X);
            rect.Y = Math.round(rect.Y);
            rect.Width = Math.round(rect.Width);
            rect.Height = Math.round(rect.Height);

            annot.setRect(rect);
            console.log(annot.getRect());
            // store x and y of rectangle in local storage
            localStorage.setItem('x', annot.getRect().X);
            localStorage.setItem('y', annot.getRect().Y);

          }
        });
        // console x and y of rectangle

      }
    });
    });

  
  }, [file ]);


  
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

        {file &&
         <div className="MyComponent" style={{ width: "100%"   }}>
      
      <div className="webviewer" ref={viewer} style={{ height: "100vh"   }}></div>
    </div>
        }
       
      </div>
         
    </div>
  );
}

export default App;
