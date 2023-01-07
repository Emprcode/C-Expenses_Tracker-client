import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import { deleteTransactions } from "../../helpers/axiosHelpers.js";

export const CustomTable = ({ trans = [] }) => {
  console.log(trans);
  const [itemToDelete, setItemToDelete] = useState([]);
  const [selectToDel, setSelectToDelete] = useState(false);
  const total = trans?.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setItemToDelete([...itemToDelete, value]);
    } else {
      setItemToDelete(itemToDelete.filter((_id) => _id !== value));
      setSelectToDelete(false);
    }
  };

  const handleOnSelectAll = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setItemToDelete(trans?.map(({ _id }) => _id));
      setSelectToDelete(true);
    } else {
      setItemToDelete([]);
      setSelectToDelete(false);
    }
  };

  const handleOnDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transaction`
      )
    )
      return;
    const { status, message } = await deleteTransactions(itemToDelete);
    // console.log(message);
    toast[status](message);
    setItemToDelete([]);
  };
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>
            <InputGroup>
              <InputGroup.Checkbox
                className="mb-3"
                onChange={handleOnSelectAll}
                checked={selectToDel}></InputGroup.Checkbox>{" "}
            </InputGroup>
          </th>
          <th>Name</th>
          <th>Income</th>
          <th>Expenses</th>
        </tr>
      </thead>
      <tbody>
        {trans?.map((item, i) => (
          <tr key={i} className="fw-bolder">
            <td>
              <th>
                <InputGroup>
                  <InputGroup.Checkbox
                    className="mb-3"
                    onChange={handleOnSelect}
                    value={item._id}
                    checked={itemToDelete.includes(item._id)}
                    aria-label="Checkbox for following text input"
                  />
                </InputGroup>
              </th>
            </td>
            <td>{item.name}</td>
            {item.type === "income" ? (
              <>
                {" "}
                <td className="text-success">{item.amount}</td> <td></td>
              </>
            ) : (
              <>
                <td></td> <td className="text-danger">-{item.amount}</td>{" "}
              </>
            )}
          </tr>
        ))}

        <tr className="fw-bolder">
          <td colSpan={3}>Total Balance</td>
          <td>{total}</td>
        </tr>
        {itemToDelete.length > 0 && (
          <div>
            <Button variant="danger" onClick={handleOnDelete}>
              {" "}
              Delete selected {itemToDelete.length} Task(s)
            </Button>
          </div>
        )}
      </tbody>
    </Table>
  );
};
