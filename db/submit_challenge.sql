INSERT INTO challenges (name, instructions, starting_code, difficulty, creator)
VALUES (${name}, ${instructions}, ${starting_code}, ${difficulty}, ${creator})
RETURNING challenge_id