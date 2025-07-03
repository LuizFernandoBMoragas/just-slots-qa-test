Feature: Spin Button on Slot Machine

  Scenario: User clicks the spin button and reels start spinning
    Given I open the slot machine game page
    When I click the spin button
    Then the reels should start spinning
