export function checkValueAndParseToZero(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  return value;
}

export function parseIntSafe(value, returnError) {
  // Cek jika value adalah undefined atau null
  if (value === undefined || value === null) {
    return returnError || null;
  }

  const stringValue = String(value).trim();

  if (stringValue === "") {
    return returnError || null;
  }

  const parsedValue = parseInt(stringValue, 10);

  if (isNaN(parsedValue) || typeof parsedValue !== "number") {
    return returnError || null;
  }

  return parsedValue;
}

export function getAllAllocations(responseData) {
  const allAllocations = [];

  // Loop melalui cost centers
  responseData.cost_center.forEach((costCenter) => {
    // Periksa apakah cost center memiliki properti "allocation"
    if (costCenter.allocation) {
      // Dapatkan code dan name cost center
      const costCenterCode = costCenter.code;
      const costCenterName = costCenter.name;

      // Loop melalui setiap alokasi dan tambahkan properti cost_center_code dan cost_center_name
      costCenter.allocation.forEach((allocation) => {
        // Tambahkan properti cost_center_code dan cost_center_name dari costCenter ke allocation
        allocation.cost_center_code = costCenterCode;
        allocation.cost_center_name = costCenterName;

        // Push allocation yang sudah dimodifikasi ke dalam array allAllocations
        allAllocations.push(allocation);
      });
    }
  });

  return allAllocations;
}
