import avatar from "../assets/avatar.jpeg";
import { useMessages } from "../i18n";

// 关于 / About — the founder block: portrait + identity on the left, a facts
// table on the right. On mobile the left lead is hidden and avatar / name / bio
// fold into the table as `aw-fact--m` rows (toggled by the stylesheet).
export function About() {
  const { about } = useMessages();
  return (
    <section className="aw-sec" id="about">
      <div className="aw-about">
        <div className="aw-about__lead">
          <div className="aw-about__photo ax-ticks">
            <img src={avatar} alt={about.name} />
          </div>
          <div className="aw-about__id">
            <h3 className="aw-about__name">
              {about.name}
              <span className="ax-cursor" />
            </h3>
            <p className="aw-about__role">{about.role}</p>
            <p className="aw-about__bio">{about.bio}</p>
          </div>
        </div>
        <div className="aw-about__side">
          <dl className="aw-about__facts">
            <div className="aw-fact--m">
              <dt>{about.avatarLabel}</dt>
              <dd>
                <img className="aw-fact__avatar" src={avatar} alt={about.name} />
              </dd>
            </div>
            <div className="aw-fact--m">
              <dt>{about.nameLabel}</dt>
              <dd>{about.name}</dd>
            </div>
            <div className="aw-fact--m">
              <dt>{about.bioLabel}</dt>
              <dd>{about.bio}</dd>
            </div>
            {about.facts.map((f) => {
              const external = !!f.href && f.href.startsWith("http");
              return (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>
                    {f.href ? (
                      <a
                        className="aw-fact__link"
                        href={f.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {f.v}
                      </a>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
