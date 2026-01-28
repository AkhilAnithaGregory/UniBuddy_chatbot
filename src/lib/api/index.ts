import { BASE_URL } from "../constant/default";
import { useAuthStore } from "../store/authToken";
import type {  ChatType, JournalType, LoginType, RegisterType, UpdatePasswordType } from "../type/index";

export async function LoginUser(data: LoginType) {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const loginError = await response.json();
    throw new Error(loginError.message || "Failed to fetch data");
  }

  return response.json();
}

export async function GetUser() {
  const response = await fetch(`${BASE_URL}/api/users/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function CreateUser(data: RegisterType) {
  const response = await fetch(`${BASE_URL}/api/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const loginError = await response.json();
    throw new Error(loginError.message || "Failed to fetch data");
  }

  return response.json();
}

export async function UpdateUser(data: RegisterType) {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const loginError = await response.json();
    throw new Error(loginError.message || "Failed to fetch data");
  }

  return response.json();
}

export async function ChangePassword(data: UpdatePasswordType) {
  const response = await fetch(`${BASE_URL}/api/users/change_password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const loginError = await response.json();
    throw new Error(loginError.message || "Failed to fetch data");
  }

  return response.json();
}

export async function DeleteUser() {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function GetDailyCheckin() {
  const response = await fetch(`${BASE_URL}/api/users/checkin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function MarkDailyCheckin() {
  const response = await fetch(`${BASE_URL}/api/users/markCheckIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }
  return response.json();
}

export async function CreateJournal(data: JournalType) {
  const response = await fetch(`${BASE_URL}/api/journal/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }
  return response.json();
}

export async function GetUserJournalById(journalId : string) {
  const response = await fetch(`${BASE_URL}/api/journal/${journalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function GetUserJournal() {
  const response = await fetch(`${BASE_URL}/api/journal?userId=69247e00f9ab12ba841517b0&year=2025&month=11&page=1&limit=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function DeleteUserJournalById(journalId : string) {
  const response = await fetch(`${BASE_URL}/api/journal/${journalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function UpdateUserJournal(data: JournalType, journalId : string) {
  const response = await fetch(`${BASE_URL}/api/journal/${journalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function SendChat(data: ChatType) {
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: JSON.stringify(data)
    });
console.log("response",response)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("error",error);
    throw error;
  }
}

export async function GetChatById(chatId: string) {
  const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    }
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}

export async function DeleteChatById(chatId: string) {
  const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    }
  });

  if (!response.ok) {
    const Error = await response.json();
    throw new Error(Error.message || "Failed to fetch data");
  }

  return response.json();
}