import { useMutation } from "react-query";
import { createNoteApi } from "../api/note";

export const useCreateNoteMutation = () => useMutation(createNoteApi);
