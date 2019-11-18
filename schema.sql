DROP TABLE IF EXISTS locations, weather;

CREATE TABLE locations(id SERIAL PRIMARY KEY, search_query TEXT, formatted_query TEXT, latitude DECIMAL(9,6), longitude DECIMAL(9,6));

CREATE TABLE weather 
(id SERIAL PRIMARY KEY, 
forecast TEXT, time TEXT, 
location_id INTEGER NOT NULL REFERENCES locations(id)
);