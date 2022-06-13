import React from "react";
import { Avatar, IconButton } from "@mui/material";

export default function ProfileAvatar() {
  return (
    <div
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
        </IconButton>
      </label>
    </div>
  );
}
