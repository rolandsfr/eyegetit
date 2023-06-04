import styled from "styled-components";
import { useModal } from "../Modal/Modal";

const ModalWrapper = styled.div`
  .add-image-container {
    display: flex;
    gap: 2em;

    .option {
      background: #ffffff;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      padding: 2em;

      p {
        max-width: 100px;
        line-height: 1.3;
      }
    }
  }

  .gen-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3em;

    .row {
      display: flex;

      .slots {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-items: stretch;
        gap: 2em;
      }

      .slots div,
      .upload-img {
        background: #ffffff;
        box-shadow: inset 3px 3px 6px 1px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        width: 100px;
        height: 100px;
      }

      .upload-img {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 1.4rem;
        margin-left: 2em;
        cursor: pointer p {
          max-width: 50px;
        }
      }
    }

    input {
      background: #ffffff;
      box-shadow: inset 3px 3px 12px 1px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      border: none;
      outline: none;
      padding: 1em;
      width: 300px;
      margin: 0 auto;
    }

    .buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        background: #e1e1e1;
        border-radius: 10px;
        border: none;
        outline: none;
        padding: 0.8em 2em;
        font-size: 1.6rem;
      }

      .disabled {
        color: #a2a2a2;
        background: #ebebeb;
      }
    }
  }
`;

const useAddImageModal = () => {
  let openModalF: any = null;

  const AddImageModal: React.FC<{
    modalAction: "upload" | "generate" | null;
  }> = ({ modalAction }) => {
    const { Modal, closeModal, openModal } = useModal();
    openModalF = openModal;

    return (
      <ModalWrapper>
        <Modal>
          {modalAction === null ? (
            <div>
              <div className="gen-image">
                <div className="row">
                  <div className="slots">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="upload-img">
                    <p>Upload your image</p>
                  </div>
                </div>
                <input type="text" placeholder="Type your word here" />
                <div className="buttons">
                  <button className="gen">Generate</button>
                  <button className="clear disabled">Clear</button>
                </div>
              </div>
            </div>
          ) : modalAction === "upload" ? (
            <div className="add-image-container">
              <div className="option">
                <p>Upload image from storage</p>
              </div>
              <div className="option">
                <p>Capture image with camera</p>
              </div>
            </div>
          ) : null}
        </Modal>
      </ModalWrapper>
    );
  };

  return {
    AddImageModal,
    openModal: openModalF,
  };
};

export default useAddImageModal;
