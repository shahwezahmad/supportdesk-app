import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  //   const [tickets, setTickets] = useState(null);
  const { tickets, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isError) {
        toast.error(message);
      }
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isError]);

  useEffect(() => {
    dispatch(getTickets());
  }, []);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket?._id} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
