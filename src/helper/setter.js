export const setInitialValues = (fields, record) => {
  const initialValues = {};
  fields.forEach((field) => {
    initialValues[field.name] = record[field.name];
  });
  return fields.map((field) => ({
    ...field,
    value: initialValues[field.name],
  }));
};

export const setEmptyValues = (fields) => {
  return fields.map((field) => ({
    ...field,
    value: "",
  }));
};

export function mergeDataCommitment(data1, data2) {
  // Create a set to store unique IDs from data1
  const uniqueIds = new Set(data1.map((item) => item.id));

  // Filter out items from data2 that have the same ID as in data1
  const filteredData2 = data2.filter((item) => !uniqueIds.has(item.id));

  // Concatenate the filtered data2 with data1
  const mergedData = data1.concat(filteredData2);

  return mergedData;
}

export const getColorByTitle = (data, targetTitle) => {
  const targetItem = data.find((item) => item?.title?.toUpperCase() === targetTitle?.toUpperCase());

  // Jika item dengan judul yang dicari ditemukan, kembalikan warna, jika tidak, kembalikan null atau warna default
  return targetItem ? targetItem.color : null; // atau 'warna default' sesuai kebutuhan
};
