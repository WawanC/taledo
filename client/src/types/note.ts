export type Note = {
  id: string;
  content: string;
};

export type GetNotesResponse = {
  message: string;
  notes: Note[];
};

export type CreateNotePayload = {
  content: string;
};
