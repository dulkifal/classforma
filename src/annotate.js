import { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const MyComponent = ({ file }) => {
  const viewer = useRef(null);
  useEffect(() => {
   
   

    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "./pdf/2212.07931.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      
  documentViewer.addEventListener('annotationsLoaded', () => {
      const annot = new Annotations.RectangleAnnotation({
        PageNumber: 1,
        X: 100,
        Y: 50,
        Width: 150,
        Height: 55,
        StrokeColor: new Annotations.Color(0, 255, 0, 1), 
        Author : "dulkifal"
      });
       annotationManager.addAnnotation(annot);
      annotationManager.redrawAnnotation(annot);
    });
  });
  }, [ ]);


  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
};

export default MyComponent;
