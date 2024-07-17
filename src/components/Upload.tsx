import React from 'react';
import UploadWidget from './UploadWidget';

interface UploadProps {
  onUpload: (error: any, result: any) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  return (
    <UploadWidget onUpload={onUpload} />
  );
};

export default Upload;
