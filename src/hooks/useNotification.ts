import { useCallback } from "react";
import { notification } from "antd";

const useNotification = () => {
  const notify = useCallback(
    (type: "success" | "error", message: string, description?: string) => {
      notification[type]({
        message: message,
        description,
        placement: "topRight",
        duration: 5,
      });
    },
    []
  );

  const notifySuccess = useCallback(
    (message: string, description?: string) => {
      notify("success", message, description);
    },
    [notify]
  );

  const notifyError = useCallback(
    (message: string, description?: string) => {
      notify("error", message, description);
    },
    [notify]
  );

  return { notifySuccess, notifyError };
};

export default useNotification;
