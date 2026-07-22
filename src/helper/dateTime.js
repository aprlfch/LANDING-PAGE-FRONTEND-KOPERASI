export const formatDate = (input, format) => {
  if (input === null || input === undefined) {
    return input;
  }

  if (input instanceof Date) {
    const year = input.getFullYear();
    const month = String(input.getMonth() + 1).padStart(2, "0");
    const day = String(input.getDate()).padStart(2, "0");

    // Pemetaan format dinamis ke bentuk yang sesuai
    const formattedDate = format.replace("yyyy", year).replace("mm", month).replace("dd", day);

    return formattedDate;
  }

  if (typeof input !== "string") {
    return input;
  }

  // Pisahkan format menjadi array untuk mendeteksi format yang digunakan
  const formats = ["yyyy/mm/dd", "yyyy-mm-dd", "dd-mm-yyyy", "dd/mm/yyyy"];
  let selectedFormat = null;

  for (const f of formats) {
    if (input.includes(f)) {
      selectedFormat = f;
      break;
    }
  }

  if (selectedFormat) {
    const parts = input.split(/[\s/:-]+/);
    const yearIndex = parts.indexOf("yyyy");
    const monthIndex = parts.indexOf("mm");
    const dayIndex = parts.indexOf("dd");

    if (yearIndex !== -1 && monthIndex !== -1 && dayIndex !== -1) {
      const year = parts[yearIndex + 1];
      const month = parts[monthIndex + 1];
      const day = parts[dayIndex + 1];

      // Buat objek Date dari string
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return formattedDate;
    }
  }

  return input;
};

// cara pemakaian
// const dateObject = new Date("2023-12-07");
// console.log(formatDate(dateObject, "yyyy/mm/dd")); // Output: 2023/12/07
// console.log(formatDate("2023/12/07", "yyyy/mm/dd")); // Output: Sat Dec 07 2023 00:00:00 GMT+0000 (Coordinated Universal Time)

export function formatStringDateToDescription(inputDate) {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const [year, month, day] = inputDate.split("-");
  const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;

  return formattedDate;
}
