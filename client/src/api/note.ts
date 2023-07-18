import axios from "axios";
import {
  CreateNotePayload,
  GetNoteResponse,
  GetNotesResponse
} from "../types/note";

const noteApi = axios.create({
  baseURL: `/api/notes`,
  withCredentials: true
});

export const getNotesApi = async () => {
  const response = await noteApi.get<GetNotesResponse>("/");
  return response.data.notes;
};

export const getNoteApi = async (noteId: string) => {
  const response = await noteApi.get<GetNoteResponse>(`/${noteId}`);
  return response.data.note;
};

export const createNoteApi = async (data: { payload: CreateNotePayload }) => {
  await noteApi.post("/", data.payload);
};

export const deleteNoteApi = async (noteId: string) => {
  await noteApi.delete<GetNoteResponse>(`/${noteId}`);
};
