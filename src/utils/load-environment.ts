import * as dotenv from 'dotenv';

export const loadEnvironment = () => {
    const ENV_FILE_NAME = process.env.NODE_ENV === 'production' 
        ? '.env'
        : process.env.NODE_ENV === 'staging'
        ? '.env.staging'
        : process.env.NODE_ENV === 'test'
        ? '.env.test'
        : '.env';
    console.log("ENV_FILE_NAME", ENV_FILE_NAME);
        
    try {
        dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
    } catch (e) {
        console.error("Dotenv Config Error -", e);
    }
    
    return {
        environment: process.env.NODE_ENV || 'development',
        isProduction: process.env.NODE_ENV === 'production',
        isStaging: process.env.NODE_ENV === 'staging',
        isTest: process.env.NODE_ENV === 'test',
        isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    };
};
