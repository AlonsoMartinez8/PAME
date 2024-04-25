export default function ({ href, content }) {
  return (
    <li>
      <a className="p-2 hover:animate-pulse" href={href}>
        {content}
      </a>
    </li>
  );
}
