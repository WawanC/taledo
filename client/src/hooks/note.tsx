import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createNoteApi,
  deleteNoteApi,
  getNoteApi,
  getNotesApi
} from "../api/note";

export const useGetNotesQuery = () => useQuery("notes", getNotesApi);

export const useGetNoteQuery = (noteId: string) =>
  useQuery(`note-${noteId}`, () => getNoteApi(noteId));

export const useCreateNoteMutation = () => useMutation(createNoteApi);

export const useDeleteNoteMutation = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteNoteApi(noteId), {
    onSettled: () => queryClient.invalidateQueries("notes")
  });
};
