import axios from "axios";
import { CreateNotePayload } from "../types/note";

const noteApi = axios.create({
  baseURL: `/api/notes`,
  withCredentials: true
});

export const createNoteApi = async (data: { payload: CreateNotePayload }) => {
  await noteApi.post("/", data.payload);
};
