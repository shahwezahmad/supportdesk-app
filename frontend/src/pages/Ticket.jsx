import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import {
  getNotes,
  reset as noteReset,
  createNote,
} from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
const customStyles = {
  content: {
    width: "600px",
    height: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isError, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: noteLoading } = useSelector((state) => state.note);
  console.log(notes);
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();
  console.log(ticketId);
  useEffect(() => {
    if (isError) {
      toast.error("not able to show ticket detail");
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [ticketId, isError, message, dispatch]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("ticket has closed");
    navigate("/tickets");
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    if (noteText) {
      dispatch(createNote({ noteText, ticketId }));
      closeModal();
    }
  };

  if (isLoading || noteLoading) {
    return <Spinner />;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket?._id}{" "}
          <span className={`status status-${ticket?.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          {/* Date Submitted : {new Date(ticket?.createdAt).toLocaleString("en-US")} */}
        </h3>
        <h3>Product: {ticket?.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={isModelOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button onClick={closeModal} className="btn-close">
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              name="noteText"
              id="noteText"
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className={`btn btn-block btn-danger`}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
