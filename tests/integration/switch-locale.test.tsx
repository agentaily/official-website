import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { expect } from "vitest";
import App from "../../src/App";

// Outer loop: realize features/switch-locale.feature against the real landing
// page. We assert user-visible copy (the hero CTAs, which are unique per locale)
// rather than internal state, and drive the language toggle by clicking the
// nav button whose label is the target locale code ("EN" while zh, "ZH" while en).

const feature = await loadFeature("features/switch-locale.feature");

function expectChinese() {
  expect(screen.getByText("开始造")).toBeInTheDocument();
  expect(screen.getByText("看看能造什么")).toBeInTheDocument();
}

function expectEnglish() {
  expect(screen.getByText("Build now")).toBeInTheDocument();
  expect(screen.getByText("See what you can build")).toBeInTheDocument();
}

function switchLanguage(targetCode: "EN" | "ZH") {
  fireEvent.click(screen.getByText(targetCode));
}

describeFeature(feature, ({ Scenario, AfterEachScenario }) => {
  AfterEachScenario(() => cleanup());

  Scenario("默认中文", ({ Given, Then }) => {
    Given("访客首次打开官网", () => {
      render(<App />);
    });
    Then("落地页文案以中文显示", () => {
      expectChinese();
    });
  });

  Scenario("切到英文", ({ Given, When, Then }) => {
    Given("访客打开官网", () => {
      render(<App />);
    });
    When("访客点击「EN」语言切换", () => {
      switchLanguage("EN");
    });
    Then("落地页文案以英文显示", () => {
      expectEnglish();
    });
  });

  Scenario("切回中文", ({ Given, When, Then }) => {
    Given("访客已切到英文", () => {
      render(<App />);
      switchLanguage("EN");
      expectEnglish();
    });
    When("访客点击「ZH」语言切换", () => {
      switchLanguage("ZH");
    });
    Then("落地页文案以中文显示", () => {
      expectChinese();
    });
  });
});
