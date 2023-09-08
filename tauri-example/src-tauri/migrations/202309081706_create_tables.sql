drop table if exists notes;

create table
  notes (
    note_id int generated always as identity primary key,
    title text not null,
    content text not null,
    created_at TIMESTAMPTZ not null default clock_timestamp(),
    primary key (note_id)
  );

create unique index if not exists unique_notes_index on notes (title);
