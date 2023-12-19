import axios from "axios";
import { items } from "./items";
const dados = axios.create({
  baseURL: items.url,
  headers: {
    apiKey: items.key,
  },
});

export default dados;
