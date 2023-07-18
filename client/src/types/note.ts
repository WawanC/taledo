export type Note = {
  id: string;
  content: string;
};

export type GetNotesResponse = {
  message: string;
  notes: Note[];
};

export type GetNoteResponse = {
  message: string;
  note: Note;
};

export type CreateNotePayload = {
  content: string;
};

export type UpdateNotePayload = {
  content: string;
};
