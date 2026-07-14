import { getInitials } from "../utils/text";

export default function Avatar({ src, name }) {
  if (src) {
    return <img className="avatarImage" src={src} alt={name} />;
  }

  return (
    <div className="avatarFallback" aria-hidden="true">
      {getInitials(name)}
    </div>
  );
}
