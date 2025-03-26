import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVariables {
    PORT: number;
    NatsServer: string;
}

const environmentSchema = joi.object({
    PORT: joi.number().required(),
    NatsServer: joi.string().required(), // Asegúrate de que coincida con la interfaz
}).unknown(true);


const { error, value } = environmentSchema.validate({...process.env}); 

if (error) {
    throw new Error(`Error en environments: ${error.message}`); 
}

const env: EnvironmentVariables = value; 
console.log(env.PORT);
export const environmentVariables = {
    port: env.PORT,
    natsServer: env.NatsServer,
};