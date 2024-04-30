import noUserImage from "../../public/img/noUserImage.png";

export default function UserProfileImage({ dbUser }) {
  return (
    <>
      {dbUser && dbUser.imageUrl ? (
        <>
          <img
            class="w-44 mx-auto bg-slate-100/50 aspect-square rounded-full m-5"
            src={dbUser.imageUrl}
          />
        </>
      ) : (
        <>
          <img
            class="w-44 mx-auto bg-slate-100/50 aspect-square rounded-full m-5"
            src={noUserImage.src}
          />
        </>
      )}
    </>
  );
}
