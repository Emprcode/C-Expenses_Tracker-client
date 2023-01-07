import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { postTransactions } from "../../helpers/axiosHelpers";
import { toast } from "react-toastify";
const initialState = {
  type: "",
  name: "",
  amount: "",
};

export const TransactionForm = ({ fetchingTrans }) => {
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { status, message } = await postTransactions(formData);
    toast[status](message);

    status === "success" && fetchingTrans();
  };

  return (
    <div>
      <Form className="mt-5" onSubmit={handleOnSubmit}>
        <Row>
          <Col>
            <Form.Select
              name="type"
              required
              value={formData.type}
              onChange={handleOnChange}>
              <option>Choose...</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter transaction name"
              required
              value={formData.name}
              onChange={handleOnChange}
            />
          </Col>

          <Col>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Enter amount"
              required
              value={formData.amount}
              onChange={handleOnChange}
            />
          </Col>
          <Col>
            <div className="">
              <Button type="submit">Add</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
