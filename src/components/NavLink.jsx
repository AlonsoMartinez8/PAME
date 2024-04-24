export default function ({ href, content }) {
  return (
    <li>
      <a className="px-6 py-2 hover:animate-pulse" href={href}>
        {content}
      </a>
    </li>
  );
}
