import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!product || !description) {
      console.log("erro");
    }
    dispatch(createTicket({ product, description }));
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form</p>

        <section className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Customer email</label>
              <select
                name="product"
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="iPhone">iPhone</option>
                <option value="Macbook">Macbook</option>
                <option value="iMac">iMac</option>
                <option value="iPad">iPad</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="form-group">
                <button className="btn btn-block">Submit</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default NewTicket;
