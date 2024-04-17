import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1759653",
  key: "05d0c76ccd2892789ea1",
  secret: "acbffedf6f443ab9cd8c",
  cluster: "ap2",
  useTLS: true,
});