select * from models
join garage_bikes
on models.model_id = favorites.model_id
where garage_bikes.user_id = $1
