import { useMutation, useQuery } from "react-query";
import { createNoteApi, getNoteApi, getNotesApi } from "../api/note";

export const useGetNotesQuery = () => useQuery("notes", getNotesApi);

export const useGetNoteQuery = (noteId: string) =>
  useQuery(`note-${noteId}`, () => getNoteApi(noteId));

export const useCreateNoteMutation = () => useMutation(createNoteApi);
