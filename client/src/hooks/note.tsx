import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createNoteApi,
  deleteNoteApi,
  getNoteApi,
  getNotesApi,
  updateNoteApi
} from "../api/note";
import { UpdateNotePayload } from "../types/note";

export const useGetNotesQuery = () => useQuery("notes", getNotesApi);

export const useGetNoteQuery = (noteId: string) =>
  useQuery(`note-${noteId}`, () => getNoteApi(noteId));

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createNoteApi, {
    onSettled: () => queryClient.invalidateQueries("notes")
  });
};

export const useDeleteNoteMutation = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteNoteApi(noteId), {
    onSettled: () => queryClient.invalidateQueries("notes")
  });
};

export const useUpdateNoteMutation = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: UpdateNotePayload) =>
      updateNoteApi({ noteId: noteId, payload: payload }),
    {
      onSettled: () => queryClient.invalidateQueries("notes")
    }
  );
};
