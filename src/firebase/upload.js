import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import profileService from "../services/profile.service.js";
import noticeService from "../services/notice.service.js";
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

  noticeCoverUploadHandler = (id, file) => {
    if (!file) {
      return null;
    }

    if (file === "auto") {
      noticeService.setCover(id, { NoticeCover: "auto" });
      return null;
    }

    const storageRef = ref(storage, `/Notice/${file.name}`);

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
          noticeService.setCover(id, { NoticeCover: url });
        });
      }
    );
  };

  getImage = (image) => {
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
