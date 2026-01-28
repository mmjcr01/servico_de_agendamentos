const express = require("express");
const { sequelize } = require("./src/database/database");
const { initModels } = require("./src/models/index");
const app = express();
const port = 3000;
app.use(express.json);
let conexaofeita = false;

const models = initModels(sequelize);
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

//função para autenticar a conexão com o banco

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao MySQL com sucesso");
    conexaofeita = true;
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
    process.exit(1); // em caso de erro, esse comando encerra o sistema de forma segura.
  }
})();

app.use("/addresses", routesAddress(models));
app.use("/agendas", routesAgenda(models));
app.use("/appointments", routesAppointment(models));
app.use("/clients", routesClient(models));
app.use("/communications", routesCommunication(models));
app.use("/forms", routesForm(models));
app.use("/integrations", routesIntegration(models));
app.use("/organizations", routesOrganization(models));
app.use("/plans", routesPlan(models));
app.use("/reports", routesReport(models));
app.use("/services", routesService(models));
app.use("/tags", routesTag(models));
app.use("/users", routesUser(models));

app.listen(port, (req, res) => {
  console.log(`servidor iniciado na porta: ${port}`);
});
