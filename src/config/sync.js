import { sequelize } from "../models/index.js";

(async () => {
    try{
        await sequelize.sync({logging: console.log}),
        console.log('Tabelas Sicronizadas');
    } catch(err) {
        console.log("Erro ao sicronizar: ", err)
    }
})();