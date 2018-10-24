DROP TABLE IF EXISTS completed_challenges;
DROP TABLE IF EXISTS unit_tests;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT,
  picture TEXT,
  rank VARCHAR(10),
  score INTEGER,
  auth_id TEXT
);

CREATE TABLE challenges (
    challenge_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    instructions VARCHAR(10000),
    starting_code VARCHAR(1000),
    difficulty VARCHAR(10)
);

CREATE TABLE unit_tests (
    test_id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(challenge_id),
    test VARCHAR(200),
    result VARCHAR(200)
);

CREATE TABLE completed_challenges (
    completed_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    challenge_id INTEGER REFERENCES challenges(challenge_id),
    solution VARCHAR(4000),
    completed BOOLEAN
);

insert into challenges (name, instructions, starting_code, difficulty)
values ('Price of Mangoes', 'There is a "3 for 2" offer on mangoes. For a given quantity and price (per mango), calculate the total cost of the mangoes.', 'function mango(quantity, price){

}', '1')

insert into challenges (name, instructions, starting_code, difficulty)
values ('Convert a Number to a String!', 'We need a function that can transform a number into a string.', 'function numberToString(num) {
  // Return a string of the number here!
}', '1')