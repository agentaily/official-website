import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { LocaleProvider, useLocale, useMessages, LOCALES } from "../../src/i18n";
import en from "../../src/i18n/en.json";
import zh from "../../src/i18n/zh.json";

afterEach(cleanup);

// Inner-loop coverage for the i18n seam: LocaleProvider defaults to zh, exposes
// the active catalog via useMessages(), and setLocale swaps it to en. The real
// end-to-end "visitor switches language" behavior is realized as a BDD spec in
// tests/integration/.

function Probe() {
  const { locale, setLocale } = useLocale();
  const m = useMessages();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="sub">{m.hero.sub}</span>
      <button onClick={() => setLocale("en")}>to-en</button>
      <button onClick={() => setLocale("zh")}>to-zh</button>
    </div>
  );
}

test("defaults to zh and exposes the zh catalog", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );
  expect(screen.getByTestId("locale")).toHaveTextContent("zh");
  expect(screen.getByTestId("sub")).toHaveTextContent("跟 AI 聊一句");
});

test("setLocale swaps the active catalog zh → en → zh", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );
  fireEvent.click(screen.getByText("to-en"));
  expect(screen.getByTestId("locale")).toHaveTextContent("en");
  expect(screen.getByTestId("sub")).toHaveTextContent("Chat one line");

  fireEvent.click(screen.getByText("to-zh"));
  expect(screen.getByTestId("locale")).toHaveTextContent("zh");
  expect(screen.getByTestId("sub")).toHaveTextContent("跟 AI 聊一句");
});

test("exposes both locales", () => {
  expect(LOCALES).toEqual(["en", "zh"]);
});

test("en and zh catalogs share the same shape (no drift)", () => {
  const shape = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(shape);
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.keys(value as Record<string, unknown>)
          .sort()
          .map((k) => [k, shape((value as Record<string, unknown>)[k])]),
      );
    }
    return typeof value;
  };
  expect(shape(en)).toEqual(shape(zh));
});
