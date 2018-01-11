/*Users*/

insert into Users(name, email, uid, pwd,createdAt, updatedAt) values
('Roger Federer', 'rf@gmail.com','rf1','rrff1', current_timestamp(),current_timestamp());

insert into Users(name, email,position, uid, pwd,createdAt, updatedAt) values
('Tom Brady', 'tb@gmail.com', 'Associate','tb1','ttbb1', current_timestamp(),current_timestamp());

insert into Users(name, email, uid, pwd,createdAt, updatedAt) values
('Rafael Nadal', 'rn@gmail.com', 'rn1','rrnn1', current_timestamp(),current_timestamp());

/*
test email credentials
packagetest25@gmail.com
package1234
*/

/*UserInfo*/

insert into UserInfos (number, building, street, createdAt, updatedAt,UserId)
values
('1301','A','Hopson Road',current_timestamp(),current_timestamp(),1);


insert into UserInfos (number, building, street, createdAt, updatedAt,UserId)
values
('1602','B','Select Drive',current_timestamp(),current_timestamp(),3);

insert into UserInfos (number, building, street, createdAt, updatedAt,UserId)
values
('1510','C','New Park Way',current_timestamp(),current_timestamp(),4);


/* Packages*/
insert into Packages (packageName,createdAt,updatedAt,UserId)
values
('Tennis Racket',current_timestamp(),current_timestamp(),1);

insert into Packages (packageName,createdAt,updatedAt,UserId)
values
('Tennis Jacket',current_timestamp(),current_timestamp(),3);

insert into Packages (packageName,createdAt,updatedAt,UserId)
values
('Tennis Bag',current_timestamp(),current_timestamp(),3);

insert into Packages (packageName,createdAt,updatedAt,UserId)
values
('Sports Socks',current_timestamp(),current_timestamp(),3);
