export const Modal = (props: {
  text: string;
  cancelButtonText: string;
  onConfirm: () => void;
  confirmButtonText: string;
}) => {
  return (
    <div
      className="modal fade"
      id="modal"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body">{props.text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              {props.cancelButtonText}
            </button>
            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={() => props.onConfirm()}
              data-bs-dismiss="modal"
            >
              {props.confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
