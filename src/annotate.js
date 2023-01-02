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
      const { docViewer,  Annotations} = instance;
      const annotManager = docViewer.getAnnotationManager()

      docViewer.on("documentLoaded", () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation();
        rectangleAnnot.PageNumber = 1;

        rectangleAnnot.x = 100;
        rectangleAnnot.y = 150;
        rectangleAnnot.width = 200;
        rectangleAnnot.height = 50;
        rectangleAnnot.Author = annotManager.getCurrentUser();

        annotManager.addAnnotation(rectangleAnnot);

        annotManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
};

export default MyComponent;
