import noUserImage from "../../public/img/noUserImage.png";
import { uploadFile, getURL } from "@/firebase/config";

export default function UserProfileImage({ dbUser, width }) {
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadFile(selectedFile, "profile", dbUser.id);
      getURL("profile", dbUser.id)
    }
  };

  return (
    <>
      {dbUser.imageUrl && dbUser.imageUrl !== "" ? (
        <>
          <img
            className="mx-auto bg-slate-100/50 aspect-square rounded-full m-5 cursor-pointer"
            width={width}
            src={dbUser.imageUrl}
            onClick={handleImageClick}
          />
        </>
      ) : (
        <>
          <img
            className="mx-auto bg-slate-100/50 aspect-square rounded-full m-5 cursor-pointer"
            width={width}
            src={noUserImage.src}
            onClick={handleImageClick}
          />
        </>
      )}
      <input
      className="hidden"
        type="file"
        name="file"
        id="fileInput"
        onChange={handleFileInputChange}
      />
    </>
  );
}
