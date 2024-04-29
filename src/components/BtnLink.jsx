export default function BtnLink({ href, content, log }) {
  return (
    <button className={`px-4 py-1 bg-gradient-to-tr ${log?"from-lime-400/80 hover:from-lime-500":"from-red-400/80  hover:red-lime-500 "} to-indigo-500/80 hover:to-indigo-500 rounded-full`}>
      {log?(
        <a href={href}>{content}</a>
      ):(<form action="api/signout" method="POST"><button>Log Out</button></form>)}
    </button>
  );
}
