import { OpenAPI } from "./api";

export function configureApi() {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
}
