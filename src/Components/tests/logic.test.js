const {calculateScore, sortUsers} = require("../Logic/logic");

const completedChallenges = [{challenge_id: 3, solution: 'hey', difficulty: 3}, {challenge_id: 4, solution: 'hello', difficulty: 2}, {challenge_id: 7, solution: 'hello', difficulty: 4}]
const completedChallenges2 = [{challenge_id: 3, solution: 'hey', difficulty: 7}, {challenge_id: 4, solution: 'hello', difficulty: 8}, {challenge_id: 7, solution: 'hello', difficulty: 6}]
const info = [
  {
rank: "1",
score: 10000,
user_id: 4,
username: "Joe"},
{
rank: "3",
score: 10,
user_id: 4,
username: "Bob"
}
]

describe("challenge list returns correct info", () => {
  test(" returns array", () => {
    expect(Array.isArray(completedChallenges)).toBeTruthy();
  });
  test("each item is an object", () => {
    expect(typeof completedChallenges[0]).toBe("object");
  });
});
describe("check user info", () => {
  test("user score exists", () => {
    expect(info[0].score).toBeDefined()
  });
  test("user score is number", () => {
    expect(typeof info[0].score).toBe("number");
  });
  test("rank exists", () => {
    expect(info[0].rank).toBeDefined();
  });
  test("rank is a string", () => {
    expect(typeof info[0].rank).toBe("string");
  })
});

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


describe("sorting users is correctly done", () => {
  test("function should accept only an array", () => {
    expect(sortUsers('hello')).toBeUndefined()
    expect(sortUsers(20)).toBeUndefined()
    expect(sorUsers({})).toBeUndefined()
  })

  test("make sure it returns valid information", () => {
    expect(sortUsers(info)).toBeDefined()
  })

  test("the function needs to have a user_id property", () => {
    expect(sortUsers(info)).toHaveProperty('user_id')
  })

  test("returns a the number at whatever index you are at", () => {
    expect(sortUsers(info)).not.toBeNaN()
  })

  test("returned number needs to be added by one", () => {
    expect(sortUsers(info[0])).toBe(1)
  })

  
})

