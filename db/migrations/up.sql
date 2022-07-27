DROP VIEW IF EXISTS  view_userModules;
CREATE VIEW view_userModules AS
SELECT um.*, m.moduleName
FROM userModules AS um, modules AS m 
WHERE um.moduleId=m.moduleId;


DROP VIEW IF EXISTS view_users;
CREATE VIEW view_users AS
SELECT u.*, GROUP_CONCAT(um.moduleName) AS moduleName
FROM users AS u LEFT JOIN view_userModules AS um ON u.userId=um.userId GROUP BY u.userId;

DROP VIEW IF EXISTS view_departemen;
CREATE VIEW view_departemen AS
SELECT d.*, s.subDepartemen
FROM departemen AS d LEFT JOIN 
(SELECT departemenParentId, GROUP_CONCAT(departemen SEPARATOR ', ') AS subDepartemen FROM departemen WHERE departemenParentId IS NOT NULL GROUP BY departemenParentId) AS s ON d.departemenId=s.departemenParentId
WHERE d.departemenParentId IS NULL
ORDER BY d.departemen;