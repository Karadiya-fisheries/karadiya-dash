import { useState } from "react";
import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Input } from "@mui/material";

export default function ReadImage() {
  const getImage = (image) => {
    let { state } = this;
    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const percent = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //     },
    //     (err) => console.log(err),
    //     () => {
    //       // download url
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         console.log(url);
    //       });
    //     }
    //   );

    storage
      .child(`${image}.png`)
      .getDownloadURL()
      .then((url) => {
        state[image] = url;
        this.setState(state);
      })
      .catch((error) => {
        // Handle any errors
      });
  };
  return (
    <div>
      Hello Lithuania
      <br />
      <img src={this.state.lithuania} alt="Lithuanian flag" />
      <br />
      Hello United Kingdom
      <br />
      <img src={this.state.uk} alt="UK flag" />
    </div>
  );
}
