// lib/getUserID.ts
import { cookies } from "next/headers";

export default function getUserID() {
  const user_id = cookies().get("user_id")?.value;
  return user_id || null;
}
