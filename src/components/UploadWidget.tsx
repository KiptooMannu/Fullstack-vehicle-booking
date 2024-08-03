import React, { useEffect, useRef } from 'react';
//initialize cloudinary
let cloudinary: any;

//prop type
interface UploadWidgetProps {
  onUpload: (error: any, result: any) => void;
}


//func to upload widget
const UploadWidget: React.FC<UploadWidgetProps> = ({ onUpload }) => {
  const widget = useRef<any>();

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = (window as any).cloudinary;
    }

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
  }, []);

  function createWidget() {
    const cloudName = '';
    const uploadPreset = '';

    if (!cloudName || !uploadPreset) {
      console.warn('Kindly ensure you have the cloudName and UploadPreset setup in your .env file at the root of your project.');
    }

    const options = {
      cloudName,
      uploadPreset,
    };

    return cloudinary?.createUploadWidget(
      options,
      (error: any, result: any) => {
        if ((error || result.event === 'success') && typeof onUpload === 'function') {
          onUpload(error, result);
        }
      }
    );
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return <button className="btn btn-primary" onClick={open}>+</button>;
};

export default UploadWidget;
