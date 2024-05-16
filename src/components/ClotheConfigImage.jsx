import { useEffect, useRef, useState } from "react";
import { uploadFile, getURL } from "@/firebase/config";
import ClotheCard from "./ClotheCard";

export default function ClotheConfigImage({ clothe }) {
  const [imageUrl, setImageUrl] = useState(clothe.imageUrl);
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleImageClick = () => {
    console.log("click");
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = async (event) => {
    console.log("channge");
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      await uploadFile(selectedFile, "clothe", clothe.id);
      const url = await getURL("clothe", clothe.id);
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
    <div>
      <img className="h-[300px] object-cover" src={imageUrl} onClick={handleImageClick} />
      <form
        className="hidden"
        action="../api/updateClotheImage"
        method="POST"
        ref={formRef}
      >
        <input type="hidden" name="imageUrl" value={imageUrl} />
        <input type="hidden" name="clotheId" value={clothe.id} />
        <input
          className="hidden"
          type="file"
          name="file"
          id="fileInput"
          onChange={handleFileInputChange}
        />
      </form>
    </div>
  );
}
