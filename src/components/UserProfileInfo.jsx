import { useState } from "react";

export default function UserProfileInfo({ dbUser }) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);

  return (
    <>
      <article className="w-full py-2 border-b-2 flex items-end justify-end gap-4">
        <h1 className="text-5xl text-end text-transparent font-semibold bg-gradient-to-r from-indigo-300 via-green-300 to-slate-300 w-fit bg-clip-text">
          {dbUser ? dbUser.username : "No User Found"}
        </h1>
      </article>

      <article className="w-full">
        <div className="w-full">
          {dbUser && dbUser.description && !isEditingDesc ? (
            <div className="flex items-center justify-between gap-2">
              <p>{dbUser.description}</p>
              <button onClick={() => setIsEditingDesc(!isEditingDesc)}>
                <i className="text-2xl ri-pencil-fill" />
              </button>
            </div>
          ) : (
            <form
              action="api/updateDescription"
              method="post"
              className="w-full flex items-center gap-2"
            >
              <input type="hidden" name="userId" value={dbUser?.id} />
              <textarea
                rows="1"
                name="description"
                className="w-full bg-transparent"
                placeholder="Describe yourself and your style"
              />
              <button type="submit" className="text-center">
                <i className="text-2xl ri-add-line" />
              </button>
              <button onClick={() => setIsEditingDesc(!isEditingDesc)}>
                <i className="text-2xl ri-close-line" />
              </button>
            </form>
          )}
        </div>
      </article>

      <article className="w-full">
        {dbUser && dbUser.link && !isEditingLink ? (
          <div className="flex items-center justify-between gap-2">
            <a
              href={dbUser.link}
              className="text-blue-300 hover:text-green-500"
              target="_blank"
            >
              {dbUser.link}
            </a>
            <button onClick={() => setIsEditingLink(!isEditingLink)}>
              <i className="text-2xl ri-pencil-fill" />
            </button>
          </div>
        ) : (
          <form
            action="api/updateLink"
            method="post"
            className="w-full flex items-center gap-2"
          >
            <input type="hidden" name="userId" value={dbUser?.id} />
            <input
              name="link"
              className="w-full bg-transparent"
              placeholder="Add the link of your site"
            />
            <button type="submit" className="text-center">
              <i className="text-2xl ri-add-line" />
            </button>
            <button onClick={() => setIsEditingLink(!isEditingLink)}>
              <i className="text-2xl ri-close-line" />
            </button>
          </form>
        )}
      </article>
    </>
  );
}
