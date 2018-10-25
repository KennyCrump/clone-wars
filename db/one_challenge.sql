select challenges.*, test, result from challenges
left join unit_tests ut on ut.challenge_id = challenges.challenge_id
where challenges.challenge_id = ${id}