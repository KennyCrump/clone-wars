select distinct completed_challenges.challenge_id, difficulty, completed from completed_challenges
join challenges on completed_challenges.challenge_id = challenges.challenge_id
where user_id=${user_id}