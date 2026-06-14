Feature: 访客切换 en/zh 语言
  作为官网访客
  我想在英文和中文之间切换
  以便用我习惯的语言阅读落地页

  Scenario: 默认中文
    Given 访客首次打开官网
    Then 落地页文案以中文显示

  Scenario: 切到英文
    Given 访客打开官网
    When 访客点击「EN」语言切换
    Then 落地页文案以英文显示

  Scenario: 切回中文
    Given 访客已切到英文
    When 访客点击「ZH」语言切换
    Then 落地页文案以中文显示
