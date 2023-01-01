import {useEffect, useRef} from 'react';
import WebViewer from '@pdftron/webviewer'

const MyComponent = ({file}) => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc:  file,
      },
      viewer.current,
    ).then((instance) => {
       
 
     
    });
  }, []);

  



  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    </div>
  );
};

export default MyComponent;