import { useMutation, useQuery } from "react-query";
import { createNoteApi, getNotesApi } from "../api/note";

export const useGetNotesQuery = () => useQuery("notes", getNotesApi);

export const useCreateNoteMutation = () => useMutation(createNoteApi);
