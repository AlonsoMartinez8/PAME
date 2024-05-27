import { useEffect, useRef, useState } from "react";
import { uploadFile, getURL } from "@/firebase/config";

export default function UserProfileImage({ dbUser, width, editable }) {
  const [imageUrl, setImageUrl] = useState(dbUser.imageUrl);
  const [modalFollowersOpen, setModalFollowersOpen] = useState(false);
  const [modalFollowingOpen, setModalFollowingOpen] = useState(false);
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

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

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const response = await fetch(
          `/api/getFollowersByUser?userId=${dbUser.id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFollowers(data.followers);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching isLiked:", error);
      }
    }

    async function fetchFollowing() {
      try {
        const response = await fetch(
          `/api/getFollowingByUser?userId=${dbUser.id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFollowing(data.following);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching isLiked:", error);
      }
    }

    fetchFollowers();
    fetchFollowing();
  }, []);

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
          <div className="m-auto w-[90%] md:max-w-[500px] overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
            <header className="flex items-center justify-between gap-4 pb-4">
              <h1 className="text-2xl">Followers</h1>
              <button onClick={() => setModalFollowersOpen(false)}>
                <i className="text-2xl ri-close-line"></i>
              </button>
            </header>
            <main className="px-4 py-2">
              <ul className="flex flex-col gap-4 overflow-y-scroll h-full max-h-[400px]">
                {followers.length < 1 && <p>No followers yet</p>}
                {followers.map((f) => (
                  <li
                    key={f.id}
                    className="flex px-4 py-2 border-slate-50/50 rounded-xl border-[1px] gap-2 items-center justify-between"
                  >
                    <div className="w-6 h-6 aspect-square overflow-hidden bg-slate-50/50 rounded-full">
                      <a href={`/profile/${f.id}`} className="object-fill">
                        <img src={f.imageUrl} />
                      </a>
                    </div>
                    <p className="text-center overflow-x-hidden">{f.username}</p>
                  </li>
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
          <div className="m-auto w-[90%] md:max-w-[500px] overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
            <header className="flex items-center justify-between gap-4 pb-4">
              <h1 className="text-2xl">Following</h1>
              <button onClick={() => setModalFollowingOpen(false)}>
                <i className="text-2xl ri-close-line"></i>
              </button>
            </header>
            <main className="px-4 py-2">
              <ul className="flex flex-col gap-4 overflow-y-scroll h-full max-h-[400px]">
                {following.length < 1 && <p>No following yet</p>}
                {following.map((f) => (
                  <li
                    key={f.id}
                    className="px-4 py-2 border-slate-50/50 rounded-xl border-[1px] flex gap-2 items-center justify-between"
                  >
                    <div className="w-6 h-6 aspect-square overflow-hidden bg-slate-50/50 rounded-full">
                      <a href={`/profile/${f.id}`} className="object-fill">
                        <img src={f.imageUrl} />
                      </a>
                    </div>
                    <p className="text-center overflow-x-hidden">{f.username}</p>
                    <form action="api/follow" method="post">
                      <input type="hidden" name="userTo" value={f.id} />
                      <button>
                        <i className="ri-delete-bin-line text-2xl text-red-300"></i>
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </main>
          </div>
        </dialog>
      )}
    </>
  );
}
