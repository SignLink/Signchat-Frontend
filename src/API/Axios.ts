import axios from "axios";
import { endpoints } from "./Endpoints";

export const api = axios.create({
  baseURL: endpoints.baseURL,
 });
