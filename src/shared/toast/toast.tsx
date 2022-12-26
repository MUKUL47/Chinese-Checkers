import React, { useEffect, useState } from "react";
import Utils from "../utils";
import "./toast.css";
let timeId: any = -1;
function Toast() {
  const [r, sR] = useState<string | boolean>(false);
  useEffect(() => {
    Utils.Toast.subscribe(async (message: string) => {
      if (typeof message !== "string") return;
      sR(false);
      await Utils.sleep(50);
      sR(message);
      clearTimeout(timeId);
      timeId = setTimeout(() => sR(false), 5000);
    });
  }, []);
  return r ? <div className="toast-message">{r}</div> : null;
}
export default Toast;
