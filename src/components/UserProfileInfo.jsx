import { useState } from "react";

export default function UserProfileInfo({ dbUser }) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingBirthdate, setIsEditingBirthdate] = useState(false);

  const { id, username, description, link, location, birthdate } = dbUser;

  return (
    <>
      <article className="w-full py-2 border-b-2 flex items-end justify-end gap-4">
        <h1 className="text-5xl text-end text-transparent py-1 font-semibold bg-gradient-to-r from-indigo-300 via-green-300 to-slate-300 w-fit bg-clip-text">
          {dbUser ? username : "No User Found"}
        </h1>
      </article>

      <article className="w-full">
        <div className="w-full">
          {dbUser && description && !isEditingDesc ? (
            <div className="flex items-center justify-between gap-2">
              <p>{description}</p>
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
              <input type="hidden" name="userId" value={id} />
              <textarea
                rows="1"
                name="description"
                className="w-full bg-transparent"
                placeholder={
                  description ? description : "Describe yourself and your style"
                }
              />
              <button type="submit" className="text-center">
                <i className="text-2xl ri-add-line" />
              </button>
              {isEditingDesc && (
                <button onClick={() => setIsEditingDesc(!isEditingDesc)}>
                  <i className="text-2xl ri-close-line" />
                </button>
              )}
            </form>
          )}
        </div>
      </article>

      <article className="w-full">
        {dbUser && link && !isEditingLink ? (
          <div className="flex items-center justify-between gap-2">
            <a
              href={link}
              className="text-blue-300 hover:text-green-500 overflow-hidden"
              target="_blank"
            >
              {link}
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
            <input type="hidden" name="userId" value={id} />
            <input
              name="link"
              type="url"
              className="w-full bg-transparent"
              placeholder={link ? link : "Add the link of your site"}
            />
            <button type="submit" className="text-center">
              <i className="text-2xl ri-add-line" />
            </button>
            {isEditingLink && (
              <button onClick={() => setIsEditingLink(!isEditingLink)}>
                <i className="text-2xl ri-close-line" />
              </button>
            )}
          </form>
        )}
      </article>

      <article className="w-full">
        <div className="w-full">
          {dbUser && location && !isEditingLocation ? (
            <div className="flex items-center justify-between gap-2">
              <p className="w-full opacity-65">{location}</p>
              <button onClick={() => setIsEditingLocation(!isEditingLocation)}>
                <i className="text-2xl ri-pencil-fill" />
              </button>
            </div>
          ) : (
            <form
              action="api/updateLocation"
              method="post"
              className="w-full flex items-center gap-2"
            >
              <input type="hidden" name="userId" value={id} />
              <input
                name="location"
                type="text"
                className="w-full bg-transparent"
                placeholder={location ? location : "Add a location"}
              />
              <button type="submit" className="text-center">
                <i className="text-2xl ri-add-line" />
              </button>
              {isEditingLocation && (
                <button
                  onClick={() => setIsEditingLocation(!isEditingLocation)}
                >
                  <i className="text-2xl ri-close-line" />
                </button>
              )}
            </form>
          )}
        </div>
      </article>

      <article className="w-full">
        <div className="w-full">
          {dbUser && birthdate && !isEditingBirthdate ? (
            <div className="flex items-center justify-between gap-2">
              <p className="w-full opacity-65">{birthdate}</p>
              <button
                onClick={() => setIsEditingBirthdate(!isEditingBirthdate)}
              >
                <i className="text-2xl ri-pencil-fill" />
              </button>
            </div>
          ) : (
            <form
              action="api/updateBirthdate"
              method="post"
              className="w-full flex items-center gap-2"
            >
              <input type="hidden" name="userId" value={id} />
              <input
                name="birthdate"
                type="date"
                className="w-full bg-transparent"
                placeholder={birthdate ? birthdate : "Add your birthdate"}
              />
              <button type="submit" className="text-center">
                <i className="text-2xl ri-add-line" />
              </button>
              {isEditingBirthdate && (
                <button
                  onClick={() => setIsEditingBirthdate(!isEditingBirthdate)}
                >
                  <i className="text-2xl ri-close-line" />
                </button>
              )}
            </form>
          )}
        </div>
      </article>
    </>
  );
}
