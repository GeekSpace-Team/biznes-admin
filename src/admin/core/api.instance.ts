import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:6856",
});

const ApiFormData = axios.create({
  baseURL: "http://localhost:6856",
  headers: { "Content-Type": "multipart/form-data" },
});

export { Api, ApiFormData };
