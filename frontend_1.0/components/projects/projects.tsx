import { ProjectType, projects } from "@/data/projects";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Projects() {
  const tNav = await getTranslations("Nav");
  const tProjects = await getTranslations("Projects");
  return (
    <div className="mx-auto my-[10%] flex w-full max-w-5xl flex-col items-center px-4">
      <h1 className="mb-8 text-center text-3xl font-semibold text-foreground md:text-4xl">
        {tNav("projects")}
      </h1>
      <div className="grid min-h-[70vh] w-full grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectElement
            key={p.id}
            project={p}
            viewRepoLabel={tProjects("viewRepo")}
            unavailableLabel={tProjects("repoUnavailable")}
            opensInNewTabLabel={tProjects("opensInNewTab")}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectElement({
  project,
  viewRepoLabel,
  unavailableLabel,
  opensInNewTabLabel,
}: {
  project: ProjectType;
  viewRepoLabel: string;
  unavailableLabel: string;
  opensInNewTabLabel: string;
}) {
  return (
    <article className="flex h-full w-full max-w-sm flex-col items-center rounded-xl border border-border bg-surface/80 p-5 text-center shadow-sm">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg bg-background/60">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <h2 className="mb-2 text-lg leading-snug font-semibold text-foreground">
        {project.name}
      </h2>

      {project.description && (
        <p className="mb-3 text-sm text-muted">{project.description}</p>
      )}

      {project.tags && project.tags.length > 0 && (
        <ul className="mb-4 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-accent-soft px-2 py-1 text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {project.repoLink ? (
        <a
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex max-w-full min-h-11 items-center truncate rounded-md bg-accent-soft px-3 py-1.5 text-sm text-accent hover:opacity-90"
        >
          {viewRepoLabel}
          <span className="sr-only"> {opensInNewTabLabel}</span>
        </a>
      ) : (
        <p className="mt-auto text-sm text-muted">{unavailableLabel}</p>
      )}
    </article>
  );
}
