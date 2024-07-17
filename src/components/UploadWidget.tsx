import React, { useState, useEffect, useRef, ReactNode } from 'react';

let cloudinary: any;

interface UploadWidgetProps {
  children: ReactNode;
  onUpload?: (error: any, result: any, widget: React.MutableRefObject<any>) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ children, onUpload }) => {
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
    const cloudName = 'dlqbpndde';
    const uploadPreset = 'daniel';

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
          onUpload(error, result, widget);
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

  return (
    <>
      {children}
      <button className="btn btn-primary" onClick={open}>Add</button>
    </>
  );
};

export default UploadWidget;
