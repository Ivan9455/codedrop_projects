create table category
(
  id     int auto_increment
    primary key,
  name   varchar(50) not null,
  status int         null
);

create table user
(
  id     int auto_increment
    primary key,
  name   varchar(15) not null,
  email  varchar(50) not null,
  status int         null
);

create table post
(
  id          int auto_increment
    primary key,
  user_id     int                                 null,
  content     varchar(255)                        not null,
  status      int                                 null,
  updated_at  timestamp default CURRENT_TIMESTAMP not null
  on update CURRENT_TIMESTAMP,
  created_at  datetime                            null,
  category_id int                                 not null,
  constraint post_category_id_fk
  foreign key (category_id) references category (id),
  constraint post_user_id_fk
  foreign key (user_id) references user (id)
);

