import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, hash, ...props }: ComponentProps<"a"> & { to: string; hash?: string }) => (
    <a href={`${to}${hash ? `#${hash}` : ""}`} {...props} />
  ),
  useRouterState: ({ select }: { select: (state: { location: { pathname: string } }) => string }) =>
    select({ location: { pathname: "/" } }),
}));

import { SiteLayout } from "@/components/site";

describe("SiteLayout", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("leaves the floating WhatsApp button position to CSS", () => {
    render(
      <SiteLayout>
        <section className="home-hero">
          <div className="action-row">
            <a href="#" className="care-button">
              Agendar pelo WhatsApp
            </a>
          </div>
        </section>
      </SiteLayout>,
    );
    const whatsappLink = screen.getByRole("link", { name: "Abrir conversa no WhatsApp" });
    expect(whatsappLink).not.toHaveAttribute("style");
    expect(whatsappLink).toHaveAttribute("href", expect.stringContaining("wa.me/5511943441672"));
  });

  it("orders the desktop navigation by page flow without a header WhatsApp CTA", () => {
    const { container } = render(
      <SiteLayout>
        <div>Page content</div>
      </SiteLayout>,
    );
    const desktopNav = container.querySelector(".desktop-nav");
    const links = Array.from(desktopNav!.querySelectorAll("a"))
      .slice(0, 6)
      .map(link => link.textContent);

    expect(links).toEqual([
      "Início",
      "Sobre mim",
      "Atendimento",
      "Palestras",
      "Depoimentos",
      "Contato",
    ]);
    expect(desktopNav!.querySelector("details.section-menu")).not.toBeNull();
    expect(container.querySelector(".header-contact")).toBeNull();
  });

  it("closes the mobile menu when clicking outside or pressing Escape", () => {
    render(
      <SiteLayout>
        <div>Page content</div>
      </SiteLayout>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("navigation", { name: "Navegação no celular" })).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByText("Page content"));
    expect(
      screen.queryByRole("navigation", { name: "Navegação no celular" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.queryByRole("navigation", { name: "Navegação no celular" }),
    ).not.toBeInTheDocument();
  });

  it("closes the desktop sections menu when clicking outside or selecting an item", () => {
    const { container } = render(
      <SiteLayout>
        <div>Page content</div>
      </SiteLayout>,
    );
    const sectionMenu = container.querySelector("details.section-menu");

    expect(sectionMenu).not.toBeNull();
    sectionMenu!.open = true;
    fireEvent.pointerDown(screen.getByText("Page content"));
    expect(sectionMenu).not.toHaveAttribute("open");

    sectionMenu!.open = true;
    fireEvent.click(screen.getByRole("link", { name: "Instagram @psicologasimone" }));
    expect(sectionMenu).not.toHaveAttribute("open");
  });

});
