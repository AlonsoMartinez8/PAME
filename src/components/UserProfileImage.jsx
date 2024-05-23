import { useEffect, useRef, useState } from "react";
import { uploadFile, getURL } from "@/firebase/config";

export default function UserProfileImage({
  dbUser,
  width,
  editable,
  followers,
  following,
}) {
  const [imageUrl, setImageUrl] = useState(dbUser.imageUrl);
  const [modalFollowersOpen, setModalFollowersOpen] = useState(false);
  const [modalFollowingOpen, setModalFollowingOpen] = useState(false);
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
      <div className="flex items-center justify-center">
        <button
          className="px-4 py-1 text-center text-xs"
          onClick={() => setModalFollowersOpen(true)}
        >
          {" "}
          FOLLOWERS <br />
          <span className="text-2xl font-bold">{followers.length}</span>
        </button>
        {editable && (
          <button
            className="px-4 py-1 text-center text-xs"
            onClick={() => setModalFollowingOpen(true)}
          >
            FOLLOWING <br />
            <span className="text-2xl font-bold">{following.length}</span>
          </button>
        )}
      </div>

      {/** MODAL FOLLOWERS */}
      {editable && (
        <dialog
          className={`w-screen h-screen fixed top-0 left-0 ${
            modalFollowersOpen ? "flex" : "hidden"
          } items-center z-50 backdrop-blur-md bg-slate-800/50`}
        >
          <div className="m-auto w-[90%] md:max-w-[500px] max-h-[400px] overflow-y-scroll bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
            <header className="flex items-center justify-between gap-4 pb-4">
              <h1 className="text-2xl">Followers</h1>
              <button onClick={() => setModalFollowersOpen(false)}>
                <i className="text-2xl ri-close-line"></i>
              </button>
            </header>
            <main className="px-4 py-2">
              <ul className="flex flex-col gap-4">
                {followers.map(f=>(
                  <li>{f.userFrom}</li>
                ))}
              </ul>
            </main>
          </div>
        </dialog>
      )}

      {/** MODAL FOLLOWING */}
      {editable && (
        <dialog
          className={`w-screen h-screen fixed top-0 left-0 ${
            modalFollowingOpen ? "flex" : "hidden"
          } items-center z-50 backdrop-blur-md bg-slate-800/50`}
        >
          <div className="m-auto w-[90%] md:max-w-[500px] max-h-[400px] overflow-y-scroll bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
            <header className="flex items-center justify-between gap-4 pb-4">
              <h1 className="text-2xl">Following</h1>
              <button onClick={() => setModalFollowingOpen(false)}>
                <i className="text-2xl ri-close-line"></i>
              </button>
            </header>
            <main className="px-4 py-2">
              <ul className="flex flex-col gap-4">
                {following.map(f=>(
                  <li>{f.userTo}</li>
                ))}
              </ul>
            </main>
          </div>
        </dialog>
      )}
    </>
  );
}
