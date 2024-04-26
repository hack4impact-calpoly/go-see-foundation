import React from 'react';
import styles from './UploadImage.module.css';

interface ImageUploadButtonProps {
  onChange: (files: FileList | null) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onChange }) => {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files);
    }
  };

  return (
    <label className={styles['image-upload-button']}>
      Upload Image
      <input
        type="file"
        accept="image/*"
        className={styles['file-input']} // You can define additional styles for the input if needed
        onChange={handleFileInputChange}
      />
    </label>
  );
};

export default ImageUploadButton;
