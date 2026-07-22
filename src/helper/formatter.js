export const formatStringCapitalize = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  const trimmedText = text.trim();

  if (trimmedText.length > 0) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.toLowerCase().slice(1);
  } else {
    return "";
  }
};

export const formatStringToUppercase = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  return text.toUpperCase();
};

export const formatStringToLowercase = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  return text.toLocaleLowerCase();
};

// export const formatRupiah = (input) => {
//   if (typeof input === "number") {
//     const formattedRupiah = new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(input);

//     return formattedRupiah;
//   }

//   if (typeof input !== "string") {
//     return input;
//   }

//   const numericString = input.replace(/\D/g, "");

//   if (/^\d+$/.test(numericString)) {
//     const numberValue = parseFloat(numericString);
//     const formattedRupiah = new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(numberValue);

//     return formattedRupiah;
//   } else {
//     return input;
//   }
// };

export const formatRupiah = (input) => {
  if (typeof input === "number") {
    // Langsung format jika input berupa angka
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(input);
  }

  if (typeof input === "string") {
    // Hapus karakter non-numerik kecuali titik desimal
    const numericString = input.replace(/[^\d.]/g, "");
    // Cek apakah string valid sebagai angka
    if (!isNaN(parseFloat(numericString))) {
      const numberValue = parseFloat(numericString);
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(numberValue);
    }
  }

  // Kembalikan input jika bukan string atau angka valid
  return input;
};

export function checkAndSetToZero(value) {
  // Jika tipe data bukan number, ubah ke dalam bentuk number
  if (typeof value !== "number") {
    value = Number(value);
  }

  // Cek apakah nilai lebih dari 0
  if (value > 0) {
    return value;
  } else {
    // Jika nilai kurang dari atau sama dengan 0, ubah menjadi 0
    return 0;
  }
}

export function capitalizeFirstLetter(input) {
  // Memeriksa apakah input adalah null atau undefined
  if (input === null || input === undefined) {
    return "";
  }
  // Memastikan input adalah string
  if (typeof input !== "string") {
    input = String(input);
  }

  // Memisahkan kata-kata dalam string
  let words = input.split(" ");

  // Mengubah huruf pertama setiap kata menjadi huruf besar
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
    }
  }

  // Menggabungkan kata-kata kembali menjadi string
  return words.join(" ");
}

export function cekDuplikatKata(inputString) {
  // Konversi seluruh string menjadi huruf kecil
  inputString = inputString.toLowerCase();

  // Pisahkan kata-kata dalam string
  let kata = inputString.split(" ");

  // Buat objek untuk menyimpan kemunculan setiap kata
  let kemunculanKata = {};

  // Filter kata-kata yang tidak duplikat
  let kataUnik = kata.filter(function (kata) {
    // Jika kata belum ada dalam objek, tambahkan dengan nilai 1
    if (!kemunculanKata[kata]) {
      kemunculanKata[kata] = 1;
      return true;
    } else {
      // Jika kata sudah ada, tambahkan nilai dan kembalikan false
      kemunculanKata[kata]++;
      return false;
    }
  });

  // Hilangkan kata "direktorat" dari kata-kata unik
  kataUnik = kataUnik.filter(function (kata) {
    return kata !== "direktorat";
  });

  // Gabungkan kata-kata unik menjadi string baru
  let hasilString = kataUnik.join(" ");

  return hasilString;
}

export function numberToWords(input) {
  // Convert input to a valid number
  let number;
  if (typeof input === "number") {
    number = input;
  } else if (typeof input === "string") {
    // Remove dots (.) and commas (,) from the string
    const sanitizedInput = input.replace(/[.,]/g, "");

    // Try to parse the string to a number
    number = parseFloat(sanitizedInput);

    // Check if the parsed number is NaN (Not a Number)
    if (isNaN(number)) {
      return "Invalid input";
    }
  } else {
    return "Invalid input";
  }

  if (number === null || number === undefined || isNaN(number)) {
    return "Nol Rupiah";
  }

  const units = ["", "Ribu", "Juta", "Miliar", "Triliun", "Quadriliun"]; // Satuan
  const words = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan"]; // Angka dalam kata

  function convertThreeDigits(num) {
    let result = "";

    if (num === 100) {
      result += "Seratus ";
      return result;
    }

    if (num === 1000) {
      result += "Seribu ";
      return result;
    }

    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      if (hundreds > 1) {
        result += words[hundreds] + " Ratus ";
      } else {
        result += "Seratus ";
      }
      num %= 100;
    }

    if (num === 10) {
      result += "Sepuluh ";
      num = 0;
    } else if (num === 11) {
      result += "Sebelas ";
      num = 0;
    } else if (num > 10 && num <= 19) {
      // Special case for teens (10-19)
      result += words[num - 10] + " Belas ";
      num = 0;
    } else if (num >= 20) {
      // Tens
      result += words[Math.floor(num / 10)] + " Puluh ";
      num %= 10;
    }

    if (num > 0) {
      if (num === 1 && result === "") {
        result += "Satu ";
      } else if (num === 1 && result === "Satu Puluh ") {
        result = "Sebelas ";
      } else {
        result += words[num] + " ";
      }
    }

    return result;
  }

  let result = "";

  for (let i = 0; i < units.length && number > 0; i++) {
    const segment = number % 1000;
    if (segment > 0) {
      result = convertThreeDigits(segment) + units[i] + " " + result;
    }
    number = Math.floor(number / 1000);
  }

  return result.trim() + " Rupiah";
}
