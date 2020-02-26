import React from 'react';
import ImageUploader from "react-images-upload";
import { X } from 'react-feather';
import FlatButton from 'material-ui/FlatButton';
import {Card} from 'material-ui/Card';

const ImageUploadDialog = (props) => {
  const { onDrop, closeImageUploadDialog, handleInput, fileUploadMessage, sendFile } = props;

  return (
    <div className="dialog-container">
      <Card>
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
            <FlatButton fullWidth={true} type="submit" className="submit-btn" label="Upload"/>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default ImageUploadDialog;