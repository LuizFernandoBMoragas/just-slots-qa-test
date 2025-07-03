Feature: Win Animation

  Scenario: Display win animation after a win
    Given I open the slot machine game page
    When I click the spin button
    Then I should see the win animation
