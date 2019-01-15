select * from motorcycles mc
join models m 
on mc.id = m.motorcycle_id
where mc.id = $1
