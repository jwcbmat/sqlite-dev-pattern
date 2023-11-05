BEGIN TRANSACTION;
DROP TABLE IF EXISTS users;
create table if not exists users (
             id integer primary key,
             name text,
             age integer
         );
COMMIT;