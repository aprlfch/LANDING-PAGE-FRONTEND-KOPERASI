import React from "react";

const useStaticForm = (initialState = {}) => {
  const [formData, setFormData] = React.useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, handleInputChange };
};

export default useStaticForm;
