UPDATE users
SET score=${score}
WHERE user_id=${user_id};
SELECT score from users
WHERE user_id=${user_id}
