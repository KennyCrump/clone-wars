const {calculateScore} = require("../Logic/logic");

const completedChallenges = [{challenge_id: 3, solution: 'hey', difficulty: 3}, {challenge_id: 4, solution: 'hello', difficulty: 2}, {challenge_id: 7, solution: 'hello', difficulty: 4}]
const completedChallenges2 = [{challenge_id: 3, solution: 'hey', difficulty: 7}, {challenge_id: 4, solution: 'hello', difficulty: 8}, {challenge_id: 7, solution: 'hello', difficulty: 6}]

// describe("challenge list returns correct info", () => {
//   test(" returns array", () => {
//     expect();
//   });
//   test("each item is an object", () => {
//     expect();
//   });
// });
// describe("check user info", () => {
//   test("user score exists", () => {
//     expect();
//   });
//   test("user score is number", () => {
//     expect();
//   });
//   test("rank exists and or accurate", () => {
//     expect();
//   });
// });
// describe("edit user info", () => {
//   test("user info has updated", () => {
//     expect();
//   });
// });
describe("user score is accurately calculated", () => {
  test("items in array have a difficulty prop", () => {
    expect(completedChallenges[0]).toHaveProperty('difficulty')
  })
  test("calculate score returns a number", () => {
    expect(calculateScore(completedChallenges)).not.toBeNaN()
  })
  test("empty array should return 0 (user hasn't completed any challenges", () => {
    expect(calculateScore([])).toBe(0)
  })
  test("calculate score should return the correct number", () => {
    expect(calculateScore(completedChallenges)).toBe(32)
  })
  test("Should return correct score for different test arrays", () => {
    expect(calculateScore(completedChallenges2)).toBe(560)
  })
})
