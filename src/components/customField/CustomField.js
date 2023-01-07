import React from "react";
import { Form } from "react-bootstrap";

export const CustomField = ({ label, forwaredref, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control ref={forwaredref} {...rest} />
    </Form.Group>
  );
};
