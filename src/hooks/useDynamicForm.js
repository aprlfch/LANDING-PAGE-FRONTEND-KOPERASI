import React from "react";

const useDynamicForm = (initialFields, options = {}) => {
  const [inputFields, setInputFields] = React.useState(initialFields);

  const handleInputChange = (name, value) => {
    setInputFields(prev => prev.map((field) => {
      if (field.name === name) {
        return { ...field, value };
      }
      return field;
    }));
  };

  const handleFileChange = (info, item) => {
    const filesWithOrigin = info.fileList.map((file) => {
      if (file.originFileObj) {
        return file;
      }
      return null;
    }).filter(Boolean);

    setInputFields(prev => prev.map((field) =>
      field.name === item.name ? { ...field, value: filesWithOrigin } : field
    ));
  };

  return {
    inputFields,
    handleInputChange,
    handleFileChange,
    setInputFields,
    options,
  };
};

export default useDynamicForm;
