insert into users
(username, email, picture, auth_id, rank, score)
values
($1, $2, $3, $4, 1, 0)
returning *;