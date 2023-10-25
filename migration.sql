DROP TABLE IF EXISTS sampleTable;
-- DB called sampledb table called sampleTable

CREATE TABLE sampleTable (
    id SERIAL PRIMARY KEY,
    name TEXT,
    bool BOOLEAN   
);

INSERT INTO sampleTable(name, bool) VALUES ('Mark', true);