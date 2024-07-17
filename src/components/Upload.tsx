import React from 'react';
import UploadWidget from './UploadWidget';

interface UploadProps {
  onUpload: (error: any, result: any) => void;
  children: ({ open }: { open: () => void }) => React.ReactNode;
}

const Upload: React.FC<UploadProps> = ({ onUpload, children }) => {
  return (
    <UploadWidget onUpload={onUpload}>
      {({ open }) => (
        <>
          {children({ open })}
        </>
      )}
    </UploadWidget>
  );
};

export default Upload;
