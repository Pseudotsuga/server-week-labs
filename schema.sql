DROP TABLE IF EXISTS locations;

CREATE TABLE locations(id SERIAL PRIMARY KEY, search_query TEXT, formatted_query TEXT, latitude DECIMAL(9,6), longitude DECIMAL(9,6));