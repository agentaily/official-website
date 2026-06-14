import { render, screen } from "@testing-library/react";
import { afterEach } from "vitest";
import { cleanup, fireEvent } from "@testing-library/react";
import { LocaleProvider, useT, useLocale, LOCALES } from "../../src/i18n";

afterEach(cleanup);

// Smoke coverage for the i18n seam — proves the scaffold's LocaleProvider /
// useT() work and en↔zh switching changes user-visible copy. The real landing
// page (and its BDD integration tests) are built later by a fleet worker.

function Probe() {
  const t = useT();
  const { locale, setLocale } = useLocale();
  return (
    <div>
      <span data-testid="tagline">{t("tagline")}</span>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale("en")}>to-en</button>
    </div>
  );
}

test("defaults to zh", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );
  expect(screen.getByTestId("locale")).toHaveTextContent("zh");
  expect(screen.getByTestId("tagline")).toHaveTextContent("对话式表单");
});

test("switches zh → en", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );
  fireEvent.click(screen.getByText("to-en"));
  expect(screen.getByTestId("locale")).toHaveTextContent("en");
  expect(screen.getByTestId("tagline")).toHaveTextContent("Conversational forms");
});

test("exposes both locales", () => {
  expect(LOCALES).toEqual(["en", "zh"]);
});
