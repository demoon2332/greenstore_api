const database = 'Greenstore'
export const credentials = { cookieSecret: 'doremon',
mongo: {
    development: {
        connectionString: `mongodb+srv://Demoon:Demoon%402Mongo@cluster0.u3cbh.mongodb.net/${database}?retryWrites=true&w=majority`
    },
    production: {
        connectionString: `mongodb+srv://Demoon:Demoon%402Mongo@cluster0.u3cbh.mongodb.net/${database}?retryWrites=true&w=majority`
    }
    
}}