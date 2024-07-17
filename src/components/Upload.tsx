import React, { useState, useEffect, useRef, ReactNode } from 'react';

let cloudinary: any;

interface UploadWidgetProps {
  children: ({ cloudinary, widget, open }: { cloudinary: any; widget: React.MutableRefObject<any>; open: () => void }) => ReactNode;
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
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`);
    }

    const options = {
      cloudName,
      uploadPreset,
    };

    return cloudinary?.createUploadWidget(
      options,
      function (error: any, result: any) {
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

  return <>{children({ cloudinary, widget, open })}</>;
};

const Upload: React.FC = () => {
  const [url, updateUrl] = useState<string | undefined>(undefined);
  const [error, updateError] = useState<string | undefined>(undefined);

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      updateError(error.message);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  };

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">React &amp; Cloudinary Upload Widget</h1>
      </div>

      <div className="container">
        <h2>Unsigned with Upload Preset</h2>
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              open();
            };
            return <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </UploadWidget>

        {error && <p>{error}</p>}

        {url && (
          <>
            <p>
              <img src={url} alt="Uploaded resource" />
            </p>
            <p>{url}</p>
          </>
        )}
      </div>

      <div className="container">
        <h2>Resources</h2>
        
      </div>
    </main>
  );
};

export default Upload;
