import toast from "react-hot-toast";

export default function Toast(type, message) {
  switch (type) {
    case "success": {
      return toast.success(message, {
        style: {
          color: "white",
          background: "#8ec5ff66",
        },
        iconTheme: {
          primary: "#43e87d",
          secondary: "white",
        },
      });
    }

    case "error": {
      return toast.error(message, {
        style: {
          color: "white",
          background: "#8ec5ff66",
        },
        iconTheme: {
          primary: "#e15959",
          secondary: "white",
        },
      });
    }

    default: {
      console.log("Unexpected toast type: ", type);
      return <></>;
    }
  }
}
