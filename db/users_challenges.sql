select * from users a
join completed_challenges b on a.user_id = b.user_id
join challenges c on b.challenge_id = c.challenge_id
where a.user_id = $1
