// backend/src/models/index.js
const { DataTypes } = require("sequelize");

function initModels(sequelize) {
  const models = {};
  models.AccessControl = require("./accessControlModel")(sequelize, DataTypes);
  models.Address = require("./addressModel")(sequelize, DataTypes);
  models.Agenda = require("./agendaModel")(sequelize, DataTypes);
  models.AgendaAddress = require("./agendaAddressModel")(sequelize, DataTypes);
  models.Appointment = require("./appointmentModel")(sequelize, DataTypes);
  models.AuditLog = require("./auditLogModel")(sequelize, DataTypes);
  models.Client = require("./clientModel")(sequelize, DataTypes);
  models.Communication = require("./communicationModel")(sequelize, DataTypes);
  models.Form = require("./formModel")(sequelize, DataTypes);
  models.FormResponse = require("./formResponseModel")(sequelize, DataTypes);
  models.Integration = require("./integrationModel")(sequelize, DataTypes);
  models.Organization = require("./organizationModel")(sequelize, DataTypes);
  models.Plan = require("./planModel")(sequelize, DataTypes);
  models.ProfessionalService = require("./professionalServiceModel")(
    sequelize,
    DataTypes,
  );
  models.Report = require("./reportModel")(sequelize, DataTypes);
  models.Service = require("./serviceModel")(sequelize, DataTypes);
  models.ServiceTag = require("./serviceTagModel")(sequelize, DataTypes);
  models.Tag = require("./tagModel")(sequelize, DataTypes);
  models.User = require("./userModel")(sequelize, DataTypes);
  models.UserPlan = require("./userPlanModel")(sequelize, DataTypes);

  Object.values(models).forEach((m) => m.associate && m.associate(models));
  return models;
}

module.exports = { initModels };
