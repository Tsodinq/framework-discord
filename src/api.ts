const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://framework.soodam.rocks"
    : "http://127.0.0.1:3000";

const IMG_BASE =
  process.env.NODE_ENV === "production"
    ? "https://media.soodam.rocks"
    : "http://127.0.0.1:3000";

export { API_BASE, IMG_BASE };