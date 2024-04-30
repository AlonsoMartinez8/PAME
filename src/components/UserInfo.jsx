export default function UserInfo({dbUser}) {
  return (
    <>
    <article class="w-full py-2 border-b-2 flex items-center justify-between">
      <button class="w-16">
        <i class="text-2xl ri-edit-fill" />
      </button>
      <h1 class="text-5xl text-transparent font-semibold bg-gradient-to-r from-indigo-300 via-green-300 to-slate-300 w-fit bg-clip-text">
        {dbUser ? dbUser.username : "No User Found"}
      </h1>
    </article>
    <article class="w-full">
      <div class="w-full">
        {dbUser && dbUser.description ? (
          <div class="flex items-center justify-between gap-2">
            <p>{dbUser.description}</p>
          </div>
        ) : (
          <form
            action="api/updateDescription"
            method="post"
            class="w-full flex items-center gap-2"
          >
            <input type="hidden" name="userId" value={dbUser?.id} />
            <textarea
              name="description"
              class="px-2 py-1 w-full bg-transparent"
              placeholder="Describe yourself and your style"
            />
            <button type="submit" class="w-16 text-center">
              <i class="text-2xl ri-add-line" />
            </button>
          </form>
        )}
      </div>
    </article>
    <article class="w-full">
      {dbUser && dbUser.link ? (
        <div class="flex items-center justify-between gap-2">
          <a
            href={dbUser.link}
            class="text-blue-300 hover:text-green-500"
            target="_blank"
          >
            {dbUser.link}
          </a>
        </div>
      ) : (
        <form
          action="api/updateLink"
          method="post"
          class="w-full flex items-center gap-2"
        >
          <input type="hidden" name="userId" value={dbUser?.id} />
          <input
            name="link"
            class="px-2 py-1 w-full bg-transparent"
            placeholder="Add the link of your site"
          />
          <button type="submit" class="w-16 text-center">
            <i class="text-2xl ri-add-line" />
          </button>
        </form>
      )}
    </article>
  </>
  );
}
