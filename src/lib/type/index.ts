export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  gender: string;
  role: string;
  password?: string;
};

export type UpdatePasswordType = {
  currentPassowrd: string,
  newPassword: string
}

export type JournalType = {
  title: string,
  date: string,
  content: string,
  userId?: string,
}

export type ChatType = {
  conversationId: string,
  message: string,
}