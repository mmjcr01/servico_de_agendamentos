const express = require("express");
const { sequelize } = require("./src/database/database");
const { initModels } = require("./src/models/index");
const app = express();
const port = 3000;
app.use(express.json());
let models;

const routesAddresses = require("./src/routes/addresses");
const routesAgendas = require("./src/routes/agendas");
const routesAppointments = require("./src/routes/appointments");
const routesClients = require("./src/routes/clients");
const routesCommunications = require("./src/routes/communications");
const routesForms = require("./src/routes/forms");
const routesIntegrations = require("./src/routes/integrations");
const routesOrganizations = require("./src/routes/organizations");
const routesPlans = require("./src/routes/plans");
const routesReports = require("./src/routes/reports");
const routesServices = require("./src/routes/services");
const routesTags = require("./src/routes/tags");
const routesUsers = require("./src/routes/users");
const routesLogin = require("./src/routes/login");

//função para autenticar a conexão com o banco

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao MySQL com sucesso");
    // Inicializar modelos apenas após conexão bem-sucedida
    models = initModels(sequelize);
    app.use("/addresses", routesAddresses(models));
    app.use("/agendas", routesAgendas(models));
    app.use("/appointments", routesAppointments(models));
    app.use("/clients", routesClients(models));
    app.use("/communications", routesCommunications(models));
    app.use("/forms", routesForms(models));
    app.use("/integrations", routesIntegrations(models));
    app.use("/organizations", routesOrganizations(models));
    app.use("/plans", routesPlans(models));
    app.use("/reports", routesReports(models));
    app.use("/services", routesServices(models));
    app.use("/tags", routesTags(models));
    app.use("/users", routesUsers(models));
    app.use("/login", routesLogin(models));

    app.listen(port, () => {
      console.log(`servidor iniciado na porta: ${port}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
    process.exit(1); // em caso de erro, esse comando encerra o sistema de forma segura.
  }
})();
