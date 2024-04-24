import React from "react";
import { webStorageGetItem, webStorageSetItem } from "./webStorage";

export const device_token = () => {
  const storedToken = webStorageGetItem("token");
  if (storedToken) {
    return storedToken;
  }

  return new Promise((resolve) => {
    const testToken = "1234567890";
    webStorageSetItem("token", testToken);
    resolve(testToken);
  });
};
