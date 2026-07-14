import Avatar from "./Avatar";

const contributorTabs = ["reviewer", "author", "editor", "factChecker"];

function getSocialIcon(social) {
  if (social.icon) return social.icon;

  const label = social.label?.toLowerCase() || "";

  if (label.includes("instagram")) return "instagram-2-1-logo-svgrepo-com.svg";
  if (label.includes("facebook")) return "facebook-color-svgrepo-com.svg";
  if (label.includes("linkedin")) return "linkedin-svgrepo-com.svg";

  return "";
}

export default function ContributorSection({ contributors, activeTab, onTabChange }) {
  const activeContributor = contributors[activeTab] || contributors.reviewer;

  return (
    <section className="contributorSection" aria-label="Article contributors">
      <div className="contributorTabs" role="tablist">
        {contributorTabs.map((tab) => (
          <button
            className={activeTab === tab ? "active" : ""}
            key={tab}
            onClick={() => onTabChange(tab)}
            role="tab"
            type="button"
            aria-selected={activeTab === tab}
          >
            {contributors[tab]?.label}
          </button>
        ))}
      </div>

      <article className="contributorProfile">
        <Avatar src={activeContributor.image} name={activeContributor.name} />
        <div>
          <h2>{activeContributor.name}</h2>
          <p className="contributorRole">{activeContributor.role}</p>
        </div>
      </article>
      <p className="contributorBio">{activeContributor.bio}</p>
      {activeContributor.socials?.length > 0 && (
        <div className="socialLinks" aria-label="Connect with me">
          <p>Connect with me</p>
          <div>
            {activeContributor.socials.map((social) => {
              const icon = getSocialIcon(social);

              return (
                <a href={social.url} key={social.label} aria-label={social.label}>
                  {icon ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/${icon}`}
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    social.shortLabel || social.label?.slice(0, 2)
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
