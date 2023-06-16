export type RegisterUserPayload = {
  username: string;
  password: string;
};

export type LoginUserPayload = {
  username: string;
  password: string;
};

export type SuccessLoginPayload = {
  message: string;
  user: {
    id: string;
    username: string;
  };
};

export type GetMePayload = {
  message: string;
  user: {
    id: string;
    username: string;
    google: string;
  };
};
