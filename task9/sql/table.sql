create table Category
(
  id     int auto_increment
    primary key,
  name   varchar(50) not null,
  status int         null
);

create table User
(
  id     int auto_increment,
  name   varchar(15) not null,
  email  varchar(50) not null,
  status int         not null,
  constraint User_id_uindex
  unique (id)
);

alter table User
  add primary key (id);

create table Post
(
  id          int auto_increment
    primary key,
  user_id     int                                 null,
  content     varchar(255)                        not null,
  status      int                                 not null,
  created_at  timestamp default CURRENT_TIMESTAMP not null
  on update CURRENT_TIMESTAMP,
  updated_at  timestamp                           null,
  category_id int                                 not null,
  constraint Post_category_id_uindex
  unique (category_id),
  constraint Post_user_id_uindex
  unique (user_id),
  constraint Post_Category_id_fk
  foreign key (category_id) references Category (id),
  constraint Post_User_id_fk
  foreign key (user_id) references User (id)
);