export default function BtnLink({ href, content }) {
  return (
    <button className="px-8 py-1 bg-gradient-to-tr from-lime-400/80 to-indigo-500/80 hover:from-lime-500 hover:to-indigo-500 rounded-full">
      <a href={href}>{content}</a>
    </button>
  );
}
