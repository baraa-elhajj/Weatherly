import toast from "react-hot-toast";

export default function ErrorToast(message) {
  toast.error(message, {
    style: {
      color: "white",
      background: "#8ec5ff66",
    },
    iconTheme: {
      primary: "#e15959",
      secondary: "white",
    },
  });

  return;
}
