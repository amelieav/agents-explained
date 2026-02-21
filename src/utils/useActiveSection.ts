import { useEffect, useState } from "react";
import { SectionId } from "../types/content";

export function useActiveSection(ids: SectionId[]): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(ids[0]);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const updateActive = (): void => {
      const marker = window.innerHeight * 0.32;
      let nextActive = sections[0].id as SectionId;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker) {
          nextActive = section.id as SectionId;
        }

        if (rect.top <= marker && rect.bottom >= marker) {
          nextActive = section.id as SectionId;
          break;
        }
      }

      setActiveId(nextActive);
    };

    const onScroll = (): void => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        updateActive();
        frame = 0;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
