export function loadData() {
  const rawData = sessionStorage.getItem("data") || "[]";
  try {
    return JSON.parse(rawData);
  } catch (e) {
    return [];
  }
}

export function saveData(data) {
  const rawData = JSON.stringify(data);
  sessionStorage.setItem("data", rawData);
}
