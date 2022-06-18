import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import profileService from "../services/profile.service.js";
import { Alert } from "@mui/material";
class StorageService {
  profileUploadHandler = (id, file) => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/Avatar/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          profileService.setProfile(id, { ProfileUrl: url });
        });
      }
    );
  };

  getImage = (image) => {
    let { state } = this;

    storage
      .child(`${image}.png`)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new StorageService();
