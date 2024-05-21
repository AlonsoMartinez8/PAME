import { useEffect, useRef, useState } from "react";
import { uploadFile, getURL } from "@/firebase/config";

export default function UserProfileImage({ dbUser, width, editable, followers }) {
  const [imageUrl, setImageUrl] = useState(dbUser.imageUrl);
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleImageClick = () => {
    editable && document.getElementById("fileInput").click();
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      await uploadFile(selectedFile, "profile", dbUser.id);
      const url = await getURL("profile", dbUser.id);
      setImageUrl(url);
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (formSubmitted && formRef.current) {
      formRef.current.submit();
    }
  }, [formSubmitted]);

  return (
    <>
      <div
        className={`mx-auto bg-slate-100/20 aspect-square rounded-full cursor-pointer overflow-hidden flex items-center justify-center`}
      >
        <img width={width} src={dbUser.imageUrl} onClick={handleImageClick} />
        {editable && (
          <form
            className="hidden"
            action="api/updateProfileImage"
            method="POST"
            ref={formRef}
          >
            <input type="hidden" name="imageUrl" value={imageUrl} />
            <input type="hidden" name="userId" value={dbUser.id} />
            <input
              className="hidden"
              type="file"
              name="file"
              id="fileInput"
              onChange={handleFileInputChange}
            />
          </form>
        )}
      </div>
      <p className="px-4 py-1 text-center text-xs"> FOLLOWERS <br /><span className="text-2xl font-bold">{followers.length}</span></p>
    </>
  );
}
