import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Modals = ({selectedVideo,closeModal}) => {
  
  return (
    <div>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={closeModal} center >
        <video controls autoPlay className="my-5">
          <source
            src={URL.createObjectURL(selectedVideo.file)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </div>
  );
};

export default Modals;
