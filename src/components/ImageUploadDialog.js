import React from 'react';
    import ImageUploader from "react-images-upload";
    import { X } from 'react-feather';

    const ImageUploadDialog = (props) => {
      const { onDrop, closeImageUploadDialog, handleInput, fileUploadMessage, sendFile } = props;

      return (
        <div className="dialog-container">
          <div className="file-dialog">
            <header>
              <h4>Upload an image</h4>
              <button onClick={closeImageUploadDialog} className="btn">
                <X></X>
              </button>
            </header>
            <form onSubmit={sendFile}>
              <input placeholder="Add a message about this image" type="text" onChange={handleInput} value={fileUploadMessage} name="fileUploadMessage" />
              <ImageUploader
                withIcon={false}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
              />
              <button type="submit" className="submit-btn">Upload</button>
            </form>
          </div>
        </div>
      )
    }

    export default ImageUploadDialog;