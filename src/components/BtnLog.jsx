export default function BtnLog({ href, content, log }) {
  return (
    <div>
      {log ? (
        <a
          className="h-24 px-4 py-1 bg-gradient-to-tr from-lime-400/80 hover:from-lime-500 to-indigo-500/80 hover:to-indigo-500 rounded-full"
          href={href}
        >
          {content}
        </a>
      ) : (
        <form action="api/signout" method="POST">
          <button
            className="opacity-80 hover:opacity-100 px-4 py-1 bg-gradient-to-tr from-red-400/80  hover:red-lime-500 to-indigo-500/80 hover:to-indigo-500 rounded-full"
            type="submit"
          >
            Log Out
          </button>
        </form>
      )}
    </div>
  );
}
