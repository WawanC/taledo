import { Express } from "express";

declare global {
  namespace Express {
    export interface User {
      id: string;
      username: string;
      google?: string | null;
    }
  }
}
