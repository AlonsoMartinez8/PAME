import { useRef } from "react";
import noUserImage from "../../public/img/noUserImage.png";

export default function UserProfileImage({ dbUser, width }) {
  const formRef = useRef(null);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      document.getElementById("fileForm").submit();
    }
    if (formRef.current) {
      formRef.current.submit();
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
      <form
        ref={formRef}
        className="hidden"
        id="fileForm"
        action="api/updateImage"
        method="post"
      >
        <input type="hidden" name="userId" value={dbUser.id} />
        <input
          type="file"
          name="file"
          id="fileInput"
          onChange={handleFileInputChange}
        />
      </form>
    </>
  );
}
