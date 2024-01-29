import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-service";

export default function downloadFile(fileName,filePath) {
    getDownloadURL(ref(storage, filePath))
        .then((url) => {
            var link = document.createElement("a");
            link.download = fileName;
            link.target = "_blank";
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            // Handle any errors
        });
}
