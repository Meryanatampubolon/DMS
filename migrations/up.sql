DROP VIEW IF EXISTS  view_user_module;
CREATE VIEW view_user_module AS
SELECT um.*, m.moduleName
FROM user_module AS um, module AS m 
WHERE um.module_id=m.module_id;
