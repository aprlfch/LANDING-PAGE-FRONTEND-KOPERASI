export function generateYearArray() {
  const jumlahTahun = 5;
  const currentYear = new Date().getFullYear();
  const yearArray = [];

  for (let i = 0; i < jumlahTahun; i++) {
    yearArray.push(currentYear + i);
  }

  const startIndex = Math.max(2023, currentYear - jumlahTahun + 1);
  for (let i = startIndex; i < currentYear; i++) {
    yearArray.unshift(i);
  }

  return yearArray.sort();
}

export const generateDataFromInputFields = (formFields, inputFields) => {
  const data = {};
  formFields.forEach((field) => {
    const found = inputFields.find((inputField) => inputField.name === field.name);
    data[field.name] = found?.value ?? null;
  });
  return data;
};