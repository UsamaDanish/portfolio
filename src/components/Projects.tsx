import type { ProjectsContent } from "@/content/types";

/** Array-driven projects grid. Add/remove/reorder entries in the content
 *  file's `projects.items` — the design never changes. */
export default function Projects({ projects }: { projects: ProjectsContent }) {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1160px] px-[clamp(20px,5vw,48px)] py-[clamp(70px,11vh,130px)]"
    >
      <div data-reveal>
        <div className="mb-4 text-[12.5px] uppercase tracking-[0.08em] text-accent">
          {projects.kicker}
        </div>
        <h2 className="m-0 max-w-[24ch] text-[clamp(26px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {projects.title}
        </h2>
        <p className="mb-0 mt-[22px] max-w-[60ch] text-[clamp(16px,1.9vw,18.5px)] text-muted">
          {projects.intro}
        </p>
      </div>

      <div
        data-reveal
        className="mt-[clamp(40px,6vh,64px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5"
      >
        {projects.items.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-[16px] border border-hairline bg-surface p-[clamp(20px,2.4vw,26px)]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.08em] text-accent">
                {project.domain}
              </span>
              {project.period && (
                <span className="text-[11.5px] text-faint">{project.period}</span>
              )}
            </div>

            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
              {project.title}
            </h3>

            <p className="mt-[10px] flex-1 text-[14.5px] leading-[1.55] text-muted">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline bg-surface-2 px-[10px] py-[5px] text-[11.5px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[13.5px] font-medium text-accent"
              >
                {project.link.label} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
