import axios from "axios";
import { CreateNotePayload, GetNotesResponse } from "../types/note";

const noteApi = axios.create({
  baseURL: `/api/notes`,
  withCredentials: true
});

export const getNotesApi = async () => {
  const response = await noteApi.get<GetNotesResponse>("/");
  return response.data.notes;
};

export const createNoteApi = async (data: { payload: CreateNotePayload }) => {
  await noteApi.post("/", data.payload);
};
